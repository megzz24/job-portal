import React, { useState } from "react";
import "./Jobposts.css";
import Modal from "../../components/Modal";
import JobPostForm from "../../components/JobPostForm";
import CompanyRepSideNav from '../../components/CompanyRepSideNav';
// import ResponsiveAppBar from '../../components/ResponsiveAppBar'; // Removed in favor of vertical navigation
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// --- Theme Configuration ---
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, color: "#111827" },
    h5: { fontWeight: 600, color: "#111827" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// --- Mock Data ---
const jobsData = [
  { id: 1, title: "Software Engineer", status: "Active", applicantCount: 12 },
  { id: 2, title: "Product Manager", status: "Active", applicantCount: 8 },
  { id: 3, title: "UX Designer", status: "Closed", applicantCount: 25 },
  { id: 4, title: "Data Analyst", status: "Active", applicantCount: 15 },
  {
    id: 5,
    title: "Marketing Specialist",
    status: "Closed",
    applicantCount: 30,
  },
];

const applicantsData = {
  1: [
    { name: "Ethan Harper", date: "2024-01-15", status: "New" },
    { name: "Olivia Bennett", date: "2024-01-16", status: "Reviewed" },
    { name: "Noah Carter", date: "2024-01-17", status: "Interviewed" },
    { name: "Ava Mitchell", date: "2024-01-18", status: "New" },
    { name: "Liam Foster", date: "2024-01-19", status: "Reviewed" },
    { name: "Isabella Reed", date: "2024-01-20", status: "New" },
  ],
  2: [{ name: "Jane Doe", date: "2024-02-01", status: "New" }],
  3: [{ name: "John Smith", date: "2024-02-05", status: "Reviewed" }],
  4: [{ name: "Emily White", date: "2024-02-10", status: "Interviewed" }],
  5: [{ name: "Michael Brown", date: "2024-02-15", status: "New" }],
};

// --- Helper Components ---
const JobCard = ({ job, onSelect }) => (
  <div className="job-card" onClick={() => onSelect(job)}>
    <div className="job-card-header">
      <div className="job-card-info">
        <div className="job-icon-wrapper">
          <span className="material-symbols-outlined job-icon">work</span>
        </div>
        <div>
          <p className="job-title">{job.title}</p>
          <div className="job-status">
            <span className={`status-dot ${job.status.toLowerCase()}`}></span>
            <p className="status-text">{job.status}</p>
          </div>
        </div>
      </div>
      <div className="job-card-applicants">
        <p className="applicant-count">{job.applicantCount}</p>
        <p className="applicant-label">Applicants</p>
      </div>
    </div>
  </div>
);

// using shared CompanyRepSideNav for consistent collapse/expand behavior

const JobListings = ({ onJobSelect, onNewJob }) => (
  <div className="job-portal-app">
    <SideNav />
    <div className="main-content-wrapper">
      <div className="main-content">
        <header className="main-header">
          <h1 className="header-title">My Jobs</h1>
          <button className="new-job-btn" onClick={onNewJob}>
            <span className="material-symbols-outlined">add</span>
            <span className="new-job-btn-text">New Job</span>
          </button>
        </header>
        <main className="job-grid-container">
          <div className="job-grid">
            {jobsData.map((job) => (
              <JobCard key={job.id} job={job} onSelect={onJobSelect} />
            ))}
          </div>
        </main>
      </div>
    </div>
  </div>
);

const ApplicantList = ({ job, onBack }) => {
  const applicants = applicantsData[job.id] || [];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "status-new";
      case "reviewed":
        return "status-reviewed";
      case "interviewed":
        return "status-interviewed";
      default:
        return "";
    }
  };

  return (
    <div className="applicant-view-container">
      <header className="applicant-header">
        <div className="applicant-header-inner">
          <div className="header-nav">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="back-link"
            >
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
              <span className="back-link-text">Back to Job Dashboard</span>
            </a>
            <h1 className="applicant-header-title">Applicants</h1>
            <div className="header-actions">
              <button className="filter-btn">
                <span className="material-symbols-outlined">filter_list</span>
                <span>Filter</span>
              </button>
              <button className="mobile-search-btn">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="more-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="applicant-main">
        <div className="job-details-header">
          <h2 className="job-title-large">{job.title}</h2>
          <p className="job-description-subtle">
            This page lists all applicants for the selected job from your
            dashboard.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="applicant-table-container">
          <table className="applicant-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={index}>
                  <td>{applicant.name}</td>
                  <td>{applicant.date}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        applicant.status
                      )}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="resume-btn">Resume</button>
                      <button className="more-btn">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="applicant-list-mobile">
          {applicants.map((applicant, index) => (
            <div key={index} className="applicant-card-mobile">
              <div className="applicant-info">
                <p className="applicant-name">{applicant.name}</p>
                <p className="applicant-date">Applied on {applicant.date}</p>
                <span
                  className={`status-badge ${getStatusClass(applicant.status)}`}
                >
                  {applicant.status}
                </span>
              </div>
              <div className="action-buttons">
                <button className="resume-btn">Resume</button>
                <button className="more-btn">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- Main App Component ---
function Jobposts() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleJobSelect = (job) => setSelectedJob(job);
  const handleBack = () => setSelectedJob(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="careerconnect-app">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
  <CompanyRepSideNav className={menuOpen ? "open" : ""} />
        {selectedJob ? (
          <div className="main-content-wrapper">
            <div className="main-content">
              <ApplicantList job={selectedJob} onBack={handleBack} />
            </div>
          </div>
        ) : (
          <div className="main-content-wrapper">
            <div className="main-content">
              <header className="main-header">
                <h1 className="header-title">My Jobs</h1>
                <button className="new-job-btn" onClick={openModal}>
                  <span className="material-symbols-outlined">add</span>
                  <span className="new-job-btn-text">New Job</span>
                </button>
              </header>
              <main className="job-grid-container">
                <div className="job-grid">
                  {jobsData.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSelect={handleJobSelect}
                    />
                  ))}
                </div>
              </main>
            </div>
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <JobPostForm />
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default Jobposts;
