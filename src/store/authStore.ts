import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  
  login: async (username: string, password: string) => {
    // In a real app, this would be an API call
    // For demo, we'll use a hardcoded check
    if (username === 'admin' && password === 'admin123') {
      set({ isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  logout: () => {
    set({ isAuthenticated: false });
  },
}));