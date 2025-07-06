import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Login';
import Dashboard from '../Dashboard';
import PatientList from '../Patients/PatientList';
import AddPatient from '../Patients/AddPatient';
import EditPatient from '../Patients/EditPatient';
import IncidentList from '../Incidents/IncidentList';
import AddIncident from '../Incidents/AddIncident';
import ViewCalendar from '../ViewCalendar'; 
import Layout from '../../components/Layout';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <PatientList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-patient"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <AddPatient />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-patient/:id"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <EditPatient />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/incidents"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <IncidentList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-incident"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <AddIncident />
            </Layout>
          </ProtectedRoute>
        }
      />

      
      <Route
  path="/calendar"
  element={
    <ProtectedRoute role="Admin">
      <Layout>
        <ViewCalendar />
      </Layout>
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
