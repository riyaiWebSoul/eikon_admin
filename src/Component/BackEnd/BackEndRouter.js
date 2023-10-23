import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import BackHome from './BackHome';
import NotFoundPage from './NotFound';
import BackendDashboard from './BackendDashboard';
import BackHomePage from './BackHomePage';

const isAuthenticated = true; // You can replace this with your actual authentication logic.

export default function BackEndRouter() {
  useEffect(() => {
    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<BackHome />} />
        {isAuthenticated ? (
          <Route path="/backEndDashboard" element={<BackendDashboard />} />
        ) : (
          <Navigate to="/" />
        )}
      </Routes>
    </div>
  );
}
