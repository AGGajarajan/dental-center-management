import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 sticky top-0 z-30">
      <div
        className="text-xl font-bold text-blue-700 cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        ENTNT Dental Center
      </div>

      <nav className="flex items-center space-x-4">
        {user && user.role === 'Admin' && (
          <>
            <button
              onClick={() => navigate('/patients')}
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Patients
            </button>
            <button
              onClick={() => navigate('/incidents')}
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Incidents
            </button>
          </>
        )}

        {user && user.role === 'Patient' && (
          <button
            onClick={() => navigate('/mydata')}
            className="text-gray-700 hover:text-blue-700 transition"
          >
            My Data
          </button>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
