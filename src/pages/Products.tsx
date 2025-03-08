
import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";

export default function Products() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<{ name: string; price: string; category: string }[]>([]);
  const [productData, setProductData] = useState({ name: "", price: "", category: "" });

  const handleAddProduct = () => {
    if (productData.name && productData.price && productData.category) {
      setProducts([...products, productData]);
      setProductData({ name: "", price: "", category: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 border-b">
          <div className="relative">
            <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No products yet</div>
          ) : (
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index} className="p-2 border rounded-md">
                  {product.name} - ${product.price} - {product.category}
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
              <h2 className="text-xl font-bold">Add Product</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <input type="text" placeholder="Product Name" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2" />
            <input type="text" placeholder="Price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-2" />
            <input type="text" placeholder="Category" value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} className="w-full border rounded-md px-3 py-2 mb-4" />
            <button onClick={handleAddProduct} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

