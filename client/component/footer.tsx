
"use client";

import React, { useState, useEffect} from "react";


export default function Footer() {


  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {


    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <footer className="text-black dark:text-white bg-transparent mt-26">
      <div className="max-w-screen-xl mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Lok-e Games Branding */}
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white ">Lok-e Games</h2>
          <p className="mt-4 text-sm text-black dark:text-white ">
            Crafting immersive experiences that connect players around the world. Your journey begins here.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-black dark:text-white">
          <h3 className="font-bold uppercase tracking-wide">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
          <li>
              <a href="/" className="hover:text-white transition">Main Page</a>
            </li>
            
            <li>
              <a href="/poke" className="hover:text-white transition">Pokemon</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className=" font-bold uppercase tracking-wide">Autors</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>xavier.heitz@edu.ece.fr</li>
            <li>thomas.lepeu@edu.ece.fr</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm ">
        <p>&copy; 2024 Lok-e Games. All rights reserved.</p>
      </div>
    </footer>
  );
}
