import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PageHeader } from "./components/PageHeader";
import { ThoughtInput } from "./components/ThoughtInput";
import { ThoughtCard } from "./components/ThoughtCard";
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
  const [user, setUser] = useState(null);

  // Only check localStorage on mount (no fetch here)
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  //  Fetch thoughts only when user exists
  useEffect(() => {
    if (user) {
      fetchThoughts();
    } else {
      setThoughts([]); // this is optional: it clears thoughts on logout
    }
  }, [user]);

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

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addThought = (text) => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.accessToken,
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
        <div className="auth-container" style={{ marginBottom: "20px" }}>
          {user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                Welcome, <strong>{user.email}</strong>!
              </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              <SignupForm handleLogin={handleLogin} />
              <LoginForm handleLogin={handleLogin} />
            </div>
          )}
        </div>

        {/*  Only show input + list if logged in */}
        {user && <ThoughtInput onAddMessage={addThought} />}

        {user && (
          <ThoughtsList>
            {thoughts.map((item) => (
              <ThoughtCard
                key={item._id}
                entry={item}
                onLikeMessage={likeThought}
              />
            ))}
          </ThoughtsList>
        )}
      </Main>
    </Page>
  );
};
