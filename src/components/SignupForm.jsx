import { useState } from "react";
import styled from "styled-components";
import { API_BASE_URL } from "../constants";

const Card = styled.form`
  background: #fff;
  border: 2px solid #000;
  padding: 24px;
  box-shadow: 6px 6px 0 #000;
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 2px solid #000;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  outline: none;
  &:focus {
    background: #fffbe6;
  }
`;

const Button = styled.button`
  background: #000;
  color: #fff;
  border: 2px solid #000;
  padding: 10px 24px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;

const ErrorText = styled.p`
  color: #c81438;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  margin: 8px 0 0;
`;

const SignupForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const resJson = await response.json();

      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      handleLogin(resJson.response);
      setFormData({ email: "", password: "" });
    } catch (error) {
      setError(error.message);
      console.log("Error occurred during signup:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Card onSubmit={handleSubmit}>
      <Title>Sign up</Title>
      <FieldRow>
        <Label>
          Email
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </Label>
        <Label>
          Password
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Label>
      </FieldRow>
      <Button type="submit">Sign up</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </Card>
  );
};

export default SignupForm;