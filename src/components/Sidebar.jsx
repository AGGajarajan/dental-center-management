import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden md:flex flex-col">
      <div className="text-xl font-bold mb-8 text-blue-700 select-none cursor-default">
        ENTNT Dashboard
      </div>

      <nav className="flex flex-col space-y-3">
        {user && user.role === 'Admin' && (
          <>
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-red-700 text-left w-full transition hover:shadow-lg"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/patients')}
              className="text-gray-700 hover:text-blue-700 text-left w-full transition hover:shadow-lg"
            >
              Patients
            </button>
            <button
              onClick={() => navigate('/incidents')}
              className="text-gray-700 hover:text-green-700 text-left w-full transition hover:shadow-lg"
            >
              Incidents
            </button>
          </>
        )}

        {user && user.role === 'Patient' && (
          <>
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-700 text-left w-full transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/mydata')}
              className="text-gray-700 hover:text-blue-700 text-left w-full transition"
            >
              My Data
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
