import React from "react";
import AdminLayout from "./AdminLayout";
import CompanyLayout from "./CompanyLayout";
import StaffLayout from "./StaffLayout";

// ✅ Dummy user for frontend demo
const dummyUser = {
  id: 1,
  name: "John Doe",
  role: "ADMIN", // Change to "ADMIN_STAFF", "COMPANY", or "STAFF" to test layouts
};

const ProfileLayoutWrapper = ({ children, user = dummyUser }) => {
  if (user.role === "ADMIN" || user.role === "ADMIN_STAFF") {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (user.role === "COMPANY") {
    return <CompanyLayout>{children}</CompanyLayout>;
  }
  if (user.role === "STAFF") {
    return <StaffLayout>{children}</StaffLayout>;
  }

  return (
    <div className="p-6 text-center text-gray-700">
      {children || "No layout available for this user role"}
    </div>
  );
};

export default ProfileLayoutWrapper;
