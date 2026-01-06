import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import heroImage from "../../assets/Images/solution.svg";

const Navbar = () => {
  const { currentUser, switchRole, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="h-16 bg-gradient-to-r from-white via-blue-50 to-white flex items-center justify-between px-6 md:px-12 shadow-lg fixed top-0 left-0 w-full z-50 backdrop-blur">
      
      {/* Logo / App Name */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={heroImage}
            alt="Wash Tech Logo"
            className="h-10 w-10 rounded-full border border-blue-200 group-hover:scale-105 transition"
          />
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 tracking-wide group-hover:text-blue-700 transition">
            Wash Tech Nepal
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {/* Auth Links - Only show on home page */}
        {isHomePage && (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-800 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </>
        )}

        {/* Logout Button - Show on dashboard pages */}
        {!isHomePage && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
