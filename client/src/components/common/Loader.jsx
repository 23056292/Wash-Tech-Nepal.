import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-b-blue-400 border-l-transparent border-r-transparent animate-spin-slow shadow-lg">
      </div>
    </div>
  );
};

export default Loader;
