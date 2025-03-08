export interface Customer {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  created_at: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  price: number;
}

export interface Order {
  id: string;
  created_at: string;
  customer_id: string;
  product_id: string;
  status: 'placed' | 'shipped' | 'delivered' | 'cancelled';
  quantity: number;
  total_amount: number;
  customer?: Customer;
  product?: Product;
}