import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Our App</h1>
      <nav className="mt-6">
        <Link href="/barcode">
          <span className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4">Go to Barcode Scanner</span>
        </Link>
        <Link href="/calendar">
          <span className="px-4 py-2 bg-green-500 text-white rounded-lg">Go to Calendar</span>
        </Link>
      </nav>
    </div>
  );
}
