import React from "react";
import { useLocation } from "react-router-dom";
import "./SideNav.css";

const CompanyRepSideNav = ({ className = "" }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

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

  return (
    <nav className={`side-nav ${className}`}>
      <div className="logo-container">
        <div className="logo-left">
          <h1 className="logo-text">{collapsed ? "CC" : "CareerConnect"}</h1>
        </div>
        <div className="logo-actions">
          <button
            className="nav-collapse-toggle"
            onClick={toggleCollapsed}
            aria-pressed={collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="material-symbols-outlined">
              {collapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <a
            href="/companyrep/dashboard"
            className={`nav-link ${
              currentPath === "/companyrep/dashboard" ? "active" : ""
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="nav-label">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="/companyrep/jobposts"
            className={`nav-link ${
              currentPath === "/companyrep/jobposts" ? "active" : ""
            }`}
          >
            <span className="material-symbols-outlined">work</span>
            <span className="nav-label">Job Posts</span>
          </a>
        </li>
        <li>
          <a
            href="/companyrep/profile"
            className={`nav-link ${
              currentPath === "/companyrep/profile" ? "active" : ""
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="nav-label">Profile</span>
          </a>
        </li>
        <li>
          <a
            href="/companyrep/settings"
            className={`nav-link ${
              currentPath === "/companyrep/settings" ? "active" : ""
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="nav-label">Settings</span>
          </a>
        </li>
      </ul>

      <div className="nav-footer">
        <button className="nav-logout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default CompanyRepSideNav;
