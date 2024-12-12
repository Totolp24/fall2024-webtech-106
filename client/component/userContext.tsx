'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/clients';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (authUser) {
          const { data, error } = await supabase
            .from('users')
            .select('id, email, name')
            .eq('id', authUser.id)
            .single();

          if (error) {
            console.error(error);
            setUser(null);
          } else {
            setUser(data);
          }
        }
      } catch (err) {
        console.error('Erreur de récupération de l\'utilisateur:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'UserProvider');
  }
  return context;
};
