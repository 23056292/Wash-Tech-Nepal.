import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

const Staffs = () => {
  // ✅ Dummy companies
  const DUMMY_COMPANIES = [
    { _id: 1, name: "Tech Corp" },
    { _id: 2, name: "Health Solutions" },
    { _id: 3, name: "EduSoft" },
  ];

  // ✅ Dummy staff
  const DUMMY_STAFF = [
    { _id: 101, name: "Alice Johnson", email: "alice@example.com", phone: "1234567890", companyId: 1 },
    { _id: 102, name: "Bob Smith", email: "bob@example.com", phone: "9876543210", companyId: 2 },
    { _id: 103, name: "Carol White", email: "carol@example.com", phone: "", companyId: 3 },
  ];

  const [staffs, setStaffs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(defaultForm());
  const [saving, setSaving] = useState(false);

  function defaultForm() {
    return { _id: "", name: "", email: "", phone: "", companyId: "" };
  }

  useEffect(() => {
    // Load dummy data
    setCompanies(DUMMY_COMPANIES);
    setStaffs(DUMMY_STAFF);
  }, []);

  // ---------------- Add / Edit Staff ----------------
  const handleAdd = () => {
    setFormData(defaultForm());
    setShowForm(true);
  };

  const handleEdit = (staff) => {
    setFormData({ ...staff });
    setShowForm(true);
  };

  // ---------------- Delete Staff ----------------
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    setStaffs(staffs.filter((s) => s._id !== id));
  };

  // ---------------- Save Staff ----------------
  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.companyId) {
      alert("Name, Email, and Company are required");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      if (formData._id) {
        // Edit existing staff
        setStaffs(
          staffs.map((s) => (s._id === formData._id ? formData : s))
        );
      } else {
        // Add new staff
        setStaffs([
          ...staffs,
          { ...formData, _id: Math.floor(Math.random() * 10000) },
        ]);
      }
      setFormData(defaultForm());
      setShowForm(false);
      setSaving(false);
    }, 500);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">👥 Staff Management</h1>

      {/* Add Staff Button */}
      {!showForm && (
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
          >
            + Add Staff
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gray-50 p-6 rounded-2xl shadow mb-6 max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            {formData._id ? "Edit Staff" : "Add Staff"}
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <select
            value={formData.companyId}
            onChange={(e) =>
              setFormData({ ...formData, companyId: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Company</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-5 py-2 rounded-xl text-white font-semibold transition ${
                saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No staff found
                </td>
              </tr>
            )}
            {staffs.map((staff, idx) => (
              <tr key={staff._id} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{staff.name}</td>
                <td className="py-2 px-4">{staff.email}</td>
                <td className="py-2 px-4">{staff.phone || "N/A"}</td>
                <td className="py-2 px-4">
                  {companies.find((c) => c._id === staff.companyId)?.name || "N/A"}
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Staffs;
