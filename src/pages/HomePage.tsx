import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesOverview from '../components/ServicesOverview';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ContactCTA from '../components/ContactCTA';
import { useServiceStore } from '../store/serviceStore';

const HomePage: React.FC = () => {
  const { fetchServices } = useServiceStore();
  
  useEffect(() => {
    document.title = 'Wrinkl - Professional Laundry Services';
    fetchServices();
  }, [fetchServices]);
  
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <HowItWorks />
      <Testimonials />
      <ContactCTA />
    </div>
  );
};

export default HomePage;