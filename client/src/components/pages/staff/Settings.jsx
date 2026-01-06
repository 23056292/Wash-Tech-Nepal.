import React, { useState } from "react";
import StaffLayout from "../../layout/StaffLayout";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Settings = () => {
  // ✅ Dummy data
  const [staff, setStaff] = useState({
    name: "John Doe",
    phone: "9876543210",
    profilePic: null,
    workDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shiftTime: { start: "09:00", end: "18:00" },
  });

  const [saving, setSaving] = useState(false);

  // OTP states (dummy)
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpData, setOtpData] = useState({ otp: "", newPassword: "" });

  // ---------------- Handle Form Change ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "shiftStart") {
      setStaff((prev) => ({ ...prev, shiftTime: { ...prev.shiftTime, start: value } }));
    } else if (name === "shiftEnd") {
      setStaff((prev) => ({ ...prev, shiftTime: { ...prev.shiftTime, end: value } }));
    } else if (name.startsWith("workDay_")) {
      const day = name.split("_")[1];
      setStaff((prev) => {
        const workDays = prev.workDays.includes(day)
          ? prev.workDays.filter((d) => d !== day)
          : [...prev.workDays, day];
        return { ...prev, workDays };
      });
    } else {
      setStaff((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------------- Save Settings (dummy) ----------------
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      alert("Settings saved (dummy)");
      setSaving(false);
    }, 500);
  };

  // ---------------- OTP Logic (dummy) ----------------
  const handleRequestOtp = () => {
    setOtpRequested(true);
    alert("OTP sent (dummy)");
  };

  const handlePasswordChange = () => {
    setOtpRequested(false);
    setOtpData({ otp: "", newPassword: "" });
    alert("Password changed (dummy)");
  };

  return (
    <StaffLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Settings</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5 transition hover:shadow-lg">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={staff.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Work Days */}
          <div>
            <label className="block text-gray-700 mb-1">Work Days</label>
            <div className="flex gap-3 flex-wrap">
              {DAYS.map((day) => (
                <label key={day} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`workDay_${day}`}
                    checked={staff.workDays.includes(day)}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <span className="text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Shift Start */}
          <div>
            <label className="block text-gray-700 mb-1">Shift Start</label>
            <input
              type="time"
              name="shiftStart"
              value={staff.shiftTime.start}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Shift End */}
          <div>
            <label className="block text-gray-700 mb-1">Shift End</label>
            <input
              type="time"
              name="shiftEnd"
              value={staff.shiftTime.end}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password Change */}
          <div className="border-t pt-4 mt-6 space-y-3">
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            {!otpRequested ? (
              <button
                onClick={handleRequestOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
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
                  className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={otpData.newPassword}
                  onChange={(e) => setOtpData({ ...otpData, newPassword: e.target.value })}
                  className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default Settings;
