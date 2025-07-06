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

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading your data...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, <span className="text-blue-700">{patient.name}</span>
        </h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </header>

      {/* Patient Info */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-indigo-600 mb-3">🧾 Your Info</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p className="sm:col-span-2">
            <strong>Health Info:</strong> {patient.healthInfo}
          </p>
        </div>
      </section>

      {/* Appointment List */}
      <section>
        <h3 className="text-lg font-semibold text-indigo-600 mb-3">📋 Your Appointments</h3>
        {incidents.length === 0 ? (
          <p className="text-gray-500 italic">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="p-4 rounded-lg bg-gray-50 border hover:shadow-md transition text-sm sm:text-base"
              >
                <p className="font-semibold text-blue-800">{i.title}</p>
                <p className="text-gray-700">
                  Date: {new Date(i.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      i.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {i.status || "Pending"}
                  </span>
                </p>
                <p className="text-gray-700">
                  Cost: <span className="text-gray-800">{i.cost ? `₹${i.cost}` : 'N/A'}</span>
                </p>
                <div className="text-gray-700">
                  Files:
                  {i.files && i.files.length > 0 ? (
                    <ul className="ml-6 list-disc mt-1 space-y-1">
                      {i.files.map((f) => (
                        <li key={f.name}>
                          <a
                            href={f.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            {f.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">No files</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:underline text-sm"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PatientView;
