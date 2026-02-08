import { useState } from "react";
import { API_BASE_URL } from "../constants";

const SignupForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Updated endpoint to match the /users prefix in my backend
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        // 2. Manually pulling out email and password for the body
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle network errors
      if (!response.ok && response.status > 499) {
        throw new Error("Failed to create user");
      }

      const resJson = await response.json();

      // Handle application-level errors (e.g., user already exists)
      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      // Success! Pass the user data up to App.jsx
      handleLogin(resJson.response);

      // Reset the form fields
      setFormData({ email: "", password: "" });
    } catch (error) {
      setError(error.message);
      console.log("Error occurred during signup:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Updating state using the previous state pattern from the live session
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <div className="login-inputs">
        <label>
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </label>

        <label>
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </label>
      </div>

      <button type="submit">Sign up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignupForm;