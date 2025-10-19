import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import "./SideNav.css";

const JobSeekerSideNav = ({ className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Optional: call backend logout API here
    navigate("/signin");
  };

  // Collapse / Expand state persisted in localStorage
  const [collapsed, setCollapsed] = React.useState(() => {
    try {
      return localStorage.getItem("sidenavCollapsed") === "true";
    } catch (e) {
      return false;
    }
  });

  React.useEffect(() => {
    const cls = "sidenav-collapsed";
    if (collapsed) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
    try {
      localStorage.setItem("sidenavCollapsed", collapsed ? "true" : "false");
    } catch (e) {}
  }, [collapsed]);

  const toggleCollapsed = (e) => {
    e.preventDefault();
    setCollapsed((prev) => !prev);
  };

  const navItems = [
    { to: "/jobseeker/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/jobseeker/jobs", icon: "search", label: "Find Jobs" },
    { to: "/jobseeker/profile", icon: "person", label: "Profile" },
    { to: "/jobseeker/settings", icon: "settings", label: "Settings" },
  ];

  return (
    <nav className={`side-nav ${className}`}>
      <div className="logo-container">
        <div className="logo-left">
          <h1 className="logo-text">{collapsed ? "CC" : "CareerConnect"}</h1>
        </div>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-footer">
        <button className="nav-logout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>

      {/* Floating edge toggle */}
      <button
        className="nav-edge-toggle"
        onClick={toggleCollapsed}
        aria-pressed={collapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="material-symbols-outlined">
          {collapsed ? "chevron_right" : "chevron_left"}
        </span>
      </button>
    </nav>
  );
};

export default JobSeekerSideNav;
