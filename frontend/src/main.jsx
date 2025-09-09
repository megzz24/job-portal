import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Added
import "./index.css";
import SignUp from "./pages/signup.jsx";
import App from "./App.jsx";
//import SignUp from "./pages/SignUp.jsx";   // ✅ Added
import SignIn from "./pages/SignIn.jsx";   // ✅ Fixed case

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
