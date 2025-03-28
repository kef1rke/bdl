// pages/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pantry Watch | Smart Inventory Management</title>
        <meta name="description" content="Track your pantry items efficiently" />
      </Head>
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80')] bg-cover bg-fixed bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        
        {/* Content Container */}
        <div className="relative z-10">
          {/* Navigation Bar */}
          <nav className="bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <span className="ml-2 text-lg font-bold text-gray-800">Pantry Watch</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-4">
                    <Link href="/inventory" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                      Inventory
                    </Link>
                    <Link href="/add-product" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                      Add Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                <span className="block">Smart Pantry</span>
                <span className="block text-indigo-100">Management System</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl drop-shadow-md">
                Track your groceries, prevent waste, and never run out of essentials with our intuitive inventory system.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
              {[
                {
                  title: 'Add Products',
                  description: 'Scan barcodes or manually add items to your inventory',
                  icon: '📱',
                  href: '/add-product',
                  color: 'bg-indigo-100 text-indigo-800'
                },
                {
                  title: 'View Inventory',
                  description: 'See all your products at a glance with detailed information',
                  icon: '📊',
                  href: '/inventory',
                  color: 'bg-green-100 text-green-800'
                },
                {
                  title: 'Shopping List',
                  description: 'Automatically generated list of items running low',
                  icon: '🛒',
                  href: '/shopping-list',
                  color: 'bg-blue-100 text-blue-800'
                }
              ].map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm"
                >
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center text-xl mb-4 mx-auto`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 text-center">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 text-center">{feature.description}</p>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center text-indigo-600 hover:text-indigo-500 text-sm">
                        Get started
                        <svg
                          className="ml-1 h-3 w-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-16 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/expired"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center"
                >
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Expired Items</h3>
                    <p className="text-xs text-gray-500">Check products past expiration</p>
                  </div>
                </Link>

                <Link
                  href="/close-to-expire"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center"
                >
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Expiring Soon</h3>
                    <p className="text-xs text-gray-500">Items nearing expiration</p>
                  </div>
                </Link>

                <Link
                  href="/shopping-list"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center"
                >
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Shopping List</h3>
                    <p className="text-xs text-gray-500">Items to restock</p>
                  </div>
                </Link>

                <Link
                  href="/inventory"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center"
                >
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Full Inventory</h3>
                    <p className="text-xs text-gray-500">View all products</p>
                  </div>
                </Link>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-md mt-12">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Pantry Watch. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}