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
    <header className="w-full bg-header text-black dark:text-white shadow-md py-8">
      <div className="max-w-12xl mx-auto px-8 sm:px-8 lg:px-12 flex items-center justify-between">
        <div className="mr-auto">
          <a href="/">
            <img
              src="/logo/logo.webp"
              className="w-5 object-cover transform hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
        <nav className="flex items-center "> {/* Espacement entre les liens de navigation */}
          <Link href="/allPost" className="hover:text-blue-200 text-lg px-6 py-3 rounded-md ">
            Feed
          </Link>
          <div>/       /   </div>
          <Link href="/addPost" className="hover:text-blue-200 text-lg px-6 py-3 rounded-md">
            Add a Post
          </Link>
        </nav>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isClient) {
              window.location.href = `/search?query=${searchQuery}`;
            }
          }}
          className="flex items-center gap-8"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-6 py-3 text-black dark:text-white dark:bg-gray-800 dark:border-gray-800 rounded-md"
          />
          <button type="submit" className="border-2 border-black dark:border-white px-6 py-3 rounded-md hover:bg-blue-700">
            Search
          </button>
        </form>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="px-6 py-3 rounded-md hover:bg-blue-700">
                Login
              </Link>
     
                <div>/</div>
              <Link href="/signup" className="px-6 py-3 rounded-md hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          ) : (
            <Link href="/Profil" className="px-6 py-3 rounded-md hover:bg-blue-700">
              Profil
            </Link>
          )}
        </div>
        <div className="ml-4">
          {user && (
            <button
              className="border-2 px-6 py-3 border-red-500"
              onClick={() => supabase.auth.signOut().then(() => setUser(null))}
            >
              Disconnect
            </button>
          )}
        </div>
        <div className="ml-4">
          <button className="px-6 py-3 rounded-md hover:bg-blue-700" onClick={toggleDarkMode}>
            <img
              src={isDarkMode ? "/logo/light-mode.png" : "/logo/dark-mode.png"}
              className="object-cover h-5"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
