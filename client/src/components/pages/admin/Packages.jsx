import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

const Packages = () => {
  
  const DUMMY_PACKAGES = [
    {
      _id: 1,
      name: "Basic",
      description: "For small teams",
      staffLimit: 5,
      price: 49,
      modules: { imsEnabled: true, payrollEnabled: false },
    },
    {
      _id: 2,
      name: "Standard",
      description: "For medium teams",
      staffLimit: 20,
      price: 149,
      modules: { imsEnabled: true, payrollEnabled: true },
    },
    {
      _id: 3,
      name: "Premium",
      description: "For large teams",
      staffLimit: 100,
      price: 499,
      modules: { imsEnabled: true, payrollEnabled: true },
    },
  ];

  const [packages, setPackages] = useState(DUMMY_PACKAGES);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(defaultForm());
  const [saving, setSaving] = useState(false);

  function defaultForm() {
    return {
      _id: null,
      name: "",
      description: "",
      staffLimit: 10,
      imsEnabled: true,
      payrollEnabled: false,
      price: 0,
    };
  }

  const handleAdd = () => {
    setFormData(defaultForm());
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setFormData({
      ...pkg,
      imsEnabled: pkg.modules?.imsEnabled ?? true,
      payrollEnabled: pkg.modules?.payrollEnabled ?? false,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    setPackages(packages.filter((pkg) => pkg._id !== id));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Package name is required");
      return;
    }

    setSaving(true);

    const newPackage = {
      ...formData,
      modules: { imsEnabled: formData.imsEnabled, payrollEnabled: formData.payrollEnabled },
      _id: formData._id || Date.now(), // assign ID if new
    };

    if (formData._id) {
      // update existing
      setPackages(packages.map((pkg) => (pkg._id === formData._id ? newPackage : pkg)));
    } else {
      // add new
      setPackages([...packages, newPackage]);
    }

    setSaving(false);
    setShowForm(false);
    setFormData(defaultForm());
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Packages</h1>

      {!showForm && (
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Package
        </button>
      )}

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-4 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            {formData._id ? "Edit Package" : "Add Package"}
          </h2>

          <input
            type="text"
            placeholder="Package Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-3 mb-3">
            <input
              type="number"
              placeholder="Staff Limit"
              value={formData.staffLimit}
              onChange={(e) => setFormData({ ...formData, staffLimit: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex space-x-6 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.imsEnabled}
                onChange={(e) => setFormData({ ...formData, imsEnabled: e.target.checked })}
                className="h-5 w-5"
              />
              <span>IMS Enabled</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.payrollEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, payrollEnabled: e.target.checked })
                }
                className="h-5 w-5"
              />
              <span>Payroll Enabled</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`${
                saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded-lg transition`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow mt-6 overflow-x-auto">
        {packages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No packages found.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 rounded-t-lg">
              <tr>
                <th className="border-b p-3">#</th>
                <th className="border-b p-3">Name</th>
                <th className="border-b p-3">Description</th>
                <th className="border-b p-3">Staff Limit</th>
                <th className="border-b p-3">IMS</th>
                <th className="border-b p-3">Payroll</th>
                <th className="border-b p-3">Price ($)</th>
                <th className="border-b p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, idx) => (
                <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                  <td className="border-b p-3">{idx + 1}</td>
                  <td className="border-b p-3">{pkg.name}</td>
                  <td className="border-b p-3">{pkg.description || "-"}</td>
                  <td className="border-b p-3">{pkg.staffLimit}</td>
                  <td className="border-b p-3">{pkg.modules?.imsEnabled ? "Yes" : "No"}</td>
                  <td className="border-b p-3">{pkg.modules?.payrollEnabled ? "Yes" : "No"}</td>
                  <td className="border-b p-3">{pkg.price}</td>
                  <td className="border-b p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Packages;
