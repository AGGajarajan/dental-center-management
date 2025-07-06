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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Patients
          </h2>
          <button
            onClick={() => navigate('/patients/add')}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-md shadow-md transition text-sm sm:text-base font-semibold"
          >
            ➕ Add Patient
          </button>
        </div>

        {/* Responsive scrollable table container */}
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="w-full table-auto sm:table-fixed divide-y divide-gray-200 text-sm sm:text-base">
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
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 break-words max-w-xs">{p.name}</td>
                    <td className="px-4 py-3 break-words">{p.dob}</td>
                    <td className="px-4 py-3 break-words">{p.contact}</td>
                    <td className="px-4 py-3 break-words max-w-sm">{p.healthInfo}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                        <button
                          onClick={() => navigate(`/patients/edit/${p.id}`)}
                          className="px-4 py-2 w-full sm:w-auto bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition text-xs sm:text-sm font-semibold"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deletePatient(p.id)}
                          className="px-4 py-2 w-full sm:w-auto bg-red-500 text-white rounded-md hover:bg-red-600 transition text-xs sm:text-sm font-semibold"
                        >
                          🗑️ Delete
                        </button>
                      </div>
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
            className="w-full sm:w-auto text-indigo-600 hover:underline text-sm sm:text-base font-semibold"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PatientList;
