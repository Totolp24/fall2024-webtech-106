// utils/supabase/clients.ts

// Importation de la fonction nécessaire pour créer le client côté navigateur
import { createClient as createBrowserClient } from "@supabase/supabase-js";

// Importation d'une bibliothèque de gestion des cookies côté client (optionnel)
import Cookies from "js-cookie";

// Fonction pour créer un client Supabase côté client
export const createClient = () => {
  // Créer le client Supabase côté client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Exemple : récupérer un cookie côté client
  const userCookie = Cookies.get('user'); // Utiliser js-cookie pour récupérer un cookie spécifique
  console.log("User Cookie on Client:", userCookie);

  // Exemple : définir un cookie côté client
  Cookies.set('user', 'userValue', { expires: 7, path: '/' }); // Définir un cookie avec une expiration de 7 jours

  return supabase;
};
