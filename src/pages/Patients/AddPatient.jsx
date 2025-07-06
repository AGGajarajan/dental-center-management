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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));
    const newPatient = {
      id: 'p' + (db.patients.length + 1),
      ...formData
    };
    db.patients.push(newPatient);
    localStorage.setItem('db', JSON.stringify(db));
    navigate('/patients');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="healthInfo"
          placeholder="Health Info"
          value={formData.healthInfo}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
