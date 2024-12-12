"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/clients";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const supabase = createClient();

  const connected = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    connected();
    setIsClient(true);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="w-full bg-header text-white shadow-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="mr-auto">
          <Link href="/" className="text-white text-3xl font-bold hover:text-blue-200">
            Lok-E
          </Link>
        </div>
        <nav className="flex items-center gap-8">
          <Link href="/allPost" className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md">
            Feed
          </Link>
          <Link href="/addPost" className="text-white hover:text-blue-200 text-lg px-6 py-3 rounded-md">
            add a post
          </Link>
        </nav>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (isClient) {
            window.location.href = `/search?query=${searchQuery}`;
          }
        }} className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-black"
          />
          <button type="submit" className="text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Search
          </button>
        </form>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="text-white px-6 py-3 rounded-md hover:bg-blue-700">
                login
              </Link>
              <Link href="/signup" className="text-white px-6 py-3 rounded-md hover:bg-blue-700">
                sign up
              </Link>
            </>
          ) : (
            <Link href="/Profil" className="text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Profil
            </Link>
          )}
        </div>
        <div className="ml-4">
          {user && (
            <button
              className="text-white border-2 border-red-700 px-6 py-3 rounded-md hover:bg-white hover:text-red-700"
              onClick={() => supabase.auth.signOut().then(() => setUser(null))}
            >
              disconnect
            </button>
          )}
        </div>
        <div className="ml-4">
          <button
            className="text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
