import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back </h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
