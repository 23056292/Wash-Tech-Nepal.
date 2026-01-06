import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

const Reports = () => {
  // ✅ Dummy companies and staff data
  const DUMMY_COMPANIES = [
    { _id: 1, name: "Tech Corp" },
    { _id: 2, name: "Health Solutions" },
    { _id: 3, name: "EduSoft" },
  ];

  const DUMMY_STAFF = {
    1: [
      { _id: 101, name: "Alice Johnson" },
      { _id: 102, name: "Bob Smith" },
    ],
    2: [
      { _id: 201, name: "Carol White" },
      { _id: 202, name: "David Brown" },
    ],
    3: [
      { _id: 301, name: "Eve Black" },
      { _id: 302, name: "Frank Green" },
    ],
  };

  const [filters, setFilters] = useState({
    companyId: "",
    staffId: "",
    rangeType: "custom",
    startDate: "",
    endDate: "",
  });

  const [companies, setCompanies] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load dummy companies
  useEffect(() => {
    setCompanies(DUMMY_COMPANIES);
  }, []);

  // Update staff based on selected company
  useEffect(() => {
    if (!filters.companyId) {
      setStaffs([]);
      setFilters((prev) => ({ ...prev, staffId: "" }));
      return;
    }
    setStaffs(DUMMY_STAFF[filters.companyId] || []);
    setFilters((prev) => ({ ...prev, staffId: "" }));
  }, [filters.companyId]);

  // Dummy download function
  const handleDownload = () => {
    if (
      filters.rangeType === "custom" &&
      (!filters.startDate || !filters.endDate)
    ) {
      alert("Please select start and end dates for custom report");
      return;
    }

    setLoading(true);

    // Simulate download
    setTimeout(() => {
      alert(
        `Report generated for ${
          filters.companyId
            ? companies.find((c) => c._id === filters.companyId)?.name
            : "All Companies"
        } ${
          filters.staffId
            ? " / " + staffs.find((s) => s._id === filters.staffId)?.name
            : ""
        } from ${filters.startDate || "N/A"} to ${filters.endDate || "N/A"}`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-8">📊 Staff Reports</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200 max-w-3xl mx-auto">
        {/* Company Selection */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Company
          </label>
          <select
            value={filters.companyId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, companyId: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">-- All Companies --</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Staff Selection */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Staff</label>
          <select
            value={filters.staffId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, staffId: e.target.value }))
            }
            disabled={!filters.companyId || staffs.length === 0}
            className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              !filters.companyId ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">-- All Staff --</option>
            {staffs.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Range Type */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Report Range
          </label>
          <select
            value={filters.rangeType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, rangeType: e.target.value }))
            }
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
              <label className="block font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="pt-4">
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold text-white transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating Report..." : "📥 Download Report"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
