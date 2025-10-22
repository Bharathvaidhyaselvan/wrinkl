import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Wrinkl';
  }, []);
  
  return (
    <div className="container px-4 py-16 mx-auto text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mb-8 text-gray-600 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;