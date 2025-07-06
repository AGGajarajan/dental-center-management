import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db')) || { patients: [] };
    const newPatient = {
      id: 'p' + (db.patients.length + 1),
      ...formData
    };
    db.patients.push(newPatient);
    localStorage.setItem('db', JSON.stringify(db));
    navigate('/patients');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Full Name *</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Date of Birth *</span>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Contact Number *</span>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="+91 12345 67890"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Health Information</span>
          <textarea
            name="healthInfo"
            value={formData.healthInfo}
            onChange={handleChange}
            rows={4}
            placeholder="Enter any relevant health info"
            className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-md shadow-md transition"
          >
            Add Patient
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="w-full sm:w-auto px-8 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
