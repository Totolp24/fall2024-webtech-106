# Digital Publishing Application 📚

## 🎯 Project Overview

This project showcases the knowledge acquired during the semester by building a digital publishing platform. Users can create, interact, and customize their experience through a seamless, user-friendly interface.

---

## 🌟 Features

- 🔐 **User Authentication**: Robust OAuth2 login system with GitHub as the provider.
- ✍️ **Content Management**: Users can create, edit, delete, and store posts in a structured database.
- 💬 **Community Interaction**: Enable lively discussions through a commenting system on posts.
- 🧭 **Navigation and Accessibility**: Intuitive and responsive design for seamless user experience.
- 🎨 **Profile Customization**: Manage and personalize profiles with settings and preferences.
- 🌑 **Light/Dark Mode**: Persistent theme switching to match user preference.
- 🌍 **Gravatar Integration**: Display user avatars from Gravatar across the platform.

---

## 🌐 Deployment

The application is deployed and accessible at:
- **Frontend & Backend**: [Vercel Deployment](https://lokegames.vercel.app/)
- **Database**: Supabase instance for storage

---

## ⚙️ Core Functionalities

### 🏠 Home Page
- A welcoming and informative homepage.

### 🔍 Navigation
- A navigation bar linking to key pages like Home, About, Contact, etc.

### 🔑 Login & Profile Page
- GitHub-based authentication using Supabase.
- Persistent user context and profile management.

### 📑 Post Management
- **Create, Edit, and Delete Posts**: Accessible only to the post author.
- **Paginated Post List**: Displayed with sorting by creation date.
- **Detailed Post View**: Each post includes its content and user comments.

### 💬 Comment System
- Comment form for each post, allowing users to share thoughts.

### 🔍 Search
- Full-text search leveraging Supabase’s capabilities.

### 🛡️ Resource Access Control
- Row Level Security (RLS) on Supabase to ensure secure access.
- Only authenticated users can create and modify posts.

### ⚙️ User Settings
- Dashboard to modify Surname.

### 🖋️ WYSIWYG Editor
- Rich-text editing for post creation using a WYSIWYG library.

---

## 🛠️ Technologies Used

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Node.js/Express
- **Database**: Supabase
- **Styling**: Tailwind CSS with light/dark mode support
- **Deployment**: Vercel and Supabase

---

## ✨ Bonus Features

- 🪝 **External API Integration**: Fetch random images using the Unsplash API.

---

## 👥 Authors

- **Thomas LEPEU**
- **Xavier HEITZ**

---
