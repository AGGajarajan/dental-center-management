import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddIncident = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: '',
    nextDate: '',
    files: []
  });

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) setPatients(db.patients);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    const filesArr = Array.from(e.target.files);
    const readers = filesArr.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setFormData(prev => ({ ...prev, files: [...prev.files, ...results] }));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));

    const newIncident = {
      id: 'i' + (db.incidents.length + 1),
      patientId: formData.patientId,
      title: formData.title,
      description: formData.description,
      comments: formData.comments,
      appointmentDate: formData.appointmentDate,
      cost: formData.cost ? Number(formData.cost) : 0,
      status: formData.status,
      nextDate: formData.nextDate,
      files: formData.files
    };

    db.incidents.push(newIncident);
    localStorage.setItem('db', JSON.stringify(db));
    navigate('/incidents');
  };

  const removeFile = name => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.name !== name)
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Incident</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="datetime-local"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          name="nextDate"
          value={formData.nextDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full text-gray-700"
        />

        {/* File preview */}
        <div className="mt-2 space-y-2">
          {formData.files.map(f => (
            <div
              key={f.name}
              className="flex items-center justify-between bg-gray-100 rounded-md p-2"
            >
              <span className="truncate max-w-xs">{f.name}</span>
              <button
                type="button"
                onClick={() => removeFile(f.name)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Incident
          </button>
          <button
            type="button"
            onClick={() => navigate('/incidents')}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncident;
