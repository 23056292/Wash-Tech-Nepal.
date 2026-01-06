import React, { useState } from "react";
import StaffLayout from "../../layout/StaffLayout";

const CheckInOut = () => {
  // ✅ Dummy data
  const dummyLogs = [
    { date: "2026-01-06", checkIn: "2026-01-06T09:00:00", checkOut: "2026-01-06T17:00:00", totalHours: 8 },
    { date: "2026-01-05", checkIn: "2026-01-05T09:30:00", checkOut: "2026-01-05T16:45:00", totalHours: 7.25 },
    { date: "2026-01-04", checkIn: "2026-01-04T10:00:00", checkOut: "2026-01-04T18:15:00", totalHours: 8.25 },
  ];

  const [logs] = useState(dummyLogs);
  const [loading] = useState(false);

  const formatTime = (time) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <StaffLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Check-In / Check-Out History
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-500 text-center">No check-in/check-out records found.</p>
        ) : (
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Check-In</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Check-Out</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{log.date}</td>
                  <td className="py-2 px-4">{formatTime(log.checkIn)}</td>
                  <td className="py-2 px-4">{formatTime(log.checkOut)}</td>
                  <td className="py-2 px-4">{log.totalHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </StaffLayout>
  );
};

export default CheckInOut;
