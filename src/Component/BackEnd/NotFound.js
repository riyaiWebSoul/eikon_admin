import React from 'react';
import { Link } from 'react-router-dom'; // If you are using React Router

const NotFoundPage = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
