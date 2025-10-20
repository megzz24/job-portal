// App.jsx
import { Routes, Route } from "react-router-dom";
import JobSeekerSignUp from "../src/pages/JobSeeker/SignUp";
import CompanyRepSignUp from "../src/pages/CompanyRep/SignUp";
import SignIn from "./pages/signin";
import JobSeekerDashboard from "./pages/JobSeeker/DashBoard";
import CompanyRepDashboard from "./pages/CompanyRep/Dashboard";
import JobFinder from "./pages/JobSeeker/JobFinder";
import Landing from "./pages/Landing";
import Jobposts from "./pages/CompanyRep/Jobposts";
import Applications from "./pages/CompanyRep/Applications";
import JobSeekerApplications from "./pages/JobSeeker/Applications";
import JobSeekerProfile from "./pages/JobSeeker/Profile";
import JobSeekerSettings from "./pages/JobSeeker/Settings";
import CompanyRepProfile from "./pages/CompanyRep/Profile";
import CompanyRepSettings from "./pages/CompanyRep/Settings";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Global toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
        <Route path="/companyrep/signup" element={<CompanyRepSignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/jobseeker/jobs" element={<JobFinder />} />
        <Route
          path="/jobseeker/applications"
          element={<JobSeekerApplications />}
        />
        <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
        <Route path="/jobseeker/settings" element={<JobSeekerSettings />} />

        <Route path="/companyrep/jobposts" element={<Jobposts />} />
        <Route path="/companyrep/applications" element={<Applications />} />
        <Route path="/companyrep/dashboard" element={<CompanyRepDashboard />} />
        <Route path="/companyrep/profile" element={<CompanyRepProfile />} />
        <Route path="/companyrep/settings" element={<CompanyRepSettings />} />
        <Route
          path="/companyrep/jobposts/:jobId/applicants"
          element={<Jobposts />}
        />
      </Routes>
    </>
  );
}

export default App;
