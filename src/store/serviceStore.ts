import { create } from 'zustand';
import { Service } from '../types';

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  getServiceById: (id: number) => Service | undefined;
}

// Mock data - in a real app, this would come from an API
const mockServices: Service[] = [
  {
    id: 1,
    name: 'Shirts',
    description: 'Professional washing and ironing for all types of shirts.',
    price: 15,
    unit: 'per piece',
    category: 'Wash & Iron',
    image: 'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Pants',
    description: 'Deep cleaning and perfect pressing for all pants and trousers.',
    price: 20,
    unit: 'per piece',
    category: 'Wash & Iron',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Sarees',
    description: 'Gentle cleaning and proper folding for all types of sarees.',
    price: 100,
    unit: 'per piece',
    category: 'Dry Cleaning',
    image: 'https://images.pexels.com/photos/8886933/pexels-photo-8886933.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Suits',
    description: 'Premium dry cleaning for business and formal suits.',
    price: 250,
    unit: 'per set',
    category: 'Dry Cleaning',
    image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    name: 'Bed Sheets',
    description: 'Fresh washing and optional ironing for bed sheets of all sizes.',
    price: 60,
    unit: 'per piece',
    category: 'Wash & Fold',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    name: 'Curtains',
    description: 'Deep cleaning for curtains of all types and sizes.',
    price: 120,
    unit: 'per set',
    category: 'Special Care',
    image: 'https://images.pexels.com/photos/462197/pexels-photo-462197.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    name: 'Winter Wear',
    description: 'Special care for jackets, sweaters, and other winter clothing.',
    price: 150,
    unit: 'per piece',
    category: 'Special Care',
    image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 8,
    name: 'Stain Removal',
    description: 'Specialized treatment for stubborn stains on any garment.',
    price: 50,
    unit: 'per stain',
    category: 'Additional Services',
    image: 'https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  loading: false,
  error: null,
  fetchServices: async () => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/services');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ services: mockServices, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch services', 
        loading: false 
      });
    }
  },
  getServiceById: (id: number) => {
    return get().services.find(service => service.id === id);
  }
}));