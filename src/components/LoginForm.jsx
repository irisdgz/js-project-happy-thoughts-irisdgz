import { useState } from "react";
import { API_BASE_URL } from "../constants";

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    try {
      // 1. Updated endpoint to include /users/
      const response = await fetch(`${API_BASE_URL}/users/login`, {
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      // Check for the success property if your backend sends it
      if (data.success) {
        handleLogin(data.response);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log("Error during login:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;