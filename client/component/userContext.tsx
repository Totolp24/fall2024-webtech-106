'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/clients'; // Assurez-vous que votre client Supabase est bien configuré

// Définition du type User
interface User {
  id: string;
  email: string;
  name: string;
}

// Définition du contexte
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Créer un contexte avec des valeurs par défaut
const UserContext = createContext<UserContextType | undefined>(undefined);

// Créer un fournisseur de contexte
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient(); // Créer le client Supabase
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (authUser) {
          // Récupérer les infos utilisateur depuis la table `users` grâce à l'ID
          const { data, error } = await supabase
            .from('users')
            .select('id, email, name')
            .eq('id', authUser.id)
            .single(); // Récupérer une seule entrée

          if (error) {
            console.error(error);
            setUser(null); // Si erreur, on ne garde pas les informations
          } else {
            setUser(data); // Si succès, on met à jour l'état de l'utilisateur
          }
        }
      } catch (err) {
        console.error('Erreur de récupération de l\'utilisateur:', err);
        setUser(null); // Si erreur, on ne garde pas les informations
      }
    };

    fetchUser(); // Appeler la fonction de récupération des données de l'utilisateur
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Utiliser le contexte dans un composant
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'UserProvider');
  }
  return context;
};
