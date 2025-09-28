// App.jsx
import { Routes, Route } from "react-router-dom";
import JobSeekerSignUp from "../src/pages/JobSeeker/SignUp";
import CompanyRepSignUp from "../src/pages/CompanyRep/Signup";
import SignIn from "./pages/signin";
import JobSeekerDashboard from "./pages/JobSeeker/DashBoard";
import CompanyRepDashboard from "./pages/CompanyRep/Dashboard";
import JobFinder from "./pages/JobSeeker/JobFinder";
import Landing from "./pages/Landing";
import Jobposts from "./pages/CompanyRep/Jobposts";
import JobSeekerProfile from "./pages/JobSeeker/Profile";
import JobSeekerSettings from "./pages/JobSeeker/Settings";
import CompanyRepProfile from "./pages/CompanyRep/Profile";
import CompanyRepSettings from "./pages/CompanyRep/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
      <Route path="/companyrep/signup" element={<CompanyRepSignUp />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
      <Route path="/jobseeker/jobfinder" element={<JobFinder />} />
      <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
      <Route path="/jobseeker/settings" element={<JobSeekerSettings />} />
      
      <Route path="/companyrep/jobposts" element={<Jobposts />} />
      <Route path="/companyrep/dashboard" element={<CompanyRepDashboard />} />
      <Route path="/companyrep/profile" element={<CompanyRepProfile />} />
      <Route path="/companyrep/settings" element={<CompanyRepSettings />} />

    </Routes>
  );
}

export default App;
