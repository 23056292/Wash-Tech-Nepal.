import React, { useState } from "react";
import StaffLayout from "../../layout/StaffLayout";

const StaffDashboard = () => {
  // ✅ Dummy Data
  const dummyShift = { start: "09:00 AM", end: "05:00 PM" };
  const dummyHistory = [
    { checkInTime: "2026-01-06T09:00:00", checkOutTime: "2026-01-06T17:00:00" },
    { checkInTime: "2026-01-06T09:15:00", checkOutTime: "2026-01-06T17:05:00" },
  ];
  const leaveToday = false;

  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("Last Log: Checked Out");
  const [workingHours, setWorkingHours] = useState(8);

  const todayLogs = dummyHistory;
  const checkInCount = todayLogs.filter((r) => r.checkInTime).length;
  const checkOutCount = todayLogs.filter((r) => r.checkOutTime).length;

  const handleCheck = (type) => {
    alert(`Dummy ${type === "in" ? "Check-In" : "Check-Out"} recorded!`);
  };

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <StaffLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Staff Dashboard</h1>

      {/* Shift & Status */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between flex-wrap gap-4">
        <div className="flex-1">
          <p><strong>Shift:</strong> {dummyShift.start} - {dummyShift.end}</p>
        </div>
        <div className="flex-1">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Working Hours:</strong> {workingHours} hrs</p>
          {leaveToday && <p className="text-red-600 font-semibold">You are on approved leave today</p>}
        </div>
      </div>

      {/* Check-In/Check-Out Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center transition hover:shadow-lg">
          <p className="text-gray-500 mb-2">Today Check-Ins</p>
          <p className="text-2xl font-bold text-blue-600">{checkInCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center transition hover:shadow-lg">
          <p className="text-gray-500 mb-2">Today Check-Outs</p>
          <p className="text-2xl font-bold text-blue-600">{checkOutCount}</p>
        </div>
      </div>

      {/* Check-In/Check-Out Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => handleCheck("in")}
          disabled={checking || leaveToday}
          className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold transition ${
            !leaveToday ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {checking ? "Processing..." : "Check In"}
        </button>
        <button
          onClick={() => handleCheck("out")}
          disabled={checking || leaveToday}
          className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold transition ${
            !leaveToday ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {checking ? "Processing..." : "Check Out"}
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Today's Attendance</h2>
        {todayLogs.length === 0 ? (
          <p className="text-gray-500 text-center">No check-ins today</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Check-In Time</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
              {todayLogs.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{formatTime(r.checkInTime)}</td>
                  <td className="py-2 px-4">{formatTime(r.checkOutTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
