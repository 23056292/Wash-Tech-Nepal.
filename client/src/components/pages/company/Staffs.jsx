import React, { useState } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const Staffs = () => {
  const dummyStaffs = [
    { _id: "1", name: "Alice Johnson", email: "alice@example.com", phone: "9876543210", gpsStatus: true },
    { _id: "2", name: "Bob Smith", email: "bob@example.com", phone: "9876501234", gpsStatus: false },
    { _id: "3", name: "Charlie Brown", email: "charlie@example.com", phone: "", gpsStatus: true },
  ];

  const [staffs, setStaffs] = useState(dummyStaffs);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ _id: "", name: "", email: "", phone: "", password: "" });
  const [showForm, setShowForm] = useState(false);

  const handleAddStaff = () => {
    setFormData({ _id: "", name: "", email: "", phone: "", password: "" });
    setShowForm(true);
  };

  const handleEditStaff = (staff) => {
    setFormData({ ...staff, password: "" });
    setShowForm(true);
  };

  const handleDeleteStaff = (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    setStaffs((prev) => prev.filter((s) => s._id !== id));
  };

  const handleSaveStaff = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are required");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      if (formData._id) {
        setStaffs((prev) =>
          prev.map((s) => (s._id === formData._id ? { ...formData, gpsStatus: s.gpsStatus } : s))
        );
      } else {
        const newStaff = { ...formData, _id: Date.now().toString(), gpsStatus: false };
        setStaffs((prev) => [...prev, newStaff]);
      }
      setShowForm(false);
      setFormData({ _id: "", name: "", email: "", phone: "", password: "" });
      setSaving(false);
    }, 500);
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Staff Management</h1>

      {!showForm && (
        <div className="mb-4">
          <button
            onClick={handleAddStaff}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Staff
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-4 max-w-lg">
          <h2 className="text-xl font-semibold mb-4">{formData._id ? "Edit Staff" : "Add Staff"}</h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
          />
          {!formData._id && (
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
            />
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSaveStaff}
              disabled={saving}
              className={`px-4 py-2 rounded-lg text-white ${
                saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 border-b">#</th>
              <th className="py-2 px-3 border-b">Name</th>
              <th className="py-2 px-3 border-b">Email</th>
              <th className="py-2 px-3 border-b">Phone</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b">GPS</th>
              <th className="py-2 px-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No staff found
                </td>
              </tr>
            ) : (
              staffs.map((staff, index) => (
                <tr key={staff._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{staff.name}</td>
                  <td className="py-2 px-3">{staff.email}</td>
                  <td className="py-2 px-3">{staff.phone || "N/A"}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        staff.gpsStatus ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {staff.gpsStatus ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        staff.gpsStatus ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {staff.gpsStatus ? "Checked In" : "Checked Out"}
                    </span>
                  </td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      onClick={() => handleEditStaff(staff)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staff._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CompanyLayout>
  );
};

export default Staffs;
