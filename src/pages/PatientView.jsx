import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientView = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      const pat = db.patients.find(p => p.id === user.patientId);
      setPatient(pat);
      const myIncidents = db.incidents.filter(i => i.patientId === user.patientId);
      setIncidents(myIncidents);
    }
  }, [user]);

  if (!patient) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome, {patient.name}</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <section className="mb-8">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">Your Info</h3>
        <div className="space-y-2 text-gray-700">
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-blue-700 mb-3">Your Appointments</h3>
        {incidents.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {incidents.map(i => (
              <li key={i.id} className="p-4 border rounded-md bg-gray-50 shadow-sm hover:shadow-md transition">
                <p><strong>{i.title}</strong> on {new Date(i.appointmentDate).toLocaleString()}</p>
                <p>Status: <span className={`font-semibold ${i.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{i.status || 'Pending'}</span></p>
                <p>Treatment Cost: <span className="text-gray-700">{i.cost ? `$${i.cost}` : 'N/A'}</span></p>
                <p>
                  Treatment Files:
                  {i.files && i.files.length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {i.files.map(f => (
                        <li key={f.name}>
                          <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            {f.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">No files</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline text-sm"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PatientView;
