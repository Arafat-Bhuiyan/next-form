"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const FormField = ({ type, label, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {type === "file" ? (
        <input
          type="file"
          id={name}
          name={name}
          onChange={onChange}
          className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};

export default function CreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      setIsSubmitting(true);

      // Submit to the backend
      const res = await fetch("/api/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        alert(result.message || "Form submitted successfully!");

        // Reset the form after submission
        setFormData({ title: "", description: "", file: null });

        // Redirect to the preview page
        router.push("/preview");
      } else {
        const error = await res.json();
        alert(error.message || "Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            type="text"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormField
            type="text"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormField
            type="file"
            label="Upload File"
            name="file"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
