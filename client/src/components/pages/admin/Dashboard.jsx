import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useUser } from "../../../context/UserContext";

const AdminDashboard = () => {
  const { currentUser } = useUser();
  
  // State for stats
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalStaff: 0,
    activeStaffToday: 0,
    totalCheckIns: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5001/api/stats', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch stats');
          // Set default values if API fails
          setStats({
            totalCompanies: 0,
            totalStaff: 0,
            activeStaffToday: 0,
            totalCheckIns: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values if error occurs
        setStats({
          totalCompanies: 0,
          totalStaff: 0,
          activeStaffToday: 0,
          totalCheckIns: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10 animate-pulse">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105">
            <p className="text-gray-500 font-medium mb-2">Total Companies</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalCompanies}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105">
            <p className="text-gray-500 font-medium mb-2">Total Staff</p>
            <p className="text-3xl font-bold text-green-600">{stats.totalStaff}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105">
            <p className="text-gray-500 font-medium mb-2">Active Staff Today</p>
            <p className="text-3xl font-bold text-orange-600">{stats.activeStaffToday}</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105">
            <p className="text-gray-500 font-medium mb-2">Total Check-Ins</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalCheckIns}</p>
          </div>
        </div>
      )}

      {/* Optional: Add charts or dummy data table */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities (Dummy)</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Staff Checked-In</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, company: "ABC Corp", staff: 12, date: "2026-01-06" },
              { id: 2, company: "XYZ Ltd", staff: 8, date: "2026-01-06" },
              { id: 3, company: "MNO Inc", staff: 15, date: "2026-01-06" },
            ].map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.staff}</td>
                <td className="py-2 px-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;