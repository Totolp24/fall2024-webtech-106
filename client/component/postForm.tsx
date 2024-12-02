"use client";

import React, { useState } from "react";

type PostFormProps = {
  onSubmit: (post: { title: string; content: string }) => void;
};

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre"
          required
        />
      </div>
      <div>
        <label htmlFor="content">Contenu :</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Entrez le contenu du post"
          required
        />
      </div>
      <button type="submit">Publier</button>
    </form>
  );
};

export default PostForm;
