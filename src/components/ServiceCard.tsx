import React from 'react';
import { Service } from '../types';
import { useOrderStore } from '../store/orderStore';
import { Plus, Minus } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  showActions?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, showActions = true }) => {
  const { cart, addToCart } = useOrderStore();
  const quantity = cart[service.id] || 0;
  
  const handleIncrement = () => {
    addToCart(service.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 0) {
      addToCart(service.id, quantity - 1);
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      {service.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
          <span className="px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            ₹{service.price} {service.unit}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{service.category}</span>
            
            {showActions && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  disabled={quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="w-8 text-center font-medium">{quantity}</span>
                
                <button 
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;