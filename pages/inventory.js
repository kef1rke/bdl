// pages/inventory.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Product deleted successfully!');
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } else {
      alert('Failed to delete product.');
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-product/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Our Inventory</h1>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Barcode</th>
            <th className="p-2 border border-gray-300">Quantity</th>
            <th className="p-2 border border-gray-300">Expiration Date</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{product.name}</td>
              <td className="p-2 border border-gray-300">{product.barcode}</td>
              <td className="p-2 border border-gray-300">{product.quantity}</td>
              <td className="p-2 border border-gray-300">
                {new Date(product.expirationDate).toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

