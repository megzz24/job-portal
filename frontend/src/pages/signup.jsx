import { Link } from "react-router-dom";
import wallpaper from "../assets/corporate.avif";
import "./signin.css"; // reuse the same CSS

const SignUp = () => {
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
        justifyContent: "flex-end", // move card-bg to the right
      }}
    >
      <div className="card-bg">
        <div className="signin-card">
          <h2>Create Account</h2>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
