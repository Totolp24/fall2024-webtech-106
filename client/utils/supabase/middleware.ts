import { createClient as createServerClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Fonction middleware pour utiliser le client Supabase
export const createClient = (request: NextRequest) => {
  // Créer le client Supabase sans inclure 'cookies' dans ses options
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Créer une instance de NextResponse pour manipuler les cookies
  const supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Gérer les cookies dans la requête
  const cookies = request.cookies;

  // Exemple de récupération des cookies
  const userCookie = cookies.get("user");
  console.log("User Cookie:", userCookie);

  // Exemple d'ajout d'un cookie à la réponse
  supabaseResponse.cookies.set("newCookie", "value", { path: "/" });

  // Retourner la réponse avec les cookies gérés
  return supabaseResponse;
};
