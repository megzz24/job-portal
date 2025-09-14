// src/components/SignIn.jsx
import { Link } from "react-router-dom";
import wallpaper from "../assets/corporate.avif";
import "./LoginForm.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

const SignIn = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Sign In</h1>

        <div className="input-box">
          <input type="text" placeholder="Username" />
          <FaRegUser className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" />
          <MdOutlineLock className="icon" />
        </div>

        {/* ✅ Remember + Forgot row */}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        {/* ✅ Button sits on its own row */}
        <button type="submit">Login</button>

        {/* ✅ Register link sits at bottom */}
        <div className="register-link">
          <p>
            Don&apos;t have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
