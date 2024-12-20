"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/clients';
import Header from '@/component/Header';

const supabase = createClient();

const CreatePost = () => {
  const [content, setContent] = useState<string>(''); // Contenu du post
  const [error, setError] = useState<string>(''); // Erreurs lors de la création
  const [loading, setLoading] = useState<boolean>(false); // Indicateur de chargement
  const [userId, setUserId] = useState<string | null>(null); // ID de l'utilisateur

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Le contenu du post est obligatoire.");
      return;
    }

    setLoading(true);
    setError(''); // Réinitialiser l'erreur avant d'essayer d'envoyer

    // Insérer un nouveau post dans Supabase
    const { data, error: insertError } = await supabase
      .from('post')
      .insert([{ content, userID: userId }]);

    if (insertError) {
      setError("Une erreur s'est produite lors de la création du post.");
      console.error(insertError);
    } else {
      console.log('New post created:', data); // You can log or use data here
      setContent('');
      alert("Post créé avec succès !");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Créer un nouveau post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrivez votre post..."
              className="border p-4 rounded w-full"
              rows={6}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer le post"}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreatePost;