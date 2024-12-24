"use client";

import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/preview");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          setError("Failed to fetch preview data.");
        }
      } catch (err) {
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading preview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Preview Page</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Title:</h2>
            <p className="text-gray-600">{data.title}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Description:
            </h2>
            <p className="text-gray-600">{data.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Uploaded File:
            </h2>
            {data.file ? (
              <a
                href={data.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View File
              </a>
            ) : (
              <p className="text-gray-600">No file uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
