"use client"; // Needed for interactive components in Next.js App Router

import { useState } from "react";

export default function BarcodeScannerPage() {
  const [data, setData] = useState("No result");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">📸 Barcode Scanner</h1>

      {/* Scanner Component */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* <BarcodeScannerComponent
          width={300}
          height={200}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
          }}
        /> */}
        <p className="mt-4 text-lg">Scanned Code: <strong>{data}</strong></p>
      </div>
    </div>
  );
}
