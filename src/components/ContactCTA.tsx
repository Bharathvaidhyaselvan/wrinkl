import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready for Fresh, Clean Clothes?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Schedule a pickup today and experience the convenience of our professional laundry service.
          </p>
          
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/schedule"
              className="px-8 py-3 text-base font-medium text-blue-700 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
              Schedule Now
            </Link>
            
            <a
              href="tel:+919876543210"
              className="px-8 py-3 text-base font-medium text-white bg-transparent border border-white rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;