"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-600 shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-white text-3xl font-bold">Lok-E</h1>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Accueil
          </Link>
          <Link
            href="/contacts"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/settings"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
