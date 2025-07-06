import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Unique Gradient Header */}
      <header className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-violet-600 text-white shadow-xl px-6 py-4 sticky top-0 z-40">
        <div
          className="text-xl font-bold cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          ENTNT Dental Center
        </div>

        {/* Hamburger icon (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          {user?.role === 'Admin' && (
            <>
              <button
                onClick={() => handleNavigate('/patients')}
                className="hover:text-yellow-300 transition"
              >
                Patients
              </button>
              <button
                onClick={() => handleNavigate('/incidents')}
                className="hover:text-yellow-300 transition"
              >
                Incidents
              </button>
            </>
          )}

          {user?.role === 'Patient' && (
            <button
              onClick={() => handleNavigate('/mydata')}
              className="hover:text-yellow-300 transition"
            >
              My Data
            </button>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Slide-in mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4 flex flex-col space-y-4">
            {/* Close Icon */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-teal-700">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            {user?.role === 'Admin' && (
              <>
                <button
                  onClick={() => handleNavigate('/patients')}
                  className="text-left text-gray-700 hover:text-violet-600 transition"
                >
                  Patients
                </button>
                <button
                  onClick={() => handleNavigate('/incidents')}
                  className="text-left text-gray-700 hover:text-violet-600 transition"
                >
                  Incidents
                </button>
              </>
            )}

            {user?.role === 'Patient' && (
              <button
                onClick={() => handleNavigate('/mydata')}
                className="text-left text-gray-700 hover:text-violet-600 transition"
              >
                My Data
              </button>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-left bg-rose-500 text-white px-3 py-1 rounded-md hover:bg-rose-600 transition mt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
