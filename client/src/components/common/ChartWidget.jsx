import React from "react";

const ChartWidget = ({
  title = "Chart Title",
  value = "N/A",
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200
      shadow-md hover:shadow-xl transition-all duration-300 p-5 ${className}`}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-3 tracking-wide">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600 mb-5">{value}</p>

      <div
        className="h-48 bg-gray-100/50 rounded-lg flex items-center justify-center
        border border-dashed border-gray-300"
      >
        {children ? children : <span className="text-gray-400">Chart Placeholder</span>}
      </div>
    </div>
  );
};

export default ChartWidget;
