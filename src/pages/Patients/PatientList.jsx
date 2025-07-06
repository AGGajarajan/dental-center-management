import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      setPatients(db.patients);
    }
  }, []);

  const deletePatient = (id) => {
    if (window.confirm('Delete this patient?')) {
      const db = JSON.parse(localStorage.getItem('db'));
      const newPatients = db.patients.filter(p => p.id !== id);
      db.patients = newPatients;
      localStorage.setItem('db', JSON.stringify(db));
      setPatients(newPatients);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Patients</h2>
          <button
            onClick={() => navigate('/patients/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            ➕ Add Patient
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">DOB</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Health Info</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">{p.dob}</td>
                    <td className="px-4 py-3">{p.contact}</td>
                    <td className="px-4 py-3">{p.healthInfo}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/patients/edit/${p.id}`)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs sm:text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deletePatient(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                      >
                        🗑️ Delete
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
            className="text-blue-600 hover:underline text-sm"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PatientList;
