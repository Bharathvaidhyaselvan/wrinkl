import React from 'react';
import { CalendarClock, Truck, Package, Check } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Schedule Pickup',
    description: 'Choose your preferred date and time for laundry pickup.',
    icon: CalendarClock,
  },
  {
    id: 2,
    title: 'We Collect',
    description: 'Our staff will collect your laundry from your doorstep.',
    icon: Truck,
  },
  {
    id: 3,
    title: 'We Clean',
    description: 'Your clothes are professionally cleaned at our facility.',
    icon: Package,
  },
  {
    id: 4,
    title: 'We Deliver',
    description: 'Clean clothes are delivered back to you, fresh and ready to wear.',
    icon: Check,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes laundry day a breeze. Here's how we bring freshness to your doorstep.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -translate-y-1/2 mx-24"></div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 text-blue-600 border-4 border-white relative z-10 shadow-sm">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <span className="absolute top-0 -mt-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center right-1/2 translate-x-10 lg:translate-x-0 lg:right-auto lg:left-1/2 lg:-translate-x-3">
                    {step.id}
                  </span>
                  
                  <h3 className="mb-2 text-xl font-semibold text-center text-gray-900">{step.title}</h3>
                  <p className="text-center text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;