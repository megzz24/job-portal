import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";
import "./Dashboard.css";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusMap = {
    Review: { label: "Review", color: "#B57E00", bg: "#FFF8E6" },
    Interviewing: { label: "Interviewing", color: "#2563EB", bg: "#DBEAFE" },
    Pending: { label: "Pending", color: "#6B7280", bg: "#F3F4F6" },
    Rejected: { label: "Rejected", color: "#DC2626", bg: "#FEE2E2" },
  };

  const config = statusMap[status] || statusMap.Pending;

  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
};

// Main Dashboard Component
export default function CompanyRepDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const applicationActivityData = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "Innovate Inc.",
      dateApplied: "2 hours ago",
      status: "Review",
    },
    {
      id: 2,
      jobTitle: "UX/UI Designer",
      company: "Creative Solutions",
      dateApplied: "Yesterday",
      status: "Interviewing",
    },
    {
      id: 3,
      jobTitle: "Data Scientist",
      company: "DataDriven Co.",
      dateApplied: "5 days ago",
      status: "Pending",
    },
    {
      id: 4,
      jobTitle: "Product Manager",
      company: "Productive Plc",
      dateApplied: "March 14, 2024",
      status: "Rejected",
    },
  ];

  const statsData = [
    { label: "Total Job Posts", value: "25" },
    { label: "Active Listings", value: "12", highlight: true },
    { label: "Total Applicants", value: "1,234" },
    { label: "Hires", value: "15", highlight: true },
  ];

  const urgentActions = [
    { icon: "📋", text: "Review 5 new applications" },
    { icon: "📅", text: "Schedule interview with C. Lee" },
    { icon: "💬", text: "Reply to 3 messages" },
  ];

  return (
    <div className="companyrep-dashboard">
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="material-symbols-outlined">
          {menuOpen ? "close" : "menu"}
        </span>
      </button>
      <CompanyRepSideNav className={menuOpen ? "open" : ""} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Company Representative</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn-primary" onClick={() => navigate("/companyrep/jobposts")}>
              Post a New Job
            </button>
            <button className="btn-secondary" onClick={() => navigate("/companyrep/applications")}>
              View All Applications
            </button>
          </div>
        </div>

        <div className="dashboard-content-wrapper">
          <div className="dashboard-left">
            {/* Application Activity Section */}
            <section className="activity-section">
              <h2 className="section-title">Application Activity</h2>
              <div className="table-container">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationActivityData.map((app) => (
                      <tr key={app.id}>
                        <td className="job-title-cell">{app.jobTitle}</td>
                        <td>{app.company}</td>
                        <td>{app.dateApplied}</td>
                        <td>
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Stats Grid */}
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <div key={index} className="stat-card">
                  <p className="stat-label">{stat.label}</p>
                  <p className={`stat-value ${stat.highlight ? "highlight" : ""}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Actions Sidebar */}
          <aside className="urgent-actions">
            <h3 className="urgent-title">Urgent Actions</h3>
            <ul className="urgent-list">
              {urgentActions.map((action, index) => (
                <li key={index} className="urgent-item">
                  <span className="urgent-icon">{action.icon}</span>
                  <span className="urgent-text">{action.text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
