"use client";

import React, { useState } from "react";
import Header from "@/component/Header";
import { createClient } from "@/utils/supabase/clients";

const User: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Afficher l'erreur
    } else {
      alert("Connexion réussie");
    }
  };

  const handleGitHubLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (error) {
      setError(error.message); // Afficher l'erreur en cas de problème
    } else {
      // Supabase gère la redirection après la connexion OAuth
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div>
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
              Connexion
            </h2>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Entrez votre email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Se connecter
            </button>
            <button
              onClick={handleGitHubLogin}
              className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Se connecter avec GitHub
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
