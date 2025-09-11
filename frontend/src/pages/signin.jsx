// src/components/SignIn.jsx
import { Link } from "react-router-dom";
import wallpaper from "../assets/grafitti.jpg";
import "./signin.css"; 

const SignIn = () => {
  return (
    <div
      className="signin-root"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div className="card-bg">
      <div className="signin-card">
        <h2>Welcome Back</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
