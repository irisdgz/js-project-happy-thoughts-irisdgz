import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PageHeader } from "./components/PageHeader";
import { ThoughtInput } from "./components/ThoughtInput";
import { ThoughtCard } from "./components/ThoughtCard";
// Import the new components and constants
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { API_BASE_URL } from "./constants";

const API = `${API_BASE_URL}/messages`;

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
  const [thoughts, setThoughts] = useState([]);
  // 1. Add user state (replaces just accessToken to store email too)
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchThoughts();
    
    // 2. Check localStorage on mount (matches live session logic)
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const fetchThoughts = () => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setThoughts(json.response);
        }
      })
      .catch((error) => console.log("Could not load thoughts:", error));
  };

  // 3. Add handleLogin matching the live session
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 4. Add handleLogout matching the live session
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addThought = (text) => {
    fetch(API, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // 5. Pass the token from the user object
        "Authorization": user?.accessToken 
      },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setThoughts((prevThoughts) => [json.response, ...prevThoughts]);
        }
      })
      .catch((error) => console.log("Could not post thought:", error));
  };

  const likeThought = (id) => {
    fetch(`${API}/${id}/like`, { method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setThoughts((prevThoughts) =>
            prevThoughts.map((item) =>
              item._id === id ? { ...item, hearts: json.response.hearts } : item
            )
          );
        }
      })
      .catch((error) => console.log("Could not like thought:", error));
  };

  return (
    <Page>
      <PageHeader />
      <Main>
        {/* 6. Conditional Rendering for Auth matching live session */}
        <div className="auth-container" style={{ marginBottom: "20px" }}>
          {user ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p>Welcome, <strong>{user.email}</strong>!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              <SignupForm handleLogin={handleLogin} />
              <LoginForm handleLogin={handleLogin} />
            </div>
          )}
        </div>

        {/* 7. Only show input if user is logged in */}
        {user && <ThoughtInput onAddMessage={addThought} />}
        
        <ThoughtsList>
          {thoughts.map((item) => (
            <ThoughtCard
              key={item._id}
              entry={item}
              onLikeMessage={likeThought}
            />
          ))}
        </ThoughtsList>
      </Main>
    </Page>
  );
};