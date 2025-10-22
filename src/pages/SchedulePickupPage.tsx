import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useServiceStore } from '../store/serviceStore';
import { useOrderStore } from '../store/orderStore';
import ServiceCard from '../components/ServiceCard';
import OrderSummary from '../components/OrderSummary';
import { OrderFormData } from '../types';

const SchedulePickupPage: React.FC = () => {
  const { services, loading: servicesLoading, fetchServices } = useServiceStore();
  const { cart, submitOrder, loading: orderLoading } = useOrderStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  
  const { 
    register, 
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Omit<OrderFormData, 'items'>>({
    mode: 'onChange'
  });
  
  useEffect(() => {
    document.title = 'Schedule a Pickup - Wrinkl';
    fetchServices();
  }, [fetchServices]);
  
  const hasItemsInCart = Object.values(cart).some(quantity => quantity > 0);
  
  const onSubmit = async (data: Omit<OrderFormData, 'items'>) => {
    try {
      const orderData: OrderFormData = {
        ...data,
        items: cart
      };
      
      await submitOrder(orderData);
      navigate('/confirmation');
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };
  
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Schedule a Pickup</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Select the services you need, specify quantities, and we'll pick up your laundry at your convenience.
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`ml-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-600'}`}>
              Select Services
            </div>
          </div>
          
          <div className={`w-20 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`ml-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-600'}`}>
              Your Details
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Services Selection (Step 1) */}
        <div className={`lg:col-span-2 ${step !== 1 ? 'hidden lg:block' : ''}`}>
          {servicesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Select Services</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              
              <div className="mt-8 lg:hidden">
                <button
                  onClick={() => setStep(2)}
                  disabled={!hasItemsInCart}
                  className={`w-full px-6 py-3 text-base font-medium text-white rounded-md shadow-md transition-colors duration-200 ${
                    hasItemsInCart 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Continue to Details
                </button>
                
                {!hasItemsInCart && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    Please select at least one service to continue
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Customer Information (Step 2) */}
        <div className={`lg:col-span-2 ${step !== 2 ? 'hidden lg:block' : ''}`}>
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Your Details</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                Pickup Address
              </label>
              <textarea
                id="address"
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your complete address"
                {...register('address', { required: 'Address is required' })}
              ></textarea>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
            
            <div className="lg:hidden mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mb-4 px-6 py-3 text-base font-medium text-blue-700 bg-blue-100 rounded-md shadow-sm hover:bg-blue-200 transition-colors duration-200"
              >
                Back to Services
              </button>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={!hasItemsInCart || !isValid || orderLoading}
                className={`w-full px-6 py-3 text-base font-medium text-white rounded-md shadow-md transition-colors duration-200 ${
                  hasItemsInCart && isValid && !orderLoading
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {orderLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
              
              {!hasItemsInCart && (
                <p className="mt-2 text-sm text-red-500 text-center">
                  Please select at least one service to continue
                </p>
              )}
            </div>
          </form>
        </div>
        
        {/* Order Summary (Always visible on desktop) */}
        <div className="lg:col-span-1">
          <OrderSummary />
          
          {step === 1 && (
            <div className="mt-6 hidden lg:block">
              <button
                onClick={() => setStep(2)}
                disabled={!hasItemsInCart}
                className={`w-full px-6 py-3 text-base font-medium text-white rounded-md shadow-md transition-colors duration-200 ${
                  hasItemsInCart 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue to Details
              </button>
              
              {!hasItemsInCart && (
                <p className="mt-2 text-sm text-red-500 text-center">
                  Please select at least one service to continue
                </p>
              )}
            </div>
          )}
          
          {step === 2 && (
            <div className="mt-6 hidden lg:block">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full px-6 py-3 text-base font-medium text-blue-700 bg-blue-100 rounded-md shadow-sm hover:bg-blue-200 transition-colors duration-200"
              >
                Back to Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePickupPage;