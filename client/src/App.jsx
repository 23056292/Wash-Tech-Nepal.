import React from "react";
import { Routes, Route } from "react-router-dom";

// ---------------- Public Pages ----------------
import Home from "./components/common/Home";

// ---------------- Auth Pages ----------------
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import ResetPassword from "./components/pages/auth/ResetPassword";

// ---------------- Admin Pages ----------------
import AdminDashboard from "./components/pages/admin/Dashboard";
import Companies from "./components/pages/admin/Companies";
import Staffs from "./components/pages/admin/Staffs";
import Packages from "./components/pages/admin/Packages";
import Reports from "./components/pages/admin/Reports";
import Configurations from "./components/pages/admin/Configurations";
import AdminUsers from "./components/pages/admin/AdminUsers";
import ManageUser from "./components/pages/admin/ManageUsers";

// ---------------- Company Pages ----------------
import CompanyDashboard from "./components/pages/company/Dashboard";
import CompanyStaffs from "./components/pages/company/Staffs";
import CompanyReports from "./components/pages/company/Reports";
import CompanySettings from "./components/pages/company/Settings";
import CompanyProfile from "./components/pages/company/CompanyProfile";
import ManageLeaves from "./components/pages/company/ManageLeaves";

// ---------------- Staff Pages ----------------
import StaffDashboard from "./components/pages/staff/Dashboard";
import CheckInOut from "./components/pages/staff/CheckInOut";
import StaffSettings from "./components/pages/staff/Settings";
import StaffProfile from "./components/pages/staff/StaffProfile";
import LeaveManagement from "./components/pages/staff/LeaveManagement";

// ---------------- Error Pages ----------------
import NotFound from "./components/pages/error/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/companies" element={<Companies />} />
      <Route path="/admin/staffs" element={<Staffs />} />
      <Route path="/admin/packages" element={<Packages />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/configurations" element={<Configurations />} />
      <Route path="/admin/admin-users" element={<AdminUsers />} />
      <Route path="/admin/manage-users" element={<ManageUser />} />

      {/* Company Routes */}
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/company/staffs" element={<CompanyStaffs />} />
      <Route path="/company/reports" element={<CompanyReports />} />
      <Route path="/company/settings" element={<CompanySettings />} />
      <Route path="/company/profile" element={<CompanyProfile />} />
      <Route path="/company/manage-leaves" element={<ManageLeaves />} />

      {/* Staff Routes */}
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/staff/check-in-out" element={<CheckInOut />} />
      <Route path="/staff/settings" element={<StaffSettings />} />
      <Route path="/staff/profile" element={<StaffProfile />} />
      <Route path="/staff/leave-manages" element={<LeaveManagement />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;