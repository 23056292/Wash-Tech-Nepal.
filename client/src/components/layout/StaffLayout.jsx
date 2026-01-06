import React from "react";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

const StaffLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar className="w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-lg" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar className="bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200" />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default StaffLayout;
