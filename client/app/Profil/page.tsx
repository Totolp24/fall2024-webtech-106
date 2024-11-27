'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/clients'; // Client Supabase côté navigateur

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient(); // Créer le client Supabase
      try {
        // Supposons que l'utilisateur actuel est authentifié et que nous pouvons obtenir son ID
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          setError('Utilisateur non connecté.');
          setLoading(false);
          return;
        }

        // Récupérer les infos utilisateur depuis la table `users` grâce à l'ID
        const { data, error } = await supabase
          .from('users') // Nom de la table dans Supabase
          .select('id, email, name') // Colonnes à récupérer
          .eq('id', authUser.id) // Filtrer par ID de l'utilisateur authentifié
          .single(); // On veut un seul utilisateur

        if (error) {
          setError('Impossible de récupérer les informations utilisateur.');
          console.error(error);
        } else {
          setUser(data);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h1>Profil utilisateur</h1>
      {user ? (
        <div>
          <p><strong>ID :</strong> {user.id}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Nom :</strong> {user.name}</p>
        </div>
      ) : (
        <p>Aucune information utilisateur disponible.</p>
      )}
    </div>
  );
}
