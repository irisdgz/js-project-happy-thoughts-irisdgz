import React, { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";

const FormCard = styled.section`
  background: #f2f2f2;
  border: 2px solid #000;
  padding: 16px;
  box-shadow: 8px 8px 0 #000;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  margin: 0 0 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border: 2px solid #000;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  color: #9e0b2bff;
  font-size: 12px;
  margin: 0;
  font-family: "Montserrat", sans-serif;
`;

const SubmitButton = styled.button`
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffadad;
  border: 2px solid #000;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: bold;
  
`;

export const ThoughtInput = ({ onAddMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Runs when the user submits the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // easy length checks based on the API rules 5-140 letters
    if (newMessage.trim().length < 5) {
      setErrorMessage("Message is too short.");
      return;
    }

    if (newMessage.trim().length > 140) {
      setErrorMessage("Message is too long.");
      return;
    }

    // Send the text back up to App.jsx
    onAddMessage(newMessage.trim());

    // Reset the form after sending the message
    setNewMessage("");
    setErrorMessage("");
  };

  return (
    <FormCard>
      <Title>What's making you happy right now?</Title>

      <Form onSubmit={handleSubmit}>
        <TextArea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a happy thought..."
        />

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <SubmitButton type="submit">
          <Heart size={18} color="#c81438ff" fill="#c81438ff" />
          Send Happy Thought
          <Heart size={18} color="#c81438ff" fill="#c81438ff" />
        </SubmitButton>
      </Form>
    </FormCard>
  );
};


