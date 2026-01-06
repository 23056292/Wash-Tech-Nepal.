import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import solutionimage from "../../assets/Images/solution.svg";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-32 pb-20 gap-10 overflow-hidden grow">
        {/* Background Blobs */}
        <div className="absolute top-10 left-0 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-2xl opacity-40 -z-10"></div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight">
            Wash <span className="text-blue-600">Tech Nepal</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed text-lg">
            A modern cross-platform <strong>Employee Management System</strong> designed for seamless coordination between <strong>Admin</strong>, <strong>Company</strong>, and <strong>Staff</strong>. Track attendance, manage reports and ensure data security.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative flex justify-center md:justify-end">
          <div className="relative w-[90%] md:w-[500px] lg:w-[550px]">
            <img
              src={solutionimage}
              alt="Wash Tech Nepal"
              className="w-full h-auto object-cover rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
          System Interfaces
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Admin Panel",
              description: "Full system control to manage companies, staff, packages, attendance rules, reports and permissions through a centralized dashboard.",
            },
            {
              title: "Company Dashboard",
              description: "Manage employees, approve leaves, view attendance summaries, generate reports, and maintain company settings for your organization.",
            },
            {
              title: "Staff Panel",
              description: "Check in/out, view attendance history, request leave, update profiles, and manage passwords with secure access.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Security & Tracking
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Wash Tech Nepal integrates secure login using authentication and allows only time-based check-in and check-out, maintaining employee privacy and data protection.
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 md:px-20 py-16 text-center bg-blue-50 rounded-t-3xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 font-medium">
          {["🖥️ React.js", "🎨 Tailwind CSS", "⚙️ Node.js", "🧩 Express.js", "🗄️ MongoDB", "🔐 JWT Authentication", "☁️ Vercel / Render"].map((tech, idx) => (
            <span key={idx} className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
