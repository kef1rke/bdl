
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ExpiredProducts() {
  const [expiredProducts, setExpiredProducts] = useState([]);

  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await fetch('/api/products?expired=true');
        const data = await response.json();
        setExpiredProducts(data);
      } catch (error) {
        console.error('Error fetching expired products:', error);
      }
    };

    fetchExpiredProducts();
  }, []);

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
              <h1 className="text-3xl font-bold text-gray-800">Expired Products</h1>
              <p className="mt-2 text-gray-600">
                {expiredProducts.length} expired items found
              </p>
            </div>

            {/* Products List */}
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              {expiredProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No expired products</h3>
                  <p className="mt-1 text-gray-500">All your products are fresh and up-to-date!</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Barcode
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Expired On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {expiredProducts.map((product) => {
                      const expiredDate = new Date(product.expirationDate);
                      const daysExpired = Math.floor((new Date() - expiredDate) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <tr key={product._id} className="hover:bg-red-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-red-600"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category || 'No category'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.barcode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {expiredDate.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${daysExpired > 30 ? 'bg-red-100 text-red-800' : 
                                daysExpired > 7 ? 'bg-orange-100 text-orange-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {daysExpired > 0 ? 
                                `Expired ${daysExpired} ${daysExpired === 1 ? 'day' : 'days'} ago` : 
                                'Expired today'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Action Buttons */}
            {expiredProducts.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => alert('Bulk disposal coming soon!')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Dispose All Expired
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}