import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

// ✅ Dummy packages and companies
const DUMMY_PACKAGES = [
  { _id: "pkg1", name: "Basic", staffLimit: 5, modules: { imsEnabled: true, payrollEnabled: false } },
  { _id: "pkg2", name: "Pro", staffLimit: 15, modules: { imsEnabled: true, payrollEnabled: true } },
  { _id: "pkg3", name: "Enterprise", staffLimit: 50, modules: { imsEnabled: true, payrollEnabled: true } },
];

const DUMMY_COMPANIES = [
  { _id: 1, name: "ABC Corp", email: "abc@corp.com", packageId: DUMMY_PACKAGES[1], imsEnabled: true, payrollEnabled: true, totalStaff: 12 },
  { _id: 2, name: "XYZ Ltd", email: "xyz@ltd.com", packageId: DUMMY_PACKAGES[0], imsEnabled: true, payrollEnabled: false, totalStaff: 3 },
];

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultForm());

  function defaultForm() {
    return {
      _id: "",
      name: "",
      email: "",
      password: "",
      packageId: "",
      imsEnabled: true,
      payrollEnabled: false,
      totalStaff: 0,
    };
  }

  useEffect(() => {
    // Load dummy data
    setCompanies(DUMMY_COMPANIES);
    setPackages(DUMMY_PACKAGES);
  }, []);

  const handlePackageChange = (packageId) => {
    const selectedPackage = packages.find((pkg) => pkg._id === packageId);
    setFormData({
      ...formData,
      packageId,
      imsEnabled: selectedPackage?.modules?.imsEnabled ?? true,
      payrollEnabled: selectedPackage?.modules?.payrollEnabled ?? false,
      totalStaff: 0,
    });
  };

  const handleAdd = () => {
    setFormData(defaultForm());
    setShowForm(true);
  };

  const handleEdit = (company) => {
    setFormData({
      _id: company._id,
      name: company.name,
      email: company.email,
      password: "",
      packageId: company.packageId?._id || "",
      imsEnabled: company.imsEnabled,
      payrollEnabled: company.payrollEnabled,
      totalStaff: company.totalStaff,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this company?")) return;
    setCompanies((prev) => prev.filter((c) => c._id !== id));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.packageId) {
      return alert("Name, Email, and Package are required");
    }

    setSaving(true);
    setTimeout(() => {
      if (formData._id) {
        // Update
        setCompanies((prev) =>
          prev.map((c) => (c._id === formData._id ? { ...formData, packageId: packages.find(p => p._id === formData.packageId) } : c))
        );
        alert("Company updated successfully");
      } else {
        // Add new
        setCompanies((prev) => [
          ...prev,
          { ...formData, _id: Date.now(), packageId: packages.find(p => p._id === formData.packageId) },
        ]);
        alert("Company added successfully");
      }
      setShowForm(false);
      setFormData(defaultForm());
      setSaving(false);
    }, 500);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Companies</h1>

      {!showForm && (
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
        >
          Add Company
        </button>
      )}

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{formData._id ? "Edit Company" : "Add Company"}</h2>

          <input
            type="text"
            placeholder="Company Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!formData._id}
          />
          {!formData._id && (
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <select
            value={formData.packageId}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name} ({pkg.staffLimit} staff)
              </option>
            ))}
          </select>

          <div className="space-x-2 mt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`${
                saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded transition`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        {companies.length === 0 ? (
          <p className="text-gray-500">No companies found</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-blue-50">
                <th className="py-2 px-2">#</th>
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Package</th>
                <th className="py-2 px-2">IMS</th>
                <th className="py-2 px-2">Payroll</th>
                <th className="py-2 px-2">Total Staff</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) => (
                <tr key={company._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-2">{idx + 1}</td>
                  <td className="py-2 px-2">{company.name}</td>
                  <td className="py-2 px-2">{company.email}</td>
                  <td className="py-2 px-2">{company.packageId?.name || "N/A"}</td>
                  <td className="py-2 px-2">{company.imsEnabled ? "Yes" : "No"}</td>
                  <td className="py-2 px-2">{company.payrollEnabled ? "Yes" : "No"}</td>
                  <td className="py-2 px-2">{company.totalStaff}</td>
                  <td className="py-2 px-2 space-x-2">
                    <button
                      onClick={() => handleEdit(company)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
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

export default Companies;
