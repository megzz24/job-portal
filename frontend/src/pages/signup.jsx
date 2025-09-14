import { Link } from "react-router-dom";
import wallpaper from "../assets/corporate.avif";
import "./LoginForm.css"; 
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";


const SignUp = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Sign Up</h1>

        <div className="input-box">
          <input type="text" placeholder="Username" />
          <FaRegUser className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" />
          <MdOutlineLock className="icon" />
        </div>

        {/* ✅ Button sits on its own row */}
        <button type="submit">Register</button>

        {/* ✅ Login link sits at bottom */}
        <div className="register-link">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
