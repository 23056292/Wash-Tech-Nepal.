import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../context/UserContext";

const Sidebar = () => {
  // Get user from context
  const { currentUser } = useUser();
  const user = currentUser;

  const baseAdminLinks = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/admin" },
    { name: "My Profile", icon: <UserIcon className="w-5 h-5" />, path: "/admin/profile" },
  ];

  const adminPermissionLinks = [
    { name: "Companies", icon: <BuildingOffice2Icon className="w-5 h-5" />, path: "/admin/companies", permission: "COMPANY_MANAGE" },
    { name: "Staffs", icon: <UsersIcon className="w-5 h-5" />, path: "/admin/staffs", permission: "STAFF_MANAGE" },
    { name: "Packages", icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: "/admin/packages", permission: "PACKAGE_MANAGE" },
  ];

  const adminOnlyLinks = [
    { name: "Reports", icon: <ChartBarIcon className="w-5 h-5" />, path: "/admin/reports" },
    { name: "Manage User", icon: <UsersIcon className="w-5 h-5" />, path: "/admin/manage-users" },
    { name: "Manage Admin", icon: <UserIcon className="w-5 h-5" />, path: "/admin/admin-users" },
  ];

  const companyLinks = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/company" },
    { name: "Company Profile", icon: <BuildingOffice2Icon className="w-5 h-5" />, path: "/company/profile" },
    { name: "Staffs", icon: <UsersIcon className="w-5 h-5" />, path: "/company/staffs" },
    { name: "Reports", icon: <ChartBarIcon className="w-5 h-5" />, path: "/company/reports" },
    { name: "Manage Leaves", icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: "/company/manage-leaves" },
  ];

  const staffLinks = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/staff" },
    { name: "Profile", icon: <UserIcon className="w-5 h-5" />, path: "/staff/profile" },
    { name: "Leave Manage", icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: "/staff/leave-manages" },
    { name: "Check In/Out", icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: "/staff/check-in-out" },
  ];

  let roleLinks = [];

  if (user?.role === "ADMIN") {
    roleLinks = [...baseAdminLinks, ...adminPermissionLinks, ...adminOnlyLinks];
  } else if (user?.role === "ADMIN_STAFF") {
    roleLinks = [...baseAdminLinks];
    roleLinks.push(...adminPermissionLinks.filter(link => user?.permissions?.includes(link.permission)));
  } else if (user?.role === "COMPANY") {
    roleLinks = companyLinks;
  } else if (user?.role === "STAFF") {
    roleLinks = staffLinks;
  }

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 shadow-xl flex flex-col px-6 py-8">
      
      {/* Panel Title */}
      <h2 className="text-xl font-bold mb-10 text-white tracking-wide">
        {user?.role === "ADMIN" || user?.role === "ADMIN_STAFF"
          ? "Admin Panel"
          : user?.role === "COMPANY"
            ? "Company Panel"
            : "Staff Panel"}
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {roleLinks.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <span className="group-hover:scale-110 transition">
              {link.icon}
            </span>
            <span className="text-sm font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
