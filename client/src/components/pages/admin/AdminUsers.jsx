import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

const PERMISSIONS = ["STAFF_MANAGE", "COMPANY_MANAGE", "PACKAGE_MANAGE"];

// ✅ Dummy data for frontend
const DUMMY_ADMINS = [
  {
    _id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "ADMIN",
    status: "active",
    permissions: ["STAFF_MANAGE", "COMPANY_MANAGE"],
  },
  {
    _id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "ADMIN_STAFF",
    status: "inactive",
    permissions: ["PACKAGE_MANAGE"],
  },
];

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "active",
    permissions: [],
  });

  useEffect(() => {
    // simulate fetch delay
    setTimeout(() => {
      setAdmins(DUMMY_ADMINS);
      setLoading(false);
    }, 500);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => {
      const hasPermission = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      status: "active",
      permissions: [],
    });
    setShowForm(true);
  };

  const handleEditClick = (admin) => {
    setEditId(admin._id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      status: admin.status,
      permissions: admin.permissions || [],
    });
    setShowForm(true);
  };

  const handleDeleteClick = (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    setAdmins((prev) => prev.filter((a) => a._id !== adminId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!editId && !formData.password)) {
      return alert("Please fill all required fields");
    }
    if (formData.permissions.length === 0) {
      return alert("Please select at least one permission");
    }

    if (editId) {
      // Update local state
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === editId
            ? { ...admin, ...formData, _id: editId }
            : admin
        )
      );
      alert("Admin updated successfully");
    } else {
      // Create new admin
      setAdmins((prev) => [
        ...prev,
        { ...formData, _id: Date.now(), role: "ADMIN" },
      ]);
      alert("Admin created successfully");
    }
    setShowForm(false);
    setEditId(null);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Users</h1>

      <div className="mb-4">
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Admin User
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Admin" : "Add Admin"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Name & Email */}
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1">
                  {field.toUpperCase()}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}

            {/* Password */}
            {!editId && (
              <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {/* Status Dropdown */}
            {editId && (
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            )}

            {/* Permissions Checkboxes */}
            <div>
              <label className="block font-semibold mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                      className="h-4 w-4"
                    />
                    <span>{permission.replace("_", " ")}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {editId ? "Update Admin" : "Create Admin"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Table */}
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-blue-50">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Email</th>
              <th className="py-2 px-2">Role</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Permissions</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No admins found
                </td>
              </tr>
            )}
            {admins.map((admin, index) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-2">{index + 1}</td>
                <td className="py-2 px-2">{admin.name}</td>
                <td className="py-2 px-2">{admin.email}</td>
                <td className="py-2 px-2">{admin.role}</td>
                <td className="py-2 px-2">{admin.status}</td>
                <td className="py-2 px-2">
                  {admin.permissions?.join(", ") || "None"}
                </td>
                <td className="py-2 px-2 space-x-2">
                  <button
                    onClick={() => handleEditClick(admin)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(admin._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
