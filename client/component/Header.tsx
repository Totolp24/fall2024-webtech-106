import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
<header className="w-full bg-blue-500 shadow-md py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Lok-e Games</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-white hover:text-blue-200">
          Accueil
        </Link>
        <Link href="/contacts" className="text-white hover:text-blue-200">
          Contact
        </Link>
        <Link href="/login" className="text-white hover:text-blue-200">
          Login
        </Link>
      </nav>
    </div>
  </div>
</header>


  );
};

export default Header;
