import React, { useState } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const Settings = () => {
  const [config, setConfig] = useState({
    themeColor: "#3b82f6",
    dateFormat: "DD-MM-YYYY",
    timeFormat: "24-hour",
    holidays: [{ date: "2026-01-10", description: "New Year Holiday" }],
    workWeekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    companyDetails: {
      name: "Demo Company",
      contact: "0123456789",
      gstPan: "123456789",
    },
  });

  const [otpRequested, setOtpRequested] = useState(false);
  const [otpData, setOtpData] = useState({ otp: "", newPassword: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "contact", "gstPan"].includes(name)) {
      setConfig((prev) => ({
        ...prev,
        companyDetails: { ...prev.companyDetails, [name]: value },
      }));
    } else {
      setConfig((prev) => ({ ...prev, [name]: value }));
    }
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
    alert("Settings saved! (Dummy Frontend Only)");
  };

  const handleRequestOtp = () => {
    setOtpRequested(true);
    setMessage("OTP sent! Enter OTP and new password below.");
    setError(null);
  };

  const handlePasswordChange = () => {
    setMessage("Password changed successfully!");
    setOtpRequested(false);
    setOtpData({ otp: "", newPassword: "" });
    setError(null);
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Company Settings</h1>

        <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl space-y-6 border border-gray-200">
          {/* Company Name */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="w-full md:w-1/3 font-semibold">Company Name:</label>
            <input
              type="text"
              name="name"
              value={config.companyDetails.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="w-full md:w-1/3 font-semibold">Contact:</label>
            <input
              type="text"
              name="contact"
              value={config.companyDetails.contact}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* GST/PAN */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="w-full md:w-1/3 font-semibold">GST / PAN:</label>
            <input
              type="text"
              name="gstPan"
              value={config.companyDetails.gstPan}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Theme Color */}
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

          {/* Date Format */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="w-full md:w-1/3 font-semibold">Date Format:</label>
            <select
              name="dateFormat"
              value={config.dateFormat}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
            >
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="MM-DD-YYYY">MM-DD-YYYY</option>
            </select>
          </div>

          {/* Time Format */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="w-full md:w-1/3 font-semibold">Time Format:</label>
            <select
              name="timeFormat"
              value={config.timeFormat}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
            >
              <option value="12-hour">12-hour</option>
              <option value="24-hour">24-hour</option>
            </select>
          </div>

          {/* Work Week Days */}
          <div>
            <label className="font-semibold mb-2 block">Work Week Days:</label>
            <div className="flex flex-wrap gap-3">
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
                  value={h.date || ""}
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
                  className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addHoliday}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 mt-2"
            >
              Add Holiday
            </button>
          </div>

          {/* Password Change */}
          <div className="border-t pt-4 mt-6">
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            {message && <p className="text-green-600 mb-2">{message}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}

            {!otpRequested ? (
              <button
                onClick={handleRequestOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Request OTP
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpData.otp}
                  onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={otpData.newPassword}
                  onChange={(e) => setOtpData({ ...otpData, newPassword: e.target.value })}
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default Settings;
