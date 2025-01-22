import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ClubDashboard from './components/ClubDashboard';
import ClubProfile from './components/ClubProfile';

const App = () => {
  return (
    <Routes>
      {/* Routes pour les utilisateurs normaux */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Routes séparées pour les clubs */}
      <Route path="/club/dashboard" element={<ClubDashboard />} />
      <Route path="/club/profile" element={<ClubProfile />} />
    </Routes>
  );
};

export default App; 