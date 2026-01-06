import React, { useState, useEffect } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const Dashboard = () => {
  // ---------- Dummy Data ----------
  const DUMMY_STAFF = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Alice Smith" },
    { id: 3, name: "Bob Johnson" },
    { id: 4, name: "Mary Lee" },
    { id: 5, name: "David Kim" },
  ];

  const DUMMY_LEAVE_REQUESTS = [
    { id: 1, staffId: 2, status: "approved", startDate: "2026-01-04", endDate: "2026-01-06" },
    { id: 2, staffId: 5, status: "approved", startDate: "2026-01-05", endDate: "2026-01-07" },
  ];

  const [staffs, setStaffs] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    setStaffs(DUMMY_STAFF);
    setLeaveRequests(DUMMY_LEAVE_REQUESTS);
  }, []);

  const totalStaff = staffs.length;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const onLeaveStaff = leaveRequests.filter(
    (leave) =>
      leave.status.toLowerCase() === "approved" &&
      leave.startDate <= today &&
      leave.endDate >= today
  ).length;
  const activeStaff = totalStaff - onLeaveStaff; // Calculate active staff

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Company Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Staff</h2>
            <p className="text-2xl font-bold text-blue-600">{totalStaff}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Staff</h2>
            <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">On Leave Staff</h2>
            <p className="text-2xl font-bold text-red-600">{onLeaveStaff}</p>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default Dashboard;
