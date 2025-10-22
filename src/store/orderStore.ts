import { create } from 'zustand';
import { Order, OrderFormData } from '../types';
import { useServiceStore } from './serviceStore';

// Load initial orders from localStorage
const loadOrders = (): Order[] => {
  try {
    const savedOrders = localStorage.getItem('laundry_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error('Failed to load orders:', error);
    return [];
  }
};

interface OrderState {
  cart: {
    [key: number]: number;
  };
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  addToCart: (serviceId: number, quantity: number) => void;
  removeFromCart: (serviceId: number) => void;
  clearCart: () => void;
  submitOrder: (data: OrderFormData) => Promise<Order>;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  cart: {},
  orders: loadOrders(),
  currentOrder: null,
  loading: false,
  error: null,
  
  addToCart: (serviceId: number, quantity: number) => {
    set(state => {
      const cart = { ...state.cart };
      
      if (quantity <= 0) {
        delete cart[serviceId];
      } else {
        cart[serviceId] = quantity;
      }
      
      return { cart };
    });
  },
  
  removeFromCart: (serviceId: number) => {
    set(state => {
      const cart = { ...state.cart };
      delete cart[serviceId];
      return { cart };
    });
  },
  
  clearCart: () => {
    set({ cart: {} });
  },
  
  submitOrder: async (data: OrderFormData) => {
    set({ loading: true, error: null });
    
    try {
      const services = useServiceStore.getState().services;
      
      // Calculate order items with actual service details
      const orderItems = Object.entries(data.items).map(([serviceId, quantity]) => {
        const service = services.find(s => s.id === parseInt(serviceId));
        if (!service) throw new Error(`Service not found: ${serviceId}`);
        
        return {
          serviceId: parseInt(serviceId),
          quantity,
          price: service.price,
          name: service.name,
        };
      });
      
      // Calculate total amount
      const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create order object
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: orderItems,
        customer: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Store the order in state and localStorage
      set(state => {
        const newOrders = [...state.orders, order];
        localStorage.setItem('laundry_orders', JSON.stringify(newOrders));
        return { 
          orders: newOrders,
          currentOrder: order,
          loading: false,
        };
      });
      
      return order;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to submit order', 
        loading: false 
      });
      throw error;
    }
  },
  
  fetchOrders: async () => {
    set({ loading: true, error: null });
    
    try {
      // Load orders from localStorage
      const orders = loadOrders();
      set({ orders, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch orders', 
        loading: false 
      });
    }
  },
}));