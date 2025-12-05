// src/App.jsx
import React, { useState } from "react";
import { Header } from "./components/Header";
import { ThoughtForm } from "./components/ThoughtForm";
import { ThoughtItem } from "./components/ThoughtItem";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (message) => {
    const newThought = {
      id: Date.now(),
      message,
      hearts: 0,
      createdAt: new Date(),
    };

    setThoughts((prev) => [newThought, ...prev]);
  };

  const handleLike = (id) => {
    setThoughts((prev) =>
      prev.map((thought) =>
        thought.id === id
          ? { ...thought, hearts: thought.hearts + 1 }
          : thought
      )
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="main-container">
        <ThoughtForm onAddThought={addThought} />

        <section className="thoughts-list">
          {thoughts.map((thought) => (
            <ThoughtItem
              key={thought.id}
              thought={thought}
              onLike={handleLike}
            />
          ))}
        </section>
      </main>
    </div>
  );
};
