import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // Optional: install `lucide-react` for icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const renderLinks = () => {
    if (!user) return null;

    if (user.role === 'Admin') {
      return (
        <>
          <button onClick={() => navigate('/')} className="nav-link">Dashboard</button>
          <button onClick={() => navigate('/patients')} className="nav-link">Patients</button>
          <button onClick={() => navigate('/incidents')} className="nav-link">Incidents</button>
          <button onClick={() => navigate('/calendar')} className="nav-link">Calendar</button>
        </>
      );
    }

    if (user.role === 'Patient') {
      return (
        <>
          <button onClick={() => navigate('/')} className="nav-link">Dashboard</button>
          <button onClick={() => navigate('/mydata')} className="nav-link">My Data</button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        <div
          className="text-xl font-bold text-blue-700 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          ENTNT Dental Center
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          {renderLinks()}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-2">
          {renderLinks()}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
