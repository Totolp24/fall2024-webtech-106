import { createClient as createServerClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Fonction pour créer un client Supabase côté serveur
export const createClient = async () => {
  // Créer le client Supabase sans inclure l'option 'cookies'
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Résoudre les cookies en utilisant 'await' pour accéder aux cookies côté serveur
  const cookieStore = await cookies();
  
  // Utiliser la méthode cookies pour récupérer un cookie spécifique
  const userCookie = cookieStore.get("user");  // Exemple pour récupérer un cookie nommé "user"
  console.log("User cookie:", userCookie);

  // Si tu veux définir un cookie dans la réponse
  cookieStore.set("exampleCookie", "cookieValue", { path: "/" });

  return supabase;
};
