import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const ViewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [appointmentsForDay, setAppointmentsForDay] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    const data = db?.incidents || [];
    setIncidents(data);
  }, []);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const handleDayClick = (day) => {
    if (!day) return;
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);

    const dayAppointments = incidents.filter((incident) => {
      const date = new Date(incident.appointmentDate);
      return (
        date.getFullYear() === selected.getFullYear() &&
        date.getMonth() === selected.getMonth() &&
        date.getDate() === selected.getDate()
      );
    });

    setAppointmentsForDay(dayAppointments);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setAppointmentsForDay([]);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setAppointmentsForDay([]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4 sm:p-6">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Appointment Calendar</h2>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
            >
              &lt; Prev
            </button>
            <h3 className="text-lg font-medium text-gray-700">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
            >
              Next &gt;
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 font-medium mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {calendarDays.map((day, idx) => {
              const hasAppt = day && incidents.some((i) => {
                const date = new Date(i.appointmentDate);
                return (
                  date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getDate() === day
                );
              });

              const isSelected = selectedDate &&
                day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear();

              return (
                <div
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  className={`h-14 sm:h-16 flex items-center justify-center border rounded-md text-sm cursor-pointer transition-all
                    ${day ? 'bg-white hover:shadow-md' : 'bg-transparent cursor-default'}
                    ${hasAppt ? 'border-blue-500 text-blue-600 font-semibold' : 'border-gray-300'}
                    ${isSelected ? 'bg-blue-100 ring-2 ring-blue-400' : ''}`}
                >
                  {day || ''}
                </div>
              );
            })}
          </div>

          {/* Appointments */}
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              {selectedDate
                ? `🗓 Appointments on ${selectedDate.toDateString()}`
                : 'Click a date to see appointments'}
            </h3>

            {appointmentsForDay.length === 0 && selectedDate ? (
              <p className="text-gray-500">No appointments found.</p>
            ) : (
              <ul className="space-y-4">
                {appointmentsForDay.map((a) => (
                  <li
                    key={a.id}
                    className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-blue-700 mb-1">{a.title}</h4>
                    <p className="text-sm text-gray-700">
                      🕒{' '}
                      {new Date(a.appointmentDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{a.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-indigo-600 hover:underline text-sm"
            >
              ⬅ Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewCalendar;
