// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <Link to="/" className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
