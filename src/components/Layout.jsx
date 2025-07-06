import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  // Show sidebar only if not on the dashboard (/)
  const showSidebar = location.pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">


      <div className="flex flex-1">
        {showSidebar && (
          <div className="w-64 bg-white shadow-md">
            <Sidebar />
          </div>
        )}

        <main className={`flex-1 p-4 ${!showSidebar ? 'w-full' : ''}`}>
          {children}
        </main>
      </div>


    </div>
  );
};

export default Layout;
