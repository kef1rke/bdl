// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <nav>
          <Link href="/" className="px-4 hover:underline">Home</Link>
          <Link href="/barcode" className="px-4 hover:underline">Barcode</Link>
          <Link href="/calendar" className="px-4 hover:underline">Calendar</Link>
        </nav>
      </div>
    </header>
  );
}
