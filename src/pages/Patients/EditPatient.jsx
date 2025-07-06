import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    const patient = db.patients.find(p => p.id === id);
    if (patient) setFormData(patient);
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));
    const index = db.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      db.patients[index] = formData;
      localStorage.setItem('db', JSON.stringify(db));
      navigate('/patients');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Patient</h2>
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
            Save
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

      <div className="mt-6">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate('/')}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EditPatient;
