import React, { useMemo } from 'react';
import { useOrderStore } from '../store/orderStore';
import { useServiceStore } from '../store/serviceStore';
import { Trash2 } from 'lucide-react';

const OrderSummary: React.FC = () => {
  const { cart, removeFromCart } = useOrderStore();
  const { services } = useServiceStore();
  
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([serviceId, quantity]) => {
      const service = services.find(s => s.id === parseInt(serviceId));
      return {
        id: parseInt(serviceId),
        name: service?.name || 'Unknown Service',
        price: service?.price || 0,
        unit: service?.unit || 'per item',
        quantity,
        totalPrice: (service?.price || 0) * quantity,
      };
    }).filter(item => item.quantity > 0);
  }, [cart, services]);
  
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <p className="text-gray-500">Your cart is empty. Please add some services to continue.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <div className="flex text-sm text-gray-500">
                <span>₹{item.price} {item.unit} × {item.quantity}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="font-medium">₹{item.totalPrice}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{totalAmount}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Service Charge</span>
          <span className="font-medium">₹0</span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-semibold text-blue-600">₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;