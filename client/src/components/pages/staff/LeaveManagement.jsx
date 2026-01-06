import React, { useState } from "react";
import StaffLayout from "../../layout/StaffLayout";

const LeaveManagement = () => {
  // ✅ Dummy data
  const [leaves, setLeaves] = useState([
    { _id: 1, startDate: "2026-01-01", endDate: "2026-01-03", reason: "Family trip", status: "APPROVED" },
    { _id: 2, startDate: "2026-01-10", endDate: "2026-01-12", reason: "Medical", status: "PENDING" },
    { _id: 3, startDate: "2026-01-15", endDate: "2026-01-16", reason: "", status: "REJECTED" },
  ]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ---------------- Handle Leave Request (dummy) ----------------
  const handleLeaveRequest = () => {
    if (!startDate || !endDate) return alert("Please select both start and end date");
    if (new Date(startDate) > new Date(endDate)) return alert("Start date cannot be after end date");

    setRequesting(true);
    setTimeout(() => {
      const newLeave = {
        _id: Date.now(),
        startDate,
        endDate,
        reason,
        status: "PENDING",
      };
      setLeaves([newLeave, ...leaves]);
      setStartDate("");
      setEndDate("");
      setReason("");
      setRequesting(false);
      alert("Leave requested successfully (dummy)");
    }, 500);
  };

  // ---------------- Handle Delete Leave (dummy) ----------------
  const handleDeleteLeave = (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;
    setDeletingId(id);
    setTimeout(() => {
      setLeaves(leaves.filter((l) => l._id !== id));
      setDeletingId(null);
      alert("Leave request deleted (dummy)");
    }, 500);
  };

  return (
    <StaffLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Leave Management</h1>

        {/* Leave Request Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 transition hover:shadow-lg">
          <h2 className="text-xl font-bold mb-4">Request Leave</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Reason (optional)</label>
              <textarea placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} className="border p-2 rounded w-full resize-none" />
            </div>
            <button
              onClick={handleLeaveRequest}
              disabled={requesting}
              className={`mt-2 px-6 py-2 rounded-xl text-white font-semibold transition ${requesting ? "bg-green-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {requesting ? "Requesting..." : "Submit Leave Request"}
            </button>
          </div>
        </div>

        {/* Leave History Table */}
        <div className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-lg">
          <h2 className="text-xl font-bold mb-4">Leave History</h2>
          {leaves.length === 0 ? (
            <p className="text-gray-500">No leave requests found.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Start Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">End Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Reason</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{leave.reason || "-"}</td>
                    <td className={`font-semibold ${
                      leave.status === "APPROVED" ? "text-green-600" :
                      leave.status === "REJECTED" ? "text-red-600" :
                      "text-yellow-600"
                    }`}>
                      {leave.status}
                    </td>
                    <td className="py-2 px-4">
                      {leave.status === "PENDING" && (
                        <button
                          onClick={() => handleDeleteLeave(leave._id)}
                          disabled={deletingId === leave._id}
                          className={`px-3 py-1 rounded text-sm text-white transition ${
                            deletingId === leave._id ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {deletingId === leave._id ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </StaffLayout>
  );
};

export default LeaveManagement;
