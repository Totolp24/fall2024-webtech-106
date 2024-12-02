"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

  useEffect(() => {
    setIsClient(true);
    // Vérifiez ici si l'utilisateur est connecté (exemple avec localStorage ou un autre mécanisme)
    // setIsLoggedIn(localStorage.getItem("user") ? true : false);
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
            href="/allPost"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Fil d'actualité
          </Link>
          <Link
            href="/settings"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Settings
          </Link>
          {/* Nouveau bouton "Ajouter un post" */}
          <Link
            href="/addPost"
            className="bg-transparent text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 hover:border-blue-700 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105"
          >
            Ajouter un post
          </Link>
        </nav>

        {/* Conteneur du bouton séparé à droite */}
        <div className="ml-auto">
          {/* Bouton dynamique en fonction de l'état de connexion */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-transparent text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 hover:border-blue-700 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105"
            >
              Se connecter
            </Link>
          ) : (
            <button
              className="bg-transparent text-white border-2 border-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105"
              onClick={() => alert("Déconnexion")} // Logique de déconnexion à ajouter ici
            >
              Se déconnecter
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
