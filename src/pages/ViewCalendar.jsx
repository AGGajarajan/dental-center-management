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
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">📅 Appointment Calendar</h2>

          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              &lt; Prev
            </button>
            <h3 className="text-lg font-medium">
              {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Next &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-sm font-medium text-gray-600">{d}</div>
            ))}

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
                  className={`w-full h-16 flex items-center justify-center border rounded-md cursor-pointer transition
                    ${day ? 'bg-white hover:shadow-md' : 'bg-transparent cursor-default'}
                    ${hasAppt ? 'border-blue-500 text-blue-600 font-semibold' : 'border-gray-200'}
                    ${isSelected ? 'bg-blue-100 shadow-md' : ''}`}
                >
                  {day || ''}
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold mb-2">
              {selectedDate
                ? `Appointments on ${selectedDate.toDateString()}`
                : 'Click a day to view appointments'}
            </h3>

            {appointmentsForDay.length === 0 && selectedDate ? (
              <p className="text-gray-500">No appointments on this day.</p>
            ) : (
              <ul className="space-y-3">
                {appointmentsForDay.map((a) => (
                  <li
                    key={a.id}
                    className="p-3 border rounded shadow-sm bg-white hover:shadow-md transition"
                  >
                    <strong className="text-blue-600">{a.title}</strong> at{' '}
                    {new Date(a.appointmentDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    <p className="text-sm text-gray-700">{a.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
        className="mt-6 px-6 py-2 bg-white-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        onClick={() => navigate('/')}
      >
        ⬅ Back to Dashboard
      </button>
      </main>
    </div>
  );
};

export default ViewCalendar;
