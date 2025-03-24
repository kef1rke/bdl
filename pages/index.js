import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Welcome to Pantry Watch
      </h1>
      <nav>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/add-product" style={{ color: 'blue', textDecoration: 'underline' }}>
              Add Product
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/inventory" style={{ color: 'blue', textDecoration: 'underline' }}>
              Our Inventory
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/shopping-list" style={{ color: 'blue', textDecoration: 'underline' }}>
              Shopping List
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/expired" style={{ color: 'blue', textDecoration: 'underline' }}>
              Expired Products
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/close-to-expire" style={{ color: 'blue', textDecoration: 'underline' }}>
              Close to Expiration
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}