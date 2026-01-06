import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "px-5 py-2.5 rounded-xl font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-sm";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 focus:ring-blue-500",
    secondary:
      "bg-white/80 backdrop-blur border border-gray-300 text-gray-700 hover:bg-white focus:ring-gray-400",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90 focus:ring-red-500",
    outline:
      "border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
