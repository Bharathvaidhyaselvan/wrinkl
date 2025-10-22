import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4"></div>
      
      <div className="container relative z-10 px-4 py-20 mx-auto flex flex-col items-center md:py-28 md:flex-row">
        {/* Text Content */}
        <div className="md:w-1/2 md:pr-12 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            <span className="block">Professional Laundry</span>
            <span className="block text-blue-600">Service at Your Doorstep</span>
          </h1>
          
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Experience the freshness of professionally cleaned clothes without leaving your home. Schedule a pickup today!
          </p>
          
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link
              to="/schedule"
              className="px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Schedule a Pickup
            </Link>
            
            <Link
              to="/services"
              className="px-8 py-3 text-base font-medium text-blue-700 bg-white border border-blue-600 rounded-md shadow-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Our Services
            </Link>
          </div>
        </div>
        
        {/* Image */}
        <div className="w-full mt-12 md:w-1/2 md:mt-0">
          <img
            src="https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Laundry service"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;