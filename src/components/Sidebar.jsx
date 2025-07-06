import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, AlertCircle, FileText } from 'lucide-react'; // Optional icons

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check active route for styling
  const isActive = (path) => location.pathname === path;

  // Common button classes + active styling
  const baseBtnClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer select-none";

  const activeBtnClass =
    "bg-gradient-to-r from-teal-500 to-violet-600 text-white shadow-lg";

  const inactiveBtnClass =
    "text-gray-700 hover:bg-gray-100 hover:text-teal-600";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden md:flex flex-col">
      <div className="text-2xl font-extrabold mb-10 text-teal-700 select-none cursor-default tracking-wide">
        ENTNT Dashboard
      </div>

      <nav className="flex flex-col space-y-3">
        {user && user.role === 'Admin' && (
          <>
            <div
              className={`${baseBtnClass} ${
                isActive('/') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/')}
              aria-current={isActive('/') ? "page" : undefined}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </div>

            <div
              className={`${baseBtnClass} ${
                isActive('/patients') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/patients')}
              aria-current={isActive('/patients') ? "page" : undefined}
            >
              <Users className="w-5 h-5" />
              Patients
            </div>

            <div
              className={`${baseBtnClass} ${
                isActive('/incidents') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/incidents')}
              aria-current={isActive('/incidents') ? "page" : undefined}
            >
              <AlertCircle className="w-5 h-5" />
              Incidents
            </div>

            <div
              className={`${baseBtnClass} ${
                isActive('/calendar') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/calendar')}
              aria-current={isActive('/calendar') ? "page" : undefined}
            >
              <FileText className="w-5 h-5" />
              Calendar
            </div>
          </>
        )}

        {user && user.role === 'Patient' && (
          <>
            <div
              className={`${baseBtnClass} ${
                isActive('/') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/')}
              aria-current={isActive('/') ? "page" : undefined}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </div>

            <div
              className={`${baseBtnClass} ${
                isActive('/mydata') ? activeBtnClass : inactiveBtnClass
              }`}
              onClick={() => navigate('/mydata')}
              aria-current={isActive('/mydata') ? "page" : undefined}
            >
              <Users className="w-5 h-5" />
              My Data
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
