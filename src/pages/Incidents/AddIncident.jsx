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
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const removeFile = name => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.name !== name)
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db')) || { incidents: [], patients: [] };

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add New Incident
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Select Patient *</span>
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          >
            <option value="">-- Choose Patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Title *</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Incident Title"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Description *</span>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the incident"
            required
            className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Comments</span>
          <textarea
            name="comments"
            rows={3}
            value={formData.comments}
            onChange={handleChange}
            placeholder="Additional comments (optional)"
            className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Appointment Date *</span>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Cost</span>
            <input
              type="number"
              name="cost"
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              placeholder="₹0.00"
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            >
              <option value="">-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Next Appointment Date</span>
            <input
              type="date"
              name="nextDate"
              value={formData.nextDate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Upload Files</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full text-gray-700"
          />
        </label>

        {/* File preview */}
        <div className="mt-3 space-y-2">
          {formData.files.map(file => (
            <div
              key={file.name}
              className="flex items-center justify-between bg-gray-100 rounded-md p-2"
            >
              <span className="truncate max-w-xs text-gray-800">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="text-red-600 hover:text-red-800 font-semibold transition"
                aria-label={`Remove file ${file.name}`}
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-md shadow-md transition"
          >
            Add Incident
          </button>

          <button
            type="button"
            onClick={() => navigate('/incidents')}
            className="w-full sm:w-auto px-8 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncident;
