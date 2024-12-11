"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Hook to read query params
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

const SearchPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<any>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

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

    const fetchPostsAndComments = async () => {
      try {
        const { data: postsData, error: postsError } = await supabase
          .from("post")
          .select("*")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);

        const { data: commentsData, error: commentsError } = await supabase
          .from("comment")
          .select("*");

        if (commentsError) throw commentsError;

        const groupedComments = commentsData?.reduce(
          (acc: { [key: string]: Comment[] }, comment: Comment) => {
            acc[comment.postID] = acc[comment.postID] || [];
            acc[comment.postID].push(comment);
            return acc;
          },
          {}
        );

        setComments(groupedComments || {});

        if (query) {
          const filtered = postsData?.filter((post) =>
            post.content.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredPosts(filtered || []);
        } else {
          setFilteredPosts(postsData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
    fetchPostsAndComments();
  }, [query]);

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
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {query ? (
          <p className="mb-4 text-gray-700">
            Showing results for: <span className="font-bold">{query}</span>
          </p>
        ) : (
          <p className="mb-4 text-gray-700">Showing all posts.</p>
        )}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 shadow-md">
                <p className="text-gray-700">{post.content}</p>

                <div className="mt-4">
                  <h3 className="font-semibold">Comments:</h3>
                  <ul className="space-y-2">
                    {(comments[post.id] || []).map((comment) => (
                      <li key={comment.id} className="text-gray-600">
                        {comment.content}
                      </li>
                    ))}
                  </ul>

                  {user && (
                    <div className="mt-4 flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment[post.id] || ""}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [post.id]: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full max-w-sm"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-600">No posts found.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default SearchPage;