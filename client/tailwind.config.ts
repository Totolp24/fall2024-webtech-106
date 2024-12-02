import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // Inclut les fichiers dans le dossier pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  // Inclut les fichiers dans le dossier components
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Inclut les fichiers dans le dossier app
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
