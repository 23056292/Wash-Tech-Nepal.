import React, { useState, useEffect } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const ManageLeavesCompany = () => {
  // ---------- Dummy Data ----------
  const DUMMY_LEAVES = [
    {
      _id: 1,
      staffName: "John Doe",
      startDate: "2026-01-04",
      endDate: "2026-01-06",
      reason: "Medical leave",
      status: "PENDING",
      staffId: 1,
    },
    {
      _id: 2,
      staffName: "Alice Smith",
      startDate: "2026-01-05",
      endDate: "2026-01-07",
      reason: "Personal work",
      status: "APPROVED",
      staffId: 2,
    },
    {
      _id: 3,
      staffName: "Bob Johnson",
      startDate: "2026-01-06",
      endDate: "2026-01-08",
      reason: "Vacation",
      status: "REJECTED",
      staffId: 3,
    },
  ];

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(DUMMY_LEAVES);
  }, []);

  // Dummy approve/reject/delete actions
  const handleLeaveAction = (leaveId, status) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l._id === leaveId ? { ...l, status: status.toUpperCase() } : l
      )
    );
  };

  const handleDeleteLeave = (leaveId) => {
    setLeaves((prev) => prev.filter((l) => l._id !== leaveId));
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Manage Leave Requests
        </h1>

        {leaves.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No leave requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-gray-700">Staff Name</th>
                  <th className="py-3 px-4 text-left text-gray-700">Start Date</th>
                  <th className="py-3 px-4 text-left text-gray-700">End Date</th>
                  <th className="py-3 px-4 text-left text-gray-700">Reason</th>
                  <th className="py-3 px-4 text-left text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{leave.staffName}</td>
                    <td className="py-2 px-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{leave.reason}</td>
                    <td
                      className={`font-semibold ${
                        leave.status === "APPROVED"
                          ? "text-green-600"
                          : leave.status === "REJECTED"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="flex gap-2 py-2 px-4">
                      {leave.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleLeaveAction(leave._id, "APPROVED")}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveAction(leave._id, "REJECTED")}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteLeave(leave._id)}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
};

export default ManageLeavesCompany;
