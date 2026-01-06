import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200
      shadow-md hover:shadow-xl transition-all duration-300 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
          {title}
        </h2>
      )}

      <div className="text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default Card;
