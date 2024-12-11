"use client";

import React, { useState } from "react";
import Header from "@/component/Header";
import Footer from "@/component/footer";

const HomePage: React.FC = () => {
  const images = [
    "/images/carousel1.png",
    "https://your-image-url2.com",
    "https://your-image-url3.com",
    "https://your-image-url4.com",
    "https://your-image-url5.com",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

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
      <div className="py-16 w-full">
        <div className="text-center">
          {/* Barre noire avant */}
          <div className="w-full h-2 bg-black mb-8"></div>

          <h2 className="text-3xl font-bold text-gray-200 mb-8">Our Games</h2>

          {/* Barre noire après */}
          <div className="w-full h-2 bg-black mt-8 mb-16"></div>

          {/* Carrousel */}
          <div className="relative w-full h-[60vh] overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Game ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Points de navigation et boutons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[300px] p-4 bg-black bg-opacity-50 rounded-full flex justify-between items-center z-10">
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

              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all ${
                      currentIndex === index
                        ? "bg-white border-white"
                        : "bg-transparent border-gray-300"
                    }`}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>

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
          <h2 className="text-3xl font-bold text-gray-200 mb-8">Last articles</h2>
          <div className="bg-red-800 p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-300 mb-4">
              Login and join our community!
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-400">A</p>
              <p className="text-lg text-gray-400">B</p>
              <p className="text-lg text-gray-400">C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
