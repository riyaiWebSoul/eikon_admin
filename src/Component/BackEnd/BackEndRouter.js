import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import BackHome from './BackHome';
import BackendDashboard from './BackendDashboard';
import Profile from './Profile';

export default function BackEndRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Routes>
        <Route  path="*" element={<BackHome setIsAuthenticated={setIsAuthenticated} />}/>
        {isAuthenticated && <Route path="/backEndDashboard" element={<BackendDashboard setIsAuthenticated={setIsAuthenticated}/>} />}
       
      </Routes>
    </div>
  );
}
