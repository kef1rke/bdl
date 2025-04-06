import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddProduct() {
  const [mode, setMode] = useState('manual'); 
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    barcode: '',
    quantity: 1,
    expirationDate: '',
    enableNotifications: true,
  });
  const router = useRouter();

  const parseScannedData = (data) => {
    if (data.includes(';')) {
      const parts = data.split(';').map(part => part.trim());
      if (parts.length === 3) {
        return {
          name: parts[0],
          barcode: parts[1],
          expirationDate: formatDate(parts[2])
        };
      }
    }
    return { barcode: data };
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    if (mode === 'scan' && typeof window !== 'undefined') {
      const initScanner = async () => {
        const { Html5QrcodeScanner } = await import('html5-qrcode');
        const scanner = new Html5QrcodeScanner(
          'barcode-scanner',
          {
            qrbox: { width: 250, height: 250 },
            fps: 5,
          },
          false
        );

        scanner.render(
          (result) => {
            scanner.clear();
            const parsedData = parseScannedData(result);

            setProduct(prev => ({
              ...prev,
              name: parsedData.name || prev.name,
              barcode: parsedData.barcode || prev.barcode,
              expirationDate: parsedData.expirationDate || prev.expirationDate,
            }));
            setScanResult(result);
            setIsScanning(false);
          },
          (error) => console.warn('Error scanning:', error)
        );
      };

      setIsScanning(true);
      initScanner();
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name || !product.barcode) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product added successfully!');
        router.push('/inventory');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://i.imgur.com/ghR6aan.png')] bg-cover bg-center">
      <div className="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
          
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 py-2 font-medium text-sm ${mode === 'manual' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setMode('scan')}
              className={`flex-1 py-2 font-medium text-sm ${mode === 'scan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Scan Barcode/QR Code
            </button>
          </div>

          {mode === 'scan' && (
            <div className="mb-6">
              <div 
                id="barcode-scanner" 
                className={`w-full h-64 bg-green-800 rounded-lg mb-4 ${isScanning ? 'block' : 'hidden'}`}
              />
              
              {scanResult && (
                <div className="mb-4 p-3 bg-green-50 text-red-800 rounded-md">
                  Scanned: {scanResult}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                Barcode *
              </label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={product.barcode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder={mode === 'scan' ? 'Scan or enter manually' : 'Enter barcode'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={product.expirationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={product.enableNotifications !== false} // Default true
                  onChange={(e) => setProduct({...product, enableNotifications: e.target.checked})}
                  className="mr-2"
                />
                Receive expiration reminders
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}