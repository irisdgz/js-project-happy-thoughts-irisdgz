import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.section`
  background: #f2f2f2;
  border: 2px solid #000;
  padding: 16px;
  box-shadow: 8px 8px 0 #000;
  margin-bottom: 24px;
`;

const TabRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  border: 2px solid #000;
  border-radius: 4px;
  overflow: hidden;
`;

const Tab = styled.button`
  flex: 1;
  padding: 8px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#ffadad" : "#fff")};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid #000;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #ffadad;
  border: 2px solid #000;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4px;
`;

const ErrorText = styled.p`
  color: #9e0b2b;
  font-size: 12px;
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
`;

export const AuthForm = ({ onSignup, onLogin }) => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Both fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (mode === "signup") {
      onSignup(email.trim(), password);
    } else {
      onLogin(email.trim(), password);
    }
  };

  return (
    <Card>
      <TabRow>
        <Tab $active={mode === "login"} onClick={() => { setMode("login"); setError(""); }}>
          Log in
        </Tab>
        <Tab $active={mode === "signup"} onClick={() => { setMode("signup"); setError(""); }}>
          Sign up
        </Tab>
      </TabRow>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton type="submit">
          {mode === "login" ? "Log in" : "Create account"}
        </SubmitButton>
      </form>
    </Card>
  );
};