import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import heroImage from "../../assets/Images/solution.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 pt-14">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
        
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={heroImage}
              alt="Business Sarthi Logo"
              className="h-10 w-10 rounded-full border border-gray-700"
            />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Wash Tech Nepal
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-400">
            Empowering businesses with innovative IT solutions, technology
            expertise and digital growth strategies.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-5">
            <a
              href="#"
              className="p-2 bg-gray-800 text-gray-300 rounded-full hover:bg-blue-600 hover:text-white transition transform hover:scale-110"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 text-gray-300 rounded-full hover:bg-sky-500 hover:text-white transition transform hover:scale-110"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 text-gray-300 rounded-full hover:bg-blue-700 hover:text-white transition transform hover:scale-110"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 text-gray-300 rounded-full hover:bg-pink-600 hover:text-white transition transform hover:scale-110"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Services</a></li>
            <li><a href="/projects" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Projects</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition hover:translate-x-1 inline-block">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><span className="text-gray-200 font-medium">Email:</span> washtech@gmail.com</li>
            <li><span className="text-gray-200 font-medium">Phone:</span> +9860491739</li>
            <li><span className="text-gray-200 font-medium">Address:</span> Sapdobato, Kathmandu, Nepal</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 bg-black/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; {currentYear}{" "}
            <span className="font-semibold text-blue-400">
              Wash Tech Nepal
            </span>
            . All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms</a>
            <a href="#" className="hover:text-blue-400 transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
