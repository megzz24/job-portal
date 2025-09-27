// App.jsx
import { Routes, Route } from "react-router-dom";
import JobSeekerSignUp from "../src/pages/JobSeeker/SignUp";
import CompanyRepSignUp from "../src/pages/CompanyRep/Signup";
import SignIn from "./pages/signin";
import JobSeekerDashboard from "./pages/JobSeeker/DashBoard";
import CompanyRepDashboard from "./pages/CompanyRep/DashBoard";
import JobFinder from "./pages/JobSeeker/JobFinder";
import Landing from "./pages/Landing";
import Jobposts from "./pages/CompanyRep/Jobposts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
      <Route path="/companyrep/signup" element={<CompanyRepSignUp />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
      <Route path="/jobs" element={<JobFinder />} />
      
      <Route path="/companyrep/jobposts" element={<Jobposts />} />

      <Route path="/companyrep/dashboard" element={<CompanyRepDashboard />} />

    </Routes>
  );
}

export default App;
