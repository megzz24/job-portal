// src/components/SignIn.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../assets/corporate.avif";

import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import apiClient from "../apiClient.js";
import "./LoginForm.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/users/login/", formData);

      const { access, refresh, user_type } = response.data;

      // Save tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Redirect based on user type
      if (user_type === "jobseeker") {
        navigate("/jobseeker/dashboard");
      } else if (user_type === "company_rep") {
        navigate("/companyrep/dashboard");
      } else {
        setError("Unknown user type.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="wrapper-container"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaRegUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <MdOutlineLock className="icon" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="register-link">
            <p>Don’t have an account? </p>
            <Link to="/jobseeker/signup">
              Sign Up as <b>JobSeeker</b>
            </Link>{" "}
            or{" "}
            <Link to="/companyrep/signup">
              {" "}
              as <b>Company Rep</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
