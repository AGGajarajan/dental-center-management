import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      setIncidents(db.incidents);
      setPatients(db.patients);
    }
  }, []);

  const deleteIncident = (id) => {
    if (window.confirm('Delete this incident?')) {
      const db = JSON.parse(localStorage.getItem('db'));
      const newIncidents = db.incidents.filter(i => i.id !== id);
      db.incidents = newIncidents;
      localStorage.setItem('db', JSON.stringify(db));
      setIncidents(newIncidents);
    }
  };

  const getPatientName = (pid) => {
    const p = patients.find(p => p.id === pid);
    return p ? p.name : "Unknown";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-md shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Incidents (Appointments)</h2>
          <button
            onClick={() => navigate('/incidents/add')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
          >
            ➕ Add Incident
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                {['Title', 'Patient', 'Appointment Date', 'Status', 'Cost', 'Actions'].map(header => (
                  <th key={header} className="border border-gray-300 px-3 sm:px-4 py-2 whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No incidents found.</td>
                </tr>
              ) : (
                incidents.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50 transition">
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">{i.title}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">{getPatientName(i.patientId)}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">
                      {new Date(i.appointmentDate).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">{i.status || "Pending"}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">{i.cost ? `$${i.cost}` : "-"}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2">
                      <button
                        onClick={() => deleteIncident(i.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-xs sm:text-sm"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition text-sm"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default IncidentList;
