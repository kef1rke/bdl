import Link from "next/link";
import Layout from "./layout";
import './public/style/globals.css';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center bg-gray-100 text-center py-10">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
        <nav>
          <Link href="/barcode" className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4">
            Go to Barcode Scanner
          </Link>
          <Link href="/calendar" className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Go to Calendar
          </Link>
        </nav>
      </div>
    </Layout>
  );
}
