import React from "react";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Fixed width */}
      <Sidebar className="w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-lg fixed h-full z-20" />

      {/* Main Content - Flex with full width */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Navbar className="bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200 fixed w-[calc(100%-16rem)] z-10 ml-64" />
        <main className="mt-16 p-6 flex-1 overflow-auto pt-20">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;