"use client";

import React, { useEffect, useState } from 'react';
import Header from "@/component/header"; // Assurez-vous que le chemin d'importation est correct
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
    <div className="bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
      <Header /> {/* Ajout du Header ici */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Contacts List</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white text-gray-800 border-collapse">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-3 px-6 border-b">ID</th>
                <th className="py-3 px-6 border-b">Name</th>
                <th className="py-3 px-6 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="odd:bg-gray-100 even:bg-gray-200">
                  <td className="py-2 px-6 border-b">{contact.id}</td>
                  <td className="py-2 px-6 border-b">{contact.name}</td>
                  <td className="py-2 px-6 border-b">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
