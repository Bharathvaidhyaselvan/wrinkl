import React, { useState, useMemo } from 'react';
import { Service } from '../types';

interface ServiceFilterProps {
  services: Service[];
  onFilterChange: (filteredServices: Service[]) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({ services, onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(services.map(service => service.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [services]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Apply filters
  useMemo(() => {
    let filteredServices = services;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filteredServices = filteredServices.filter(
        service => service.category === activeCategory
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredServices = filteredServices.filter(
        service => 
          service.name.toLowerCase().includes(query) || 
          service.description.toLowerCase().includes(query)
      );
    }
    
    onFilterChange(filteredServices);
  }, [services, activeCategory, searchQuery, onFilterChange]);
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search services..."
            className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilter;