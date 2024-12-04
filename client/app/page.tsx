"use client";

import React, { useState } from "react";
import Header from "@/component/Header";

const HomePage: React.FC = () => {

  // Liste des images pour le carrousel
  const images = [
    "https://images.unsplash.com/photo-1604015200543-d77f3b47855d", // Exemple d'image
    "https://your-image-url2.com",
    "https://your-image-url3.com",
    "https://your-image-url4.com",
    "https://your-image-url5.com"
  ];

  // Index de l'image courante
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour aller à l'image suivante
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour aller à l'image précédente
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Fonction pour changer l'image via les points de navigation
  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-dark-to-red bg-[length:200%_200%] animate-gradient">
      <Header />

      {/* Large photo section */}
      <div className="relative w-full h-96">
        <img
          src="https://your-image-url.com"
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-4xl font-extrabold">Welcome to Lok-E Games</h1>
        </div>
      </div>

      {/* Carrousel section pour "Our Games" */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-200 mb-8">Our Games</h2>

          {/* Carrousel */}
          <div className="relative w-full h-[60vh] overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Game ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Points de navigation et boutons dans un cadre arrondi */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[300px] p-4 bg-black bg-opacity-50 rounded-full flex justify-between items-center z-10">
              {/* Boutons de navigation */}
              <button
                className="text-white p-1.5 rounded-full hover:bg-gray-600 transition-all"
                onClick={prevImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Points de navigation */}
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all ${
                      currentIndex === index
                        ? "bg-white border-white" // Fond blanc et bord blanc quand actif
                        : "bg-transparent border-gray-300" // Transparent avec bord gris clair quand inactif
                    }`}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>

              {/* Boutons de navigation */}
              <button
                className="text-white p-1.5 rounded-full hover:bg-gray-600 transition-all"
                onClick={nextImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-200 mb-8">Contact Us</h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-300 mb-4">
              For inquiries, partnerships, or just to say hi, feel free to reach out!
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-400">Email: contact@lokegames.com</p>
              <p className="text-lg text-gray-400">Phone: +123 456 7890</p>
              <p className="text-lg text-gray-400">Address: 123 Game Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage d'une erreur s'il y en a */}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
