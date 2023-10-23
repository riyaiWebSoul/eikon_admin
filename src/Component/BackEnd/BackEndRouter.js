import React, { useEffect } from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import BackHome from './BackHome';

import NotFoundPage from './NotFound';
import BackendDashboard from './BackendDashboard';
const isAuthenticated = true;
export default function BackEndRouter() {


  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, );

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
  )
}
