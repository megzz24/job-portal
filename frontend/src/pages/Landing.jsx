import { useNavigate } from "react-router-dom";
import wallpaper from "../assets/cityscape.jpg"; // background image
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="wrapper-container"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="wrapper landing-wrapper">
        <h1>Join Us</h1>
        <p className="subtitle">Are you a Job Seeker or a Company Representative?</p>

        <div className="role-buttons">
          <button onClick={() => navigate("/jobseeker/signup")}>
            Job Seeker
          </button>
          <button onClick={() => navigate("/companyrep/signup")}>
            Company Representative
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
