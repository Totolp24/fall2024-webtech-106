"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/clients";
import Header from "@/component/Header";

const supabase = createClient();

// Types
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
  const [user, setUser] = useState<any>(null);

  


  useEffect(() => {
    

    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(user);
      }
    };

    const fetchPostsAndData = async () => {
     



    // Attendez que toutes les mises à jour soient terminées


      try {
        // Fetch posts
        const { data: postsData, error: postsError } = await supabase
          .from("post")
          .select("*")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);

        // Fetch comments
        const { data: commentsData, error: commentsError } = await supabase
          .from("comment")
          .select("*");

        if (commentsError) throw commentsError;

        const groupedComments = commentsData?.reduce((acc: { [key: string]: Comment[] }, comment: Comment) => {
          acc[comment.postID] = acc[comment.postID] || [];
          acc[comment.postID].push(comment);
          return acc;
        }, {});
        setComments(groupedComments || {});


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
    fetchPostsAndData();
  }, []);

  const handleComment = async (postId: string) => {
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }

    const commentContent = newComment[postId] || "";
    if (commentContent.trim()) {
      try {
        const { data, error } = await supabase
          .from("comment")
          .insert({
            postID: postId,
            userID: user.id,
            content: commentContent,
          })
          .select();

        if (error) {
          console.error("Error adding comment:", error);
        } else {
          setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), data[0]],
          }));
          setNewComment({ ...newComment, [postId]: "" });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        {user ? (
          <p className="text-green-600">Welcome, {user.email}!</p>
        ) : (
          <p className="text-red-600">You are not logged in. Please log in to interact.</p>
        )}

        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-md">
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment[post.id] || ""}
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
