'use client'

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/clients'; // Utiliser le client Supabase côté navigateur
import Cookies from 'js-cookie'; // Importer js-cookie pour gérer les cookies

interface Contact {
  id: number;
  name: string;
  email: string;
}

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const supabase = createClient(); // Créer le client Supabase
      try {
        console.log('Supabase client initialized');

        // Récupérer les contacts depuis Supabase
        const { data, error } = await supabase.from('contacts').select('id, name, email');
        
        if (error) {
          setError(error.message || 'An error occurred with Supabase');
          console.error('Supabase error:', error);
        } else {
          setContacts(data || []);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error('Network or unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();

    // Exemple de récupération et manipulation de cookies côté client
    const userCookie = Cookies.get('user'); // Récupérer un cookie spécifique
    console.log('User Cookie on Client:', userCookie);

    // Exemple de définir un cookie côté client
    Cookies.set('lastVisited', new Date().toISOString(), { expires: 7, path: '/' });

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contacts List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
