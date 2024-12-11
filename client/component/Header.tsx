"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/clients";
import { User } from '@supabase/supabase-js';
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [isClient, setIsClient] = useState(false); // State to check if it's client-side
  const supabase = createClient();

  // Fetch the user when the component mounts
  const connected = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    connected();
    setIsClient(true); // Set to true when the component is mounted on the client
  }, []);

  const signout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isClient) {
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <header className="w-full bg-header text-white shadow-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bouton à droite : Le logo Lok-E */}
        <div className="ml-auto">
          <Link
            href="/"
            className="text-white text-3xl font-bold hover:text-blue-200"
          >
            Lok-E
          </Link>
        </div>

        {/* Boutons du centre : Feed et Ajouter un post */}
        <nav className="flex items-center gap-8">
          <Link
            href="/allPost"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Feed
          </Link>
          <Link
            href="/addPost"
            className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            add a post
          </Link>
        </nav>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-black"
          />
          <button
            type="submit"
            className="text-white px-6 py-3 rounded-md transition-all hover:bg-blue-700 hover:text-white"
          >
            Search
          </button>
        </form>

        {/* Boutons de gauche : Login et SignUp */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-white px-6 py-3 rounded-md transition-all hover:bg-blue-700 hover:text-white"
              >
                login
              </Link>
              <Link
                href="/signup"
                className="text-white px-6 py-3 rounded-md transition-all hover:bg-blue-700 hover:text-white"
              >
                sign up
              </Link>
            </>
          ) : null}
        </div>

        {/* Bouton déconnexion */}
        <div className="ml-4">
          {user && (
            <button
              className="text-white border-2 border-red-700 px-6 py-3 rounded-md transition-all hover:bg-white hover:text-red-700"
              onClick={signout}
            >
              disconnect
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
