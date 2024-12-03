"use client";


import React, { useState} from "react";
import Header from "@/component/Header";
import { createClient } from "@/utils/supabase/clients"; // Utiliser le client Supabase côté navigateur

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Ajouter un état pour le nom d'utilisateur
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Type explicite pour l'erreur
  const [loading, setLoading] = useState(false); // State pour gérer le chargement de l'inscription

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true); // Début du chargement

    // Validation des champs
    if (!email.includes('@') || !email.includes('.')) {
      setError("Veuillez entrer un email valide.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      setLoading(false);
      return;
    }
    if (!username) {
      setError("Veuillez entrer un nom d'utilisateur.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false); // Fin du chargement
  

    if (signupError) {
      setError(signupError.message); // Afficher l'erreur d'inscription
      return;
    } else {
      alert("Inscription réussie ! Un email de confirmation a été envoyé.");

      // Ajouter l'utilisateur dans la table 'userData' après une inscription réussie dans Supabase Auth
      const {  error: insertError } = await supabase
        .from("userData")
        .insert([{ mail: email, username: username, userid: data.user.id }]); // Assurez-vous d'utiliser data.user.id ici

      if (insertError) {
        console.error("Erreur lors de l'ajout dans userData:", insertError.message);
        setError(`Erreur lors de l'ajout des données utilisateur dans la table 'userData': ${insertError.message}`);
      } else {
      }
    }
  };

  const handleGitHubLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      setError(error.message); // Afficher l'erreur en cas de problème
    } else {
      // Supabase gère la redirection après la connexion OAuth
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl"
        >
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Signup</h2>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Entrez votre email"
              required
            />
          </div>

          {/* Nom d'utilisateur */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {/* Bouton register */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Register'}
          </button>

          {/* Bouton GitHub */}
          <button
            onClick={handleGitHubLogin}
            type="button"
            className="w-full mt-4 py-3 text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            Register with GitHub
          </button>

          {/* Affichage des erreurs */}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
