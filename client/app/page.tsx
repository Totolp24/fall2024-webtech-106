"use client";

import React, { useEffect, useState } from "react";
import Header from "@/component/Header";

const HomePage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Large photo section */}
      <div className="relative w-full h-96">
        <img
          src="https://your-image-url.com" // Remplacez cette URL par celle de l'image que vous souhaitez afficher
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-4xl font-extrabold">Welcome to Lok-E Games</h1>
        </div>
      </div>

      {/* First scrollable photo section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img
                src="https://your-image-url1.com" // Remplacez cette URL par celle de votre image
                alt="Game Image 1"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://your-image-url2.com" // Remplacez cette URL par celle de votre image
                alt="Game Image 2"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 mb-4">
              For inquiries, partnerships, or just to say hi, feel free to reach out!
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">Email: contact@lokegames.com</p>
              <p className="text-lg text-gray-600">Phone: +123 456 7890</p>
              <p className="text-lg text-gray-600">Address: 123 Game Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
