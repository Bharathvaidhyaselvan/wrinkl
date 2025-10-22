import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useServiceStore } from '../store/serviceStore';
import ServiceCard from '../components/ServiceCard';
import ServiceFilter from '../components/ServiceFilter';
import { Service } from '../types';

const ServicesPage: React.FC = () => {
  const { services, loading, error, fetchServices } = useServiceStore();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  
  useEffect(() => {
    document.title = 'Our Services - Wrinkl';
    fetchServices();
  }, [fetchServices]);
  
  useEffect(() => {
    setFilteredServices(services);
  }, [services]);
  
  const handleFilterChange = (filtered: Service[]) => {
    setFilteredServices(filtered);
  };
  
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Our Services</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive range of laundry services designed to keep your clothes fresh, clean, and looking their best.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : (
        <>
          <ServiceFilter services={services} onFilterChange={handleFilterChange} />
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No services found</h3>
              <p className="mt-2 text-gray-500">Try changing your search or filter criteria</p>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link
              to="/schedule"
              className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Schedule a Pickup
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesPage;