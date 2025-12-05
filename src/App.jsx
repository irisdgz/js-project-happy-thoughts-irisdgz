// src/App.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { PageHeader } from "./components/PageHeader";
import { ThoughtInput } from "./components/ThoughtInput";
import { ThoughtCard } from "./components/ThoughtCard";

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
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      message: text,
      hearts: 0,
      createdAt: new Date(),
    };

    // newest first
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  const likeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((item) =>
        item.id === id ? { ...item, hearts: item.hearts + 1 } : item
      )
    );
  };

  return (
    <Page>
      <PageHeader />

      <Main>
        <ThoughtInput onAddMessage={addMessage} />

        <ThoughtsList>
          {messages.map((entry) => (
            <ThoughtCard
              key={entry.id}
              entry={entry}
              onLikeMessage={likeMessage}
            />
          ))}
        </ThoughtsList>
      </Main>
    </Page>
  );
};
