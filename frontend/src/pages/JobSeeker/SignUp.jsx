import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import wallpaper from "../../assets/cityscape.jpg";
import "../LoginForm.css";
import apiClient from "../../apiClient.js";

const JobSeekerSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiClient.post("/users/jobseeker/register/", {
        email: formData.username, // assuming backend uses email as username
        password: formData.password,
        role: "jobseeker",
      });

      // Save JWT tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect to dashboard or home
      navigate("/jobseeker/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="wrapper-container"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <div className="input-box">
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={formData.username}
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

          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSignUp;
