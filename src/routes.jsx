import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/Patients/PatientList';
import AddPatient from './pages/Patients/AddPatient';
import EditPatient from './pages/Patients/EditPatient';
import IncidentList from './pages/Incidents/IncidentList';
import AddIncident from './pages/Incidents/AddIncident';
import PatientView from './pages/PatientView';
import ViewCalendar from './pages/ViewCalendar'; // <-- Add this import
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute role="Admin"><PatientList /></ProtectedRoute>} />
      <Route path="/patients/add" element={<ProtectedRoute role="Admin"><AddPatient /></ProtectedRoute>} />
      <Route path="/patients/edit/:id" element={<ProtectedRoute role="Admin"><EditPatient /></ProtectedRoute>} />
      <Route path="/incidents" element={<ProtectedRoute role="Admin"><IncidentList /></ProtectedRoute>} />
      <Route path="/incidents/add" element={<ProtectedRoute role="Admin"><AddIncident /></ProtectedRoute>} />
      <Route path="/mydata" element={<ProtectedRoute role="Patient"><PatientView /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute role="Admin"><ViewCalendar /></ProtectedRoute>} /> {/* <-- Add this line */}
    </Routes>
  );
};

export default AppRoutes;