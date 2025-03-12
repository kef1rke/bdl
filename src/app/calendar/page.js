"use client"; // Required for interactive components

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">📅 Calendar Page</h1>

      {/* Calendar Component */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Calendar onChange={setDate} value={date} />
        <p className="mt-4 text-lg">Selected Date: <strong>{format(date, "PPP")}</strong></p>
      </div>
    </div>
  );
}
