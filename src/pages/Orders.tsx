
import React, { useState, useEffect } from "react";
import { Plus, Search, X } from "lucide-react";

export default function Orders() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({ customer: "", product: "", quantity: "", date: "" });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch Customers and Products from local storage or API
  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setCustomers(storedCustomers);
    setProducts(storedProducts);
  }, []);

  const handleCreateOrder = async () => {
    if (orderData.customer && orderData.product && orderData.quantity) {
      const newOrder = { ...orderData, date: new Date().toISOString().split("T")[0] };
      setOrders([...orders, newOrder]);

      // Save to backend (or local storage for now)
      localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

      setOrderData({ customer: "", product: "", quantity: "", date: "" });
      setShowAddModal(false);

      // Send to backend
      await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Order
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 border-b">
          <div className="relative">
            <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-4">
          {orders.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No orders yet</div>
          ) : (
            <ul className="space-y-2">
              {orders.map((order, index) => (
                <li key={index} className="p-2 border rounded-md">
                  {order.customer} ordered {order.quantity} × {order.product} on {order.date}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Order</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <select value={orderData.customer} onChange={(e) => setOrderData({ ...orderData, customer: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2">
              <option value="">Select Customer</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer.name}>{customer.name}</option>
              ))}
            </select>

            <select value={orderData.product} onChange={(e) => setOrderData({ ...orderData, product: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2">
              <option value="">Select Product</option>
              {products.map((product, index) => (
                <option key={index} value={product.name}>{product.name}</option>
              ))}
            </select>

            <input type="number" placeholder="Quantity" value={orderData.quantity} onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-4" />

            <button onClick={handleCreateOrder} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

