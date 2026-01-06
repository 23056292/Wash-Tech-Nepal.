import React, { useState, useEffect } from "react";
import CompanyLayout from "../../layout/CompanyLayout";

const CompanyProfile = () => {
  // ✅ Dummy company data
  const DUMMY_COMPANY = {
    name: "Tech Corp",
    email: "info@techcorp.com",
    phone: "1234567890",
    address: "123 Main St, Kathmandu, Nepal",
    gstOrPan: "PAN123456",
  };

  const [company, setCompany] = useState(DUMMY_COMPANY);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------- Handle Input Change ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- Save Changes ----------------
  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      setMessage("✅ Profile updated successfully!");
    }, 800);
  };

  return (
    <CompanyLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🏢 Company Profile</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mb-4 text-sm font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Company Name</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={company.email}
              disabled
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={company.address}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
            />
          </div>

          {/* GST / PAN */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">GST / PAN</label>
            <input
              type="text"
              name="gstOrPan"
              value={company.gstOrPan}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
            />
          </div>

          {/* Buttons */}
          {editing && (
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setMessage("");
                  setCompany(DUMMY_COMPANY);
                }}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </CompanyLayout>
  );
};

export default CompanyProfile;
