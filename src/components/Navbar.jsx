import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const renderLinks = () => {
    if (!user) return null;

    const commonBtnClasses =
      "w-full text-left px-4 py-2 rounded-md transition text-white hover:bg-yellow-400";

    if (user.role === 'Admin') {
      return (
        <>
          <button onClick={() => handleNavigate('/')} className={commonBtnClasses}>Dashboard</button>
          <button onClick={() => handleNavigate('/patients')} className={commonBtnClasses}>Patients</button>
          <button onClick={() => handleNavigate('/incidents')} className={commonBtnClasses}>Incidents</button>
          <button onClick={() => handleNavigate('/calendar')} className={commonBtnClasses}>Calendar</button>
        </>
      );
    }

    if (user.role === 'Patient') {
      return (
        <>
          <button onClick={() => handleNavigate('/')} className={commonBtnClasses}>Dashboard</button>
          <button onClick={() => handleNavigate('/mydata')} className={commonBtnClasses}>My Data</button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="bg-gradient-to-r from-teal-600 to-violet-600 shadow-lg px-6 py-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        <div
          className="text-xl font-bold text-white cursor-pointer select-none"
          onClick={() => handleNavigate('/')}
        >
          ENTNT Dental Center
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {user && (
            <>
              {user.role === 'Admin' && (
                <>
                  <button
                    onClick={() => handleNavigate('/')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigate('/patients')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    Patients
                  </button>
                  <button
                    onClick={() => handleNavigate('/incidents')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    Incidents
                  </button>
                  <button
                    onClick={() => handleNavigate('/calendar')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    Calendar
                  </button>
                </>
              )}
              {user.role === 'Patient' && (
                <>
                  <button
                    onClick={() => handleNavigate('/')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigate('/mydata')}
                    className="text-white hover:text-yellow-400 transition px-3 py-1 rounded-md"
                  >
                    My Data
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-md transition ml-4"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 bg-white shadow-lg rounded-md p-4 flex flex-col space-y-3 border border-gray-200">
          {renderLinks()}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
