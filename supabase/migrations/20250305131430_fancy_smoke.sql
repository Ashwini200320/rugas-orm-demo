/*
  # Initial Schema Setup for Order Management System

  1. New Tables
    - `customers`
      - Basic customer information including name, address, phone, email
    - `products`
      - Product catalog with name, category, description, image URL, price
    - `orders`
      - Order details linking customers and products, including status tracking
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to perform CRUD operations
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  image_url text,
  price decimal(10,2) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  customer_id uuid REFERENCES customers(id),
  product_id uuid REFERENCES products(id),
  status text NOT NULL DEFAULT 'placed',
  quantity integer NOT NULL DEFAULT 1,
  total_amount decimal(10,2) NOT NULL,
  CONSTRAINT valid_status CHECK (status IN ('placed', 'shipped', 'delivered', 'cancelled'))
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users full access to customers"
  ON customers FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to products"
  ON products FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to orders"
  ON orders FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);