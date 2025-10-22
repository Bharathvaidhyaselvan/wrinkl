import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, clearCart } = useOrderStore();
  
  useEffect(() => {
    document.title = 'Order Confirmation - Wrinkl';
    
    // Clear the cart after confirmation
    clearCart();
  }, [clearCart]);
  
  if (!currentOrder) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">No Order Found</h1>
        <p className="mb-8 text-gray-600">
          It seems you haven't placed an order yet or your session has expired.
        </p>
        <Link
          to="/schedule"
          className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Schedule a Pickup
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-16 mx-auto max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="w-16 h-16 mb-4 text-green-500">
            <CheckCircle className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing Wrinkl. We'll contact you soon.
          </p>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium text-gray-900">{currentOrder.id}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium text-gray-900">{currentOrder.customer.name}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{currentOrder.customer.phone}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-900">{currentOrder.customer.address}</p>
          </div>
          
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-4">What Happens Next?</h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mr-2 flex-shrink-0">1</span>
                <span>Our team will call you to confirm your pickup time.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mr-2 flex-shrink-0">2</span>
                <span>We'll pick up your laundry at the scheduled time.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mr-2 flex-shrink-0">3</span>
                <span>Your clean laundry will be delivered within 24-48 hours.</span>
              </li>
            </ol>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="flex-1 px-6 py-3 text-base font-medium text-center text-blue-700 bg-blue-100 rounded-md shadow-sm hover:bg-blue-200 transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            to="/schedule"
            className="flex-1 px-6 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Schedule Another Pickup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;