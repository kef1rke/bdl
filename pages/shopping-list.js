import { useEffect, useState } from 'react';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <div className="mt-4">
        <label>Low Quantity Threshold: </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="p-2 border rounded"
        />
      </div>
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
          {lowQuantityProducts.map((product) => (
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
    </div>
  );
}