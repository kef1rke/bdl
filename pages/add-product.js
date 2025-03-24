import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function AddProduct() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState({
    name: '',
    quantity: 0,
    expirationDate: '',
  });


  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setBarcode(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { ...product, barcode };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert('Product added successfully!');
      setBarcode('');
      setProduct({
        name: '',
        quantity: 0,
        expirationDate: '',
      });
    } else {
      alert('Failed to add product.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <div id="reader" className="m-4"></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Barcode</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Scaned barcode will appear here"
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={product.expirationDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}