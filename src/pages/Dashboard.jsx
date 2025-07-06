import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    const incidents = db?.incidents || [];

    const upcoming = incidents.filter(
      (i) => new Date(i.appointmentDate) > new Date()
    );
    const completed = incidents.filter((i) => i.status === 'Completed');
    const pending = incidents.filter((i) => i.status !== 'Completed');
    const totalRevenue = completed.reduce((sum, i) => sum + (i.cost || 0), 0);

    setAppointments(upcoming.slice(0, 10));
    setRevenue(totalRevenue);
    setPending(pending.length);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <Header />

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome, <span className="text-blue-700">{user?.email}</span>
        </h2>

        {user?.role === 'Admin' && (
          <div className="flex flex-wrap gap-4 mb-6">
            {['/patients', '/incidents', '/calendar'].map((path, i) => {
              const labels = ['👥 Manage Patients', '🦷 Manage Incidents', '📅 View Calendar'];
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transform transition duration-300"
                >
                  {labels[i]}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: 'Upcoming Appointments',
            content: appointments.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments</p>
            ) : (
              <ul className="space-y-1 text-sm text-gray-700">
                {appointments.map((appt) => (
                  <li key={appt.id}>
                    <span className="font-medium">{appt.title}</span> on{' '}
                    {new Date(appt.appointmentDate).toLocaleString()}
                  </li>
                ))}
              </ul>
            ),
          }, {
            title: 'Revenue',
            content: <p className="text-2xl font-bold text-green-600">${revenue}</p>,
          }, {
            title: 'Pending Treatments',
            content: <p className="text-2xl font-bold text-red-600">{pending}</p>,
          }].map(({ title, content }) => (
            <div
              key={title}
              className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition duration-300 p-4 cursor-default"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
              {content}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
