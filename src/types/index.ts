export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image?: string;
}

export interface OrderItem {
  serviceId: number;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  items: {
    [key: number]: number;
  };
}