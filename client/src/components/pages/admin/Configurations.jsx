import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

const Configurations = ({ userType = "ADMIN" }) => {
  // ✅ Dummy configuration data
  const DUMMY_CONFIG = {
    locationTrackingInterval: 10,
    staffLimitPerCompany: 50,
    enableFakeLocationDetection: true,
    themeColor: "#0d6efd",
    dateFormat: "DD-MM-YYYY",
    timeFormat: "24-hour",
    holidays: [
      { date: "2026-01-01", description: "New Year" },
      { date: "2026-04-14", description: "Holiday Example" },
    ],
    workWeekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  };

  const [config, setConfig] = useState(DUMMY_CONFIG);

  // Weekdays for checkboxes
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWorkWeekChange = (day) => {
    setConfig((prev) => {
      const newDays = prev.workWeekDays.includes(day)
        ? prev.workWeekDays.filter((d) => d !== day)
        : [...prev.workWeekDays, day];
      return { ...prev, workWeekDays: newDays };
    });
  };

  const handleHolidayChange = (index, field, value) => {
    const updatedHolidays = [...config.holidays];
    updatedHolidays[index][field] = value;
    setConfig((prev) => ({ ...prev, holidays: updatedHolidays }));
  };

  const addHoliday = () => {
    setConfig((prev) => ({
      ...prev,
      holidays: [...prev.holidays, { date: "", description: "" }],
    }));
  };

  const removeHoliday = (index) => {
    const updatedHolidays = [...config.holidays];
    updatedHolidays.splice(index, 1);
    setConfig((prev) => ({ ...prev, holidays: updatedHolidays }));
  };

  const handleSave = () => {
    alert("Configuration saved!\n" + JSON.stringify(config, null, 2));
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">System Configurations</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl space-y-6">
        {/* Admin-only fields */}
        {userType === "ADMIN" && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <label className="w-full md:w-1/3 font-semibold">Location Tracking Interval (min):</label>
              <input
                type="number"
                name="locationTrackingInterval"
                value={config.locationTrackingInterval}
                onChange={handleChange}
                min={1}
                max={60}
                className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <label className="w-full md:w-1/3 font-semibold">Staff Limit per Company:</label>
              <input
                type="number"
                name="staffLimitPerCompany"
                value={config.staffLimitPerCompany}
                onChange={handleChange}
                min={1}
                className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="enableFakeLocationDetection"
                checked={config.enableFakeLocationDetection}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="font-semibold">Enable Fake Location Detection</span>
            </div>
          </>
        )}

        {/* Theme, Date & Time */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-full md:w-1/3 font-semibold">Theme Color:</label>
          <input
            type="color"
            name="themeColor"
            value={config.themeColor}
            onChange={handleChange}
            className="w-16 h-10 border rounded-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-full md:w-1/3 font-semibold">Date Format:</label>
          <select
            name="dateFormat"
            value={config.dateFormat}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
            <option value="MM-DD-YYYY">MM-DD-YYYY</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-full md:w-1/3 font-semibold">Time Format:</label>
          <select
            name="timeFormat"
            value={config.timeFormat}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="12-hour">12-hour</option>
            <option value="24-hour">24-hour</option>
          </select>
        </div>

        {/* Work Week Days */}
        <div>
          <label className="font-semibold mb-2 block">Work Week Days:</label>
          <div className="flex flex-wrap gap-4">
            {weekDays.map((day) => (
              <label key={day} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={config.workWeekDays.includes(day)}
                  onChange={() => handleWorkWeekChange(day)}
                  className="h-4 w-4"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Holidays */}
        <div>
          <label className="font-semibold mb-2 block">Holidays:</label>
          {config.holidays.map((h, idx) => (
            <div key={idx} className="flex space-x-2 mb-2 items-center">
              <input
                type="date"
                value={h.date ? h.date : ""}
                onChange={(e) => handleHolidayChange(idx, "date", e.target.value)}
                className="border rounded-lg px-2 py-1"
              />
              <input
                type="text"
                value={h.description}
                placeholder="Description"
                onChange={(e) => handleHolidayChange(idx, "description", e.target.value)}
                className="border rounded-lg px-2 py-1 flex-1"
              />
              <button
                onClick={() => removeHoliday(idx)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addHoliday}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition mt-2"
          >
            Add Holiday
          </button>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Configurations;
