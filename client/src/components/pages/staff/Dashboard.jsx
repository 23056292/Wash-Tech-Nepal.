import React, { useState, useEffect } from "react";
import StaffLayout from "../../layout/StaffLayout";
import { useUser } from "../../../context/UserContext";

const StaffDashboard = () => {
  const { currentUser } = useUser();
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("Last Log: Pending");
  const [workingHours, setWorkingHours] = useState(0);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [shift, setShift] = useState({ start: "09:00 AM", end: "05:00 PM" });
  const [leaveToday, setLeaveToday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch staff attendance logs
        const attendanceResponse = await fetch('http://localhost:5001/api/attendance', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (attendanceResponse.ok) {
          const attendanceData = await attendanceResponse.json();
          setAttendanceLogs(attendanceData);
        }
        
        // Check if user is on leave today
        const leavesResponse = await fetch('http://localhost:5001/api/leaves', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (leavesResponse.ok) {
          const leavesData = await leavesResponse.json();
          const today = new Date().toISOString().split('T')[0];
          const onLeave = leavesData.some(leave => 
            leave.status === 'APPROVED' && 
            leave.startDate <= today && 
            leave.endDate >= today
          );
          setLeaveToday(onLeave);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaffData();
  }, []);

  // Calculate stats based on fetched data
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = attendanceLogs.filter(log => 
    new Date(log.date).toISOString().split('T')[0] === today
  );
  const checkInCount = todayLogs.filter(log => log.checkInTime).length;
  const checkOutCount = todayLogs.filter(log => log.checkOutTime).length;

  const handleCheck = async (type) => {
    setChecking(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/attendance/${type === 'in' ? 'checkin' : 'checkout'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (type === 'in') {
          setStatus('Last Log: Checked In');
        } else {
          setStatus('Last Log: Checked Out');
        }
        
        // Refresh the data after check-in/check-out
        const attendanceResponse = await fetch('http://localhost:5001/api/attendance', {
          headers: {
            'x-auth-token': token
          }
        });
        
        if (attendanceResponse.ok) {
          const attendanceData = await attendanceResponse.json();
          setAttendanceLogs(attendanceData);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.msg || `Failed to ${type === 'in' ? 'check in' : 'check out'}`);
      }
    } catch (error) {
      console.error(`Error during ${type}:`, error);
      alert(`Error during ${type === 'in' ? 'check in' : 'check out'}`);
    } finally {
      setChecking(false);
    }
  };

  const formatTime = (time) =>
    time ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : 'N/A';

  return (
    <StaffLayout>
      <div>
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Staff Dashboard</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10 animate-pulse">Loading dashboard...</p>
      ) : (
        <>
          {/* Shift & Status */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between flex-wrap gap-4">
            <div className="flex-1">
              <p><strong>Shift:</strong> {shift.start} - {shift.end}</p>
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
                  {todayLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="py-2 px-4">{formatTime(log.checkInTime)}</td>
                      <td className="py-2 px-4">{formatTime(log.checkOutTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </StaffLayout>
  );
};

export default StaffDashboard;