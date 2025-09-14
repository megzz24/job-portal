import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Added
import "./index.css";
import SignUp from "./pages/signup.jsx";
import App from "./App.jsx";
//import SignUp from "./pages/SignUp.jsx";   // ✅ Added
import SignIn from "./pages/SignIn.jsx";   // ✅ Fixed case
import Dashboard from "./pages/dashboard.jsx";
import JobFinder from "./pages/JobFinder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/jobs" element={<JobFinder/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
