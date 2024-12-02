"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/clients"; // Utiliser le client Supabase côté navigateur
import Cookies from "js-cookie"; // Importer js-cookie pour gérer les cookies
import { useRouter } from "next/navigation"; // Utiliser next/navigation pour la redirection

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null); // État pour l'utilisateur
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const [isClient, setIsClient] = useState(false); // Indicateur pour vérifier si c'est côté client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // S'assurer que le code ne s'exécute qu'après le montage côté client
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Vérifier si un utilisateur est authentifié via le cookie
    const userFromCookie = Cookies.get("user");

    if (userFromCookie) {
      // Si l'utilisateur est dans le cookie, on le charge dans l'état
      setUser(JSON.parse(userFromCookie));
      setLoading(false);
    } else {
      // Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
      router.push("/login");
    }
  }, [isClient, router]);

  const handleLogout = async () => {
    const supabase = createClient();

    // Déconnexion de Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message); // Afficher l'erreur si la déconnexion échoue
    } else {
      // Supprimer le cookie utilisateur et rediriger vers la page de connexion
      Cookies.remove("user");
      router.push("/login");
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Afficher un message de chargement si l'utilisateur est en cours de récupération
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
            Profil de {user.email}
          </h2>

          <div className="mb-4">
            <p className="text-gray-600">Email: {user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Se déconnecter
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
