import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Button from "../ui/Button";

const dummyUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "ADMIN",
  status: "active",
  permissions: ["read", "write", "delete"],
};

const Profile = () => {
  const [profile, setProfile] = useState(dummyUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpData, setOtpData] = useState({ otp: "", newPassword: "" });
  const [message, setMessage] = useState(null);

  // Dummy update function
  const handleUpdate = () => {
    setMessage("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleRequestOtp = () => {
    setOtpRequested(true);
    setMessage("OTP sent! Enter OTP and new password.");
  };

  const handlePasswordChange = () => {
    setMessage("Password changed successfully!");
    setIsChangingPassword(false);
    setOtpRequested(false);
    setOtpData({ otp: "", newPassword: "" });
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto mt-20 mb-20 p-6 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {profile.role === "ADMIN" ? "Admin Profile" : "Admin Staff Profile"}
        </h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        {!isEditing ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Status:</strong> {profile.status}</p>
            <p><strong>Permissions:</strong> {profile.permissions.join(", ") || "None"}</p>

            <div className="mt-4 flex gap-3">
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="secondary" onClick={() => setIsChangingPassword(true)}>
                Change Password
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Name"
            />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            <select
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="ADMIN_STAFF">ADMIN_STAFF</option>
            </select>
            <select
              value={profile.status}
              onChange={(e) => setProfile({ ...profile, status: e.target.value })}
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="text"
              value={profile.permissions.join(", ")}
              onChange={(e) =>
                setProfile({ ...profile, permissions: e.target.value.split(",") })
              }
              className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Permissions (comma separated)"
            />

            <div className="flex gap-3">
              <Button variant="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isChangingPassword && (
          <div className="mt-6 space-y-4">
            {!otpRequested ? (
              <Button variant="primary" onClick={handleRequestOtp}>
                Request OTP
              </Button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpData.otp}
                  onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                  className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={otpData.newPassword}
                  onChange={(e) => setOtpData({ ...otpData, newPassword: e.target.value })}
                  className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-blue-400"
                />
                <Button variant="primary" onClick={handlePasswordChange}>
                  Change Password
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Profile;
