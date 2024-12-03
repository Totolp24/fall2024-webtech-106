"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/clients';
import Header from '@/component/Header';

const supabase = createClient();

// Définir les types
type Post = {
  id: string;
  content: string;
  like: number;
  created_at: string;
  userID: string;
  picture: string;
};

type Comment = {
  id: string;
  postID: string;
  content: string;
  created_at: string;
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      // Charger les posts
      const { data: postsData, error: postsError } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) console.error(postsError);
      else setPosts(postsData);

      // Charger les commentaires pour chaque post
      const { data: commentsData, error: commentsError } = await supabase
        .from('comment')
        .select('*');

      if (commentsError) console.error(commentsError);
      else {
        // Grouper les commentaires par `postID`
        const groupedComments = commentsData.reduce((acc: { [key: string]: Comment[] }, comment: Comment) => {
          acc[comment.postID] = acc[comment.postID] || [];
          acc[comment.postID].push(comment);
          return acc;
        }, {});
        setComments(groupedComments);
      }

      // Charger les likes de l'utilisateur actuel
      const { data: likesData, error: likesError } = await supabase
        .from('post_likes')
        .select('postID');

      if (likesError) console.error(likesError);
      else {
        const likesMap = likesData.reduce((acc: { [key: string]: boolean }, like: { postID: string }) => {
          acc[like.postID] = true;
          return acc;
        }, {});
        setUserLikes(likesMap);
      }
    };

    fetchPostsAndComments();
  }, []);

  const toggleLike = async (postId: string) => {
    // Vérifier si le post a déjà un like
    const { data: existingLike, error: likeError } = await supabase
      .from('post_likes')
      .select('*')
      .eq('postID', postId) // Rechercher les likes pour ce post
      .single(); // On prend le premier résultat car il devrait y en avoir un ou aucun
  
    if (likeError) {
      console.error('Error checking like status:', likeError);
      return;
    }
  
    // Si aucun like n'existe pour ce post, ajouter un like
    if (!existingLike) {
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([{ postID: postId }]); // On insère un like pour ce post
  
      if (insertError) {
        console.error('Error adding like:', insertError);
        return;
      }
    } else {
      // Si le post a déjà un like, supprimer le like
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('postID', postId); // Supprimer le like pour ce post
  
      if (deleteError) {
        console.error('Error removing like:', deleteError);
        return;
      }
    }
  
    // Comptage des likes : compter le nombre de lignes dans post_likes pour ce post
    const { count, error: countError } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact' })
      .eq('postID', postId); // On compte toutes les lignes pour ce post
  
    if (countError) {
      console.error('Error counting likes:', countError);
      return;
    }
  
    // Mettre à jour l'état local avec le nouveau nombre de likes
    setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, likeCount: count } : p // Mettre à jour comme "likeCount"
        )
      );
      
  };
  

  const handleComment = async (postId: string) => {
    const comment = newComment[postId] || '';
    if (comment.trim()) {
      const { data, error } = await supabase
        .from('comment')
        .insert([{ postID: postId, content: comment }]);
  
      if (error) {
        console.error(error);
      } else {
        // Vérification si 'data' contient un élément ou est un objet non vide
        if (data && Object.keys(data).length > 0) {
          // Ajouter le nouveau commentaire localement
          setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), data], // Ajouter l'objet de données retourné
          }));
          setNewComment({ ...newComment, [postId]: '' }); // Réinitialiser le champ de commentaire
        } else {
          console.error('No comment data returned');
        }
      }
    }
  };
  

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-md">
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`px-4 py-2 rounded text-white ${
                    userLikes[post.id] ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {userLikes[post.id] ? 'Unlike' : 'Like'} ({post.like || 0})
                </button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment[post.id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                  className="border p-2 rounded w-full max-w-sm"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Comment
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                <ul className="space-y-2">
                  {(comments[post.id] || []).map((comment) => (
                    <li key={comment.id} className="text-gray-600">
                      {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
