import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

const ManageUser = () => {
  // ✅ Dummy user data
  const DUMMY_USERS = [
    { _id: 1, name: "Alice Johnson", email: "alice@example.com", role: "STAFF" },
    { _id: 2, name: "Bob Smith", email: "bob@example.com", role: "COMPANY" },
    { _id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "ADMIN_STAFF" },
    { _id: 4, name: "Diana Prince", email: "diana@example.com", role: "ADMIN" },
    { _id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "STAFF" },
    { _id: 6, name: "Fiona Gallagher", email: "fiona@example.com", role: "COMPANY" },
    { _id: 7, name: "George Miller", email: "george@example.com", role: "STAFF" },
    { _id: 8, name: "Hannah Baker", email: "hannah@example.com", role: "STAFF" },
    { _id: 9, name: "Ian Malcolm", email: "ian@example.com", role: "COMPANY" },
    { _id: 10, name: "Jane Doe", email: "jane@example.com", role: "ADMIN_STAFF" },
  ];

  const [users, setUsers] = useState(DUMMY_USERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // items per page
  const [message, setMessage] = useState(null);

  // Filtered and paginated users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  // Delete user (frontend only)
  const handleDelete = (_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter((u) => u._id !== _id));
    setMessage("✅ User deleted successfully!");
  };

  // Change role (frontend only)
  const handleRoleChange = (_id, newRole) => {
    setUsers(users.map((u) => (u._id === _id ? { ...u, role: newRole } : u)));
    setMessage("✅ Role updated successfully!");
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Manage Users</h2>

        {/* Notifications */}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        {/* Search */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        {paginatedUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 rounded-t-lg">
                <tr>
                  <th className="border-b p-3">Name</th>
                  <th className="border-b p-3">Email</th>
                  <th className="border-b p-3">Role</th>
                  <th className="border-b p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border-b p-3">{user.name}</td>
                    <td className="border-b p-3">{user.email}</td>
                    <td className="border-b p-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="STAFF">STAFF</option>
                        <option value="COMPANY">COMPANY</option>
                        <option value="ADMIN_STAFF">ADMIN STAFF</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="border-b p-3">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageUser;
