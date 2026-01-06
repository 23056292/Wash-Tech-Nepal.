import React, { createContext, useState, useContext } from "react";

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  // Default role - can be changed via UI
  const [currentUser, setCurrentUser] = useState({
    role: "ADMIN", // Options: "ADMIN", "ADMIN_STAFF", "COMPANY", "STAFF"
    permissions: ["STAFF_MANAGE", "COMPANY_MANAGE", "PACKAGE_MANAGE"], // for ADMIN_STAFF
    name: "Demo User",
    email: "demo@washtech.com",
  });

  // Function to switch roles (for testing)
  const switchRole = (newRole) => {
    let permissions = [];
    if (newRole === "ADMIN_STAFF") {
      permissions = ["STAFF_MANAGE", "COMPANY_MANAGE"]; // default permissions for ADMIN_STAFF
    }
    setCurrentUser((prev) => ({ ...prev, role: newRole, permissions }));
  };

  // Function to logout user
  const logout = () => {
    setCurrentUser({
      role: "ADMIN", // Reset to default role
      permissions: ["STAFF_MANAGE", "COMPANY_MANAGE", "PACKAGE_MANAGE"],
      name: "Demo User",
      email: "demo@washtech.com",
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    switchRole,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom Hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
