import React, { useState, useEffect } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const CompanyReports = () => {
  const [filters, setFilters] = useState({
    staffId: "",
    rangeType: "daily",
    startDate: "",
    endDate: "",
  });

  // ---------- Dummy staff data ----------
  const DUMMY_STAFFS = [
    { _id: "1", name: "John Doe" },
    { _id: "2", name: "Alice Smith" },
    { _id: "3", name: "Bob Johnson" },
  ];

  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setStaffs(DUMMY_STAFFS);
  }, []);

  const getRangeDates = () => {
    const now = new Date();
    let start, end;

    switch (filters.rangeType) {
      case "daily":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "weekly":
        const day = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - day);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case "custom":
        start = filters.startDate ? new Date(filters.startDate) : new Date(0);
        end = filters.endDate ? new Date(filters.endDate) : new Date();
        break;
      default:
        start = new Date(0);
        end = new Date();
    }

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  };

  const handleDownload = () => {
    if (filters.rangeType === "custom") {
      if (!filters.startDate || !filters.endDate) {
        alert("Please select start and end dates for custom range");
        return;
      }
      if (new Date(filters.startDate) > new Date(filters.endDate)) {
        alert("Start date cannot be after end date");
        return;
      }
    }

    const { startDate, endDate } = getRangeDates();
    alert(`📄 Generating report for ${filters.staffId || "All Staff"} from ${startDate} to ${endDate}`);
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-8">📊 Staff Reports</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200">
        {/* Staff Dropdown */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Staff</label>
          <select
            value={filters.staffId}
            onChange={(e) => setFilters((prev) => ({ ...prev, staffId: e.target.value }))}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">-- All Staff --</option>
            {staffs.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Report Range */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Report Range</label>
          <select
            value={filters.rangeType}
            onChange={(e) => setFilters((prev) => ({ ...prev, rangeType: e.target.value }))}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Custom Date Picker */}
        {filters.rangeType === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="pt-4">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            📥 Download Report
          </button>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyReports;
