"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/clients";
import Header from "@/component/Header";
import md5 from "md5";
import { useRouter } from "next/navigation";
import Footer from "@/component/footer";

const supabase = createClient();

type User = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
};

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else if (user) {
        const email = user.email || "";
        const avatarUrl = `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon`;
        setUser({
          id: user.id,
          email,
          displayName: user.user_metadata?.displayName || "",
          avatarUrl,
        });
        setNewDisplayName(user.user_metadata?.displayName || "");
      }
    };

    fetchUser();
  }, []);

  const handleDisplayNameChange = async () => {
    if (!user) return;
    try {
      const { error } = await supabase.auth.updateUser({
        data: { displayName: newDisplayName },
      });
      if (error) throw error;
      setUser((prevUser) =>
        prevUser ? { ...prevUser, displayName: newDisplayName } : null
      );
      alert("Display name updated successfully!");
    } catch (error) {
      console.error("Error updating display name:", error);
      alert("Failed to update display name.");
    }
  };

  const handleNavigateToPosts = () => {
    router.push("/mypost");
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mt-4">User Profile</h2>
            <div className="mt-4 space-y-4">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-lg font-medium">Email: {user.email}</p>
              <p className="text-lg font-medium">Display Name: {user.displayName}</p>

              <div>
                <label className="block font-medium">Update Display Name:</label>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full dark:bg-gray-800"
                />
                <button
                  onClick={handleDisplayNameChange}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Update Display Name
                </button>
              </div>
              <button
                onClick={handleNavigateToPosts}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              >
                Go to My Posts
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-600">You are not logged in. Please log in to interact.</p>
        )}
      </main>
      <Footer/>
    </>
  );
};

export default Home;
