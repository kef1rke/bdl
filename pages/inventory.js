import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Inventory() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    stockLevel: 'all',
    expirationRange: 'all'
  });
  const [sortOption, setSortOption] = useState('name-asc');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.includes(searchTerm)
      );
    }
    
    // Apply filters
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    if (filters.stockLevel !== 'all') {
      switch(filters.stockLevel) {
        case 'low': result = result.filter(p => p.quantity < 5); break;
        case 'medium': result = result.filter(p => p.quantity >= 5 && p.quantity < 10); break;
        case 'high': result = result.filter(p => p.quantity >= 10); break;
      }
    }
    
    if (filters.expirationRange !== 'all') {
      const today = new Date();
      switch(filters.expirationRange) {
        case 'expired': 
          result = result.filter(p => new Date(p.expirationDate) < today); 
          break;
        case 'week': 
          const nextWeek = new Date();
          nextWeek.setDate(today.getDate() + 7);
          result = result.filter(p => 
            new Date(p.expirationDate) >= today && 
            new Date(p.expirationDate) <= nextWeek
          );
          break;
        case 'month':
          const nextMonth = new Date();
          nextMonth.setMonth(today.getMonth() + 1);
          result = result.filter(p => 
            new Date(p.expirationDate) >= today && 
            new Date(p.expirationDate) <= nextMonth
          );
          break;
      }
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'quantity-asc':
        result.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantity-desc':
        result.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'expiration-asc':
        result.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
        break;
      case 'expiration-desc':
        result.sort((a, b) => new Date(b.expirationDate) - new Date(a.expirationDate));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, filters, sortOption]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
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
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-1">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-black"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="sr-only">Category</label>
                <select
                  id="category"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black sm:text-sm rounded-md"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="beverages">Beverages</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Stock Level Filter */}
              <div>
                <label htmlFor="stockLevel" className="sr-only">Stock Level</label>
                <select
                  id="stockLevel"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black sm:text-sm rounded-md"
                  value={filters.stockLevel}
                  onChange={(e) => setFilters({...filters, stockLevel: e.target.value})}
                >
                  <option value="all">All Stock Levels</option>
                  <option value="low">Low (&lt; 5)</option>
                  <option value="medium">Medium (5-10)</option>
                  <option value="high">High (&gt; 10)</option>
                </select>
              </div>

              {/* Expiration Filter */}
              <div>
                <label htmlFor="expiration" className="sr-only">Expiration</label>
                <select
                  id="expiration"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black sm:text-sm rounded-md"
                  value={filters.expirationRange}
                  onChange={(e) => setFilters({...filters, expirationRange: e.target.value})}
                >
                  <option value="all">All Expiration Dates</option>
                  <option value="expired">Expired</option>
                  <option value="week">Expires in 1 Week</option>
                  <option value="month">Expires in 1 Month</option>
                </select>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="mt-4 flex items-center">
              <span className="mr-2 text-sm text-gray-600">Sort by:</span>
              <select
                className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="quantity-asc">Quantity (Low-High)</option>
                <option value="quantity-desc">Quantity (High-Low)</option>
                <option value="expiration-asc">Expiration (Old-New)</option>
                <option value="expiration-desc">Expiration (New-Old)</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barcode
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiration
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {product.name.charAt(0).toUpperCase()}
                            </span>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.quantity < 5 ? 'bg-red-100 text-red-800' : 
                            product.quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {product.quantity} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {new Date(product.expirationDate).toLocaleDateString()}
                          {new Date(product.expirationDate) < new Date() && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                              Expired
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/edit-product/${product._id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No products found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}