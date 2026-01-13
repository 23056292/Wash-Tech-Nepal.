import React, { useState, useEffect } from "react";
import CompanyLayout from "../../layout/CompanyLayout";
import { useUser } from "../../../context/UserContext";

const Dashboard = () => {
  const { currentUser } = useUser();
  
  // State for staff and leave requests
  const [staffs, setStaffs] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch company staff
        const staffResponse = await fetch('http://localhost:5001/api/staff', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (staffResponse.ok) {
          const staffData = await staffResponse.json();
          setStaffs(staffData);
        }
        
        // Fetch leave requests
        const leavesResponse = await fetch('http://localhost:5001/api/leaves', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (leavesResponse.ok) {
          const leavesData = await leavesResponse.json();
          setLeaveRequests(leavesData);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyData();
  }, []);

  // Calculate stats
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
      <div>
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Company Dashboard</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10 animate-pulse">Loading dashboard...</p>
      ) : (
        /* Stats */
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
      )}
    </CompanyLayout>
  );
};

export default Dashboard;