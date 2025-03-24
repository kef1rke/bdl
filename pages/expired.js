import { useEffect, useState } from 'react';

export default function ExpiredProducts() {
  const [expiredProducts, setExpiredProducts] = useState([]);

  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await fetch('/api/products?expired=true');
        const data = await response.json();
        console.log('Expired products:', data);
        setExpiredProducts(data);
      } catch (error) {
        console.error('Error fetching expired products:', error);
      }
    };

    fetchExpiredProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Expired Products</h1>
      {expiredProducts.length === 0 ? (
        <p className="mt-4">No expired products found.</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Barcode</th>
              <th className="p-2 border border-gray-300">Quantity</th>
              <th className="p-2 border border-gray-300">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {expiredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300">{product.name}</td>
                <td className="p-2 border border-gray-300">{product.barcode}</td>
                <td className="p-2 border border-gray-300">{product.quantity}</td>
                <td className="p-2 border border-gray-300">
                  {new Date(product.expirationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}