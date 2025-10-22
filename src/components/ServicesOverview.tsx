import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Droplets, Wind, Scissors } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Wash & Fold',
    description: 'Professional cleaning for all your regular clothes, folded and ready to wear.',
    icon: Droplets,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Dry Cleaning',
    description: 'Specialized cleaning for delicate fabrics and formal wear.',
    icon: Wind,
    color: 'purple',
  },
  {
    id: 3,
    name: 'Ironing',
    description: 'Crisp and wrinkle-free clothes with our professional ironing service.',
    icon: Shirt,
    color: 'amber',
  },
  {
    id: 4,
    name: 'Stain Removal',
    description: 'Expert treatment for stubborn stains, preserving your garments.',
    icon: Scissors,
    color: 'green',
  },
];

const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of laundry services to keep your clothes clean, fresh, and looking their best.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="relative p-6 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full bg-${service.color}-200 transition-opacity duration-300 group-hover:opacity-20`}></div>
              
              <div className={`p-3 mb-4 inline-flex rounded-full bg-${service.color}-100`}>
                <service.icon className={`w-6 h-6 text-${service.color}-600`} />
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              
              <Link 
                to="/services" 
                className={`text-${service.color}-600 font-medium hover:text-${service.color}-700 inline-flex items-center`}
              >
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;