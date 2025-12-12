// src/App.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PageHeader } from "./components/PageHeader";
import { ThoughtInput } from "./components/ThoughtInput";
import { ThoughtCard } from "./components/ThoughtCard";

const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

// Layout styling
const Page = styled.div`
  min-height: 100vh;
  padding: 24px 16px 40px;
`;

const Main = styled.main`
  max-width: 640px;
  margin: 0 auto;
`;

const ThoughtsList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const App = () => {
  // All thoughts displayed in the app
  const [thoughts, setThoughts] = useState([]);

  // Load thoughts as soon as the page opens
  useEffect(() => {
    fetchThoughts();
  }, []);

  // Get the latest thoughts from the API
  const fetchThoughts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
      })
      .catch((error) => {
        console.log("Could not load thoughts:", error);
      });
  };

  // Add a new thought, POST request
  const addThought = (text) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        // Add the newest thought to the top of the list
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
      })
      .catch((error) => {
        console.log("Could not post thought:", error);
      });
  };

  // Like a thought
  const likeThought = (id) => {
    fetch(`${API_URL}/${id}/like`, {
      method: "POST",
    })
      .then(() => {
        // Update the liked thought directly in state
        setThoughts((prevThoughts) =>
          prevThoughts.map((item) =>
            item._id === id ? { ...item, hearts: item.hearts + 1 } : item
          )
        );
      })
      .catch((error) => {
        console.log("Could not like thought:", error);
      });
  };

  return (
    <Page>
      <PageHeader />

      <Main>
        <ThoughtInput onAddMessage={addThought} />

        <ThoughtsList>
          {thoughts.map((item) => (
            <ThoughtCard
              key={item._id}  // each key is a unique id
              entry={item}
              onLikeMessage={likeThought}
            />
          ))}
        </ThoughtsList>
      </Main>
    </Page>
  );
};
