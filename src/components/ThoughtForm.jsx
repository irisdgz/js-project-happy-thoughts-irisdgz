// src/components/ThoughtForm.jsx
import React, { useState } from "react";
import { Heart } from "lucide-react";

export const ThoughtForm = ({ onAddThought }) => {  
  const [newThought, setNewThought] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newThought.trim().length < 5) {
      setErrorMessage("Your message is too short");
      return;
    }

    onAddThought(newThought.trim());
    setNewThought("");
    setErrorMessage("");
  };

  return (
    <section className="card card--form">
      <h3 className="form-title">What's making you happy right now?</h3>

      <form onSubmit={handleSubmit} className="thought-form">
        <textarea
          rows="3"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Write a happy message..."
        />

        {errorMessage && (
          <p className="error-text">{errorMessage}</p>
        )}

        <button type="submit" className="send-button">
          <Heart size={18} fill="#ff4b6e" color="#ff4b6e" />
          <span>Send Happy Thought</span>
          <Heart size={18} fill="#ff4b6e" color="#ff4b6e" />
        </button>
      </form>
    </section>
  );
};
