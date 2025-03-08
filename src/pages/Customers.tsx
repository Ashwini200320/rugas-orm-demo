import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";

export default function Customers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<{ name: string; email: string; phone: string }[]>([]);
  const [customerData, setCustomerData] = useState({ name: "", email: "", phone: "" });

  const handleAddCustomer = () => {
    if (customerData.name && customerData.email && customerData.phone) {
      setCustomers([...customers, customerData]);
      setCustomerData({ name: "", email: "", phone: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 border-b">
          <div className="relative">
            <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-4">
          {customers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No customers yet</div>
          ) : (
            <ul className="space-y-2">
              {customers.map((customer, index) => (
                <li key={index} className="p-2 border rounded-md">
                  {customer.name} - {customer.email} - {customer.phone}
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
              <h2 className="text-xl font-bold">Add Customer</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <input type="text" placeholder="Name" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2" />
            <input type="email" placeholder="Email" value={customerData.email} onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2" />
            <input type="tel" placeholder="Phone Number" value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-4" />
            <button onClick={handleAddCustomer} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

