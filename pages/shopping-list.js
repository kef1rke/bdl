
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShoppingList() {
  const [lowQuantityProducts, setLowQuantityProducts] = useState([]);
  const [threshold, setThreshold] = useState(5);

  const fetchLowQuantityProducts = async () => {
    const response = await fetch(`/api/products?lowQuantity=true&threshold=${threshold}`);
    const data = await response.json();
    setLowQuantityProducts(data);
  };

  useEffect(() => {
    fetchLowQuantityProducts();
  }, [threshold]);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80')] bg-cover bg-center">
      <div className="backdrop-blur-sm bg-black/30 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center text-white hover:text-blue-200">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Back to Home
              </a>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Shopping List</h1>
              <p className="mt-2 text-gray-600">
                {lowQuantityProducts.length} items need restocking
              </p>
            </div>

            {/* Threshold Controls */}
            <div className="mb-8 bg-blue-50 rounded-lg p-4">
              <div className="max-w-md space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Low Quantity Threshold
                  <span className="text-xs text-gray-500 ml-2">(Current: {threshold})</span>
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full range-lg accent-blue-600"
                  />
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                  />
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Product
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Barcode
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Current Stock
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Expiration Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {lowQuantityProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.barcode}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${product.quantity === 0 ? 'bg-red-100 text-red-800' :
                            product.quantity < 3 ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {product.quantity} left
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {new Date(product.expirationDate).toLocaleDateString()}
                          {new Date(product.expirationDate) < new Date() && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Expired
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {lowQuantityProducts.length === 0 && (
                <div className="text-center py-8 bg-gray-50">
                  <p className="text-gray-500">No items need restocking at this threshold</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}