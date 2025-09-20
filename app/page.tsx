"use client";
import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setMessage("yukleniyor");
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("bir hata olustu.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Lab-Project v1</h1>
        <p className="mb-8">Click the button to get the data</p>
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
        >
          {loading ? message : "Fetch the data"}
        </button>
        {message && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-lg">{message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
