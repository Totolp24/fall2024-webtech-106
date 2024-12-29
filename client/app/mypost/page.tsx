"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/clients";
import Header from "@/component/Header";
import Footer from "@/component/footer";

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
  const [user, setUser] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState<string>("");

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
        fetchPostsAndData(user);
      }
    };

    const fetchPostsAndData = async (user: any) => {
      try {
        // Fetch posts
        const { data: postsData, error: postsError } = await supabase
          .from("post")
          .select("*")
          .eq("userID", user?.id)
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
  }, []);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setEditContent(post.content);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from("post")
        .update({ content: editContent })
        .eq("id", editingPost.id);

      if (error) throw error;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...post, content: editContent } : post
        )
      );
      setEditingPost(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("post")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
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

        <h2 className="text-2xl font-bold mb-4 ">My Posts</h2>
        <div className="space-y-6 text-gray-800 dark:text-gray-100">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-md text-gray-800 dark:text-gray-100">
              {editingPost?.id === post.id ? (
                <form onSubmit={handleEditSubmit}>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-800"
                  />
                  <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p className="text-gray-800 dark:text-gray-100">{post.content}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                <ul className="space-y-2">
                  {(comments[post.id] || []).map((comment) => (
                    <li key={comment.id} className="text-gray-800 dark:text-gray-100">
                      {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;