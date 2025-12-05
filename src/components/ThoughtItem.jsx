// src/components/ThoughtItem.jsx
import React from "react";
import { Heart } from "lucide-react";

const getTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return "a long time ago";
};

export const ThoughtItem = ({ thought, onLike }) => {
  const timeAgo = getTimeAgo(thought.createdAt);
  const hasHearts = thought.hearts > 0;

  return (
    <article className="card">
      <p className="thought-message">{thought.message}</p>

      <div className="thought-footer">
        <div className="like-group">
          <button
            type="button"
            className={`like-button ${hasHearts ? "like-button--active" : ""}`}
            onClick={() => onLike(thought.id)}
          >
            <Heart
              size={18}
              color={hasHearts ? "#ff4b6e" : "#555"}
              fill={hasHearts ? "#ff4b6e" : "none"}
            />
          </button>
          <span className="like-count">x {thought.hearts}</span>
        </div>

        <span className="time-ago">{timeAgo}</span>
      </div>
    </article>
  );
};
