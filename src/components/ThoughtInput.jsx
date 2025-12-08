// src/components/ThoughtInput.jsx
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
  font-family: "Monteserrat", monospace;
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
  font-family: "Monteserrat", monospace;
  font-size: 14px;
  resize: vertical;
`;

const ErrorText = styled.p`
  color: #e11d48;
  font-size: 12px;
  font-family: "Monteserrat", monospace;
  margin: 0;
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
  font-family: "Courier New", monospace;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: #ff9999;
  }
`;
    //This is the controlled form, which means React always knows what the user is typing.
export const ThoughtInput = ({ onAddMessage }) => {
  const [newMessage, setNewMessage] = useState("");  // Here stores the new message input by the user
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();  //Stops the page from refreshing.

    if (newMessage.trim().length < 5) {
      setErrorMessage("Your message is too short");
      return;
    }

    onAddMessage(newMessage.trim());  //This means run addMessage () in App.jsx with the new message 
    setNewMessage(""); // Clear the textarea after submission
    setErrorMessage("");
  };

  return (
    <FormCard>
      <Title>What's making you happy right now?</Title>

      <Form onSubmit={handleSubmit}>
        <TextArea  //textarea is controlled by React. React always knows the current text typed
          rows="3"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}  //typing updates React state (the variable newMessage).
          placeholder="Write a happy thought..."
        />

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <SubmitButton type="submit">
          <Heart size={18} fill="#ff4b6e" color="#ff4b6e" />
          <span>Send Happy Thought</span>
          <Heart size={18} fill="#ff4b6e" color="#ff4b6e" />
        </SubmitButton>
      </Form>
    </FormCard>
  );
};
