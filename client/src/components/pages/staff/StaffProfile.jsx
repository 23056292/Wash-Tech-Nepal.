import React, { useEffect, useState } from "react";
import StaffLayout from "../../layout/StaffLayout";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  // ---------------- Dummy Fetch Profile ----------------
  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Dummy data instead of backend call
      const res = {
        success: true,
        data: {
          _id: "123",
          name: "Prabhat Lamichhane",
          email: "prabhat@gmail.com",
          phone: "+9860491739",
        },
      };

      if (res?.success) {
        setStaff(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
        });
      } else {
        alert("Failed to fetch profile");
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
      alert("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ---------------- Dummy Save Profile ----------------
  const handleSaveProfile = async () => {
    if (!formData.name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    const updateData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
    };

    setSaving(true);
    try {
      // Dummy save response
      const res = {
        success: true,
        message: "Profile updated successfully!",
        data: {
          ...staff,
          ...updateData,
        },
      };

      if (res?.success) {
        alert(res.message);
        setStaff(res.data);
        setEditing(false);
      } else {
        alert("Profile update failed");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <StaffLayout>
        <div className="text-center py-20 text-gray-500">Loading profile...</div>
      </StaffLayout>
    );

  if (!staff)
    return (
      <StaffLayout>
        <div className="text-center py-20 text-gray-500">
          Profile data not found. Please refresh the page.
        </div>
      </StaffLayout>
    );

  return (
    <StaffLayout>
      <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">My Profile</h2>

        {!editing ? (
          <>
            <p><strong>Name:</strong> {staff.name}</p>
            <p><strong>Email:</strong> {staff.email}</p>
            <p><strong>Phone:</strong> {staff.phone || "N/A"}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="Phone"
            />
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffProfile;
