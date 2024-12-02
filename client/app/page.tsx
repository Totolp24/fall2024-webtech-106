"use client";

import React, { useEffect, useState } from "react";
import Header from "@/component/Header";

const Page: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-100 py-16">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            First Page
          </h2>
          <p className="text-center text-gray-600">
            Welcome to Lok-E
          </p>

          {error && <p className="text-center text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default Page;
