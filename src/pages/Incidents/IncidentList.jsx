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
    if (window.confirm('Are you sure you want to delete this incident?')) {
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

  const formatDate = (dateStr) => {
    const dt = new Date(dateStr);
    if (isNaN(dt)) return "-";
    return dt.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Incidents (Appointments)
          </h2>
          <button
            onClick={() => navigate('/incidents/add')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 transition text-sm sm:text-base font-semibold"
            aria-label="Add new incident"
          >
            <span className="text-lg">➕</span> Add Incident
          </button>
        </div>

        {/* Responsive table container */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white sticky top-0 z-10">
              <tr>
                {['Title', 'Patient', 'Appointment Date', 'Status', 'Cost', 'Actions'].map(header => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-4 py-3 font-semibold text-left text-sm sm:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 italic">
                    No incidents found.
                  </td>
                </tr>
              ) : (
                incidents.map((incident, idx) => (
                  <tr
                    key={incident.id}
                    className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-cyan-50 transition`}
                  >
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200">{incident.title}</td>
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200">{getPatientName(incident.patientId)}</td>
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200">{formatDate(incident.appointmentDate)}</td>
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        incident.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {incident.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200">
                      {incident.cost ? `₹${incident.cost.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm sm:text-base border border-gray-200 flex gap-2">
                      <button
                        onClick={() => deleteIncident(incident.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 text-xs sm:text-sm font-semibold transition"
                        aria-label={`Delete incident titled ${incident.title}`}
                      >
                        🗑 Delete
                      </button>
                      {/* You can add edit button here if needed */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition text-sm sm:text-base"
            aria-label="Back to dashboard"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default IncidentList;
