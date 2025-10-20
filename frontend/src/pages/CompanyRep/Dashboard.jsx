import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";
import apiClient from "../../apiClient"; // ✅ use axios wrapper
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Dashboard.css";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    const statusKey = status?.toLowerCase().replace(" ", "-");
    switch (statusKey) {
      case "interview":
        return { bg: "#E6F7F0", color: "#0D824B", icon: CheckCircleIcon };
      case "review":
      case "under-review":
        return { bg: "#FFF8E6", color: "#B57E00", icon: HourglassTopIcon };
      case "accepted":
      case "offer":
        return { bg: "#E0E7FF", color: "#6366F1", icon: EmojiEventsIcon };
      case "rejected":
        return { bg: "#FDEBEB", color: "#C42323", icon: CancelIcon };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", icon: HourglassTopIcon };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      className="status-badge"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        backgroundColor: config.bg,
        color: config.color,
        padding: "0.2rem 0.6rem",
        borderRadius: "0.25rem",
        fontWeight: 500,
      }}
    >
      <Icon fontSize="small" />
      {status}
    </span>
  );
};

// Main Dashboard Component
export default function CompanyRepDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsData, setStatsData] = useState([
    { label: "Total Job Posts", value: "0" },
    { label: "Active Listings", value: "0", highlight: true },
    { label: "Total Applicants", value: "0" },
    { label: "Hires", value: "0", highlight: true },
  ]);
  const [applicationActivityData, setApplicationActivityData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Summary
        const summaryRes = await apiClient.get("/jobs/summary/");
        const summary = summaryRes.data;

        setStatsData([
          { label: "Total Job Posts", value: summary.total_jobs },
          {
            label: "Active Listings",
            value: summary.active_listings,
            highlight: true,
          },
          { label: "Total Applications", value: summary.total_applications },
          { label: "Hires", value: summary.total_hires, highlight: true },
        ]);

        // 2. Applications
        const appsRes = await apiClient.get("/jobs/applications/");
        const apps = appsRes.data;

        // Transform backend apps into table format
        const formattedApps = apps.map((app) => ({
          id: app.id,
          jobId: app.job?.id, // ✅ needed for navigation
          jobTitle: app.job?.title || "N/A",
          jobStatus: app.job?.is_open ? "Open" : "Closed",
          name:
            app.jobseeker?.first_name || app.jobseeker?.last_name
              ? `${app.jobseeker.first_name || ""} ${
                  app.jobseeker.last_name || ""
                }`.trim()
              : "N/A",
          dateApplied: new Date(app.applied_at).toLocaleDateString(),
          status: app.status,
        }));

        setApplicationActivityData(formattedApps.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

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
          </div>
          <div className="dashboard-actions">
            <button
              className="btn-primary"
              onClick={() =>
                navigate("/companyrep/jobposts", {
                  state: { openNewJobModal: true },
                })
              }
            >
              Post a New Job
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/companyrep/applications")}
            >
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
                      <th>Applicant Name</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationActivityData.length > 0 ? (
                      applicationActivityData.map((app) => (
                        <tr
                          key={app.id}
                          hover
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              `/companyrep/jobposts/${app.jobId}/applicants`
                            )
                          }
                        >
                          <td className="job-title-cell">
                            {app.jobTitle}{" "}
                            <span
                              style={{
                                color:
                                  app.jobStatus === "Open"
                                    ? "#16A34A"
                                    : "#DC2626",
                                fontWeight: "600",
                              }}
                            >
                              ({app.jobStatus})
                            </span>
                          </td>
                          <td>{app.name}</td>
                          <td>{app.dateApplied}</td>
                          <td>
                            <StatusBadge status={app.status} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={{ textAlign: "center", padding: "1rem" }}
                        >
                          No applications yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Stats Grid */}
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <div key={index} className="stat-card">
                  <p className="stat-label">{stat.label}</p>
                  <p
                    className={`stat-value ${
                      stat.highlight ? "highlight" : ""
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
