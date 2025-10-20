import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import wallpaper from "../../assets/Ppt Background.jpg";
import "../LoginForm.css";
import apiClient from "../../apiClient.js";

const CompanyRepSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // POST to backend with skipAuth
      const response = await apiClient.post(
        "/users/companyrep/register/",
        {
          email: formData.email,
          password: formData.password,
          company_name: formData.companyName,
        },
        { skipAuth: true }
      );

      // Save JWT tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect to dashboard or company home
      navigate("/companyrep/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          err.response?.data?.company_name?.[0] ||
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

          <div className="input-box">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <FaRegBuilding className="icon" />
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

export default CompanyRepSignUp;
