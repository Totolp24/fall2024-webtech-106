import React from "react";

import "./globals.css";
//import Layout from '../components/Layout';

// app/about/page.tsx

import { createClient } from "@supabase/supabase-js";

// Définir un type pour les contacts
interface Contact {
  id: number;// Par exemple, si vous avez une colonne 'phone' dans votre table
}

// Créer un client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string; // Récupérez l'URL de Supabase
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string; // Récupérez la clé d'API publique
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour récupérer les contacts depuis Supabase
async function fetchContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts") // Table 'contacts' dans Supabase
    .select("*"); // Sélectionner toutes les colonnes

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

// Composant pour afficher les contacts
export default async function Page() {
  const contacts = await fetchContacts(); // Appel à la fonction de récupération des contacts

  return (
    <div>
      <h1>Contacts List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
