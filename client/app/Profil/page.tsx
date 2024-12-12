"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/clients'; // Client Supabase côté navigateur
import md5 from 'md5'; // Importer une librairie pour générer le hash MD5

interface UserProfile {
  id: string;
  email: string;
  username: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          setError('Utilisateur non connecté.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('id, email, username')
          .eq('id', authUser.id)
          .single();

        if (error) {
          setError('Impossible de récupérer les informations utilisateur.');
          console.error(error);
        } else {
          setUser(data);
          setUsername(data.username);
        }
      } catch (err) {
        setError('Une erreur inattendue est survenue.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion :', error);
    } else {
      setUser(null);
    }
  };

  const handleUpdateProfile = async () => {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('users')
        .update({ username })
        .eq('id', user?.id);

      if (error) {
        setError('Impossible de mettre à jour les informations utilisateur.');
        console.error(error);
      } else {
        setUser({ ...user, username } as UserProfile);
      }
    } catch (err) {
      setError('Une erreur inattendue est survenue.');
      console.error('Error:', err);
    }
  };

  const getGravatarUrl = (email: string, size: number = 150) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil utilisateur</h1>
      {user ? (
        <div className="border p-4 rounded-lg shadow-md">
          <img
            src={getGravatarUrl(user.email)} // Utiliser Gravatar
            alt="Avatar utilisateur"
            className="w-24 h-24 rounded-full mb-4"
          />
          <p><strong>ID :</strong> {user.id}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <div className="mt-4">
            <label className="block mb-2 font-semibold">
              Nom d'utilisateur :
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </label>
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Mettre à jour le nom d'utilisateur
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <p>Aucune information utilisateur disponible.</p>
      )}
    </div>
  );
}
