import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Jobposts.css";
import Modal from "../../components/Modal";
import JobPostForm from "../../components/JobPostForm";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import apiClient from "../../apiClient";
import JobEditForm from "../../components/JobEditForm";

// --- Theme configuration ---
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563EB" },
    background: { default: "#F8F9FA", paper: "#FFFFFF" },
    text: { primary: "#1F2937", secondary: "#6B7280" },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, color: "#111827" },
    h5: { fontWeight: 600, color: "#111827" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});

import { Select, MenuItem, Box } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";

const statusConfigs = {
  applied: { bg: "#F3F4F6", color: "#6B7280", icon: HourglassTopIcon },
  review: { bg: "#FFF8E6", color: "#B57E00", icon: HourglassTopIcon },
  interview: { bg: "#E6F7F0", color: "#0D824B", icon: CheckCircleIcon },
  accepted: { bg: "#E0E7FF", color: "#6366F1", icon: EmojiEventsIcon },
  rejected: { bg: "#FDEBEB", color: "#C42323", icon: CancelIcon },
};

const StatusDropdown = ({ status, onChange }) => {
  const config = statusConfigs[status] || statusConfigs.applied;
  const IconComponent = config.icon;

  return (
    <Select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: config.bg,
          color: config.color,
          borderRadius: "16px",
          padding: "4px 12px",
          fontWeight: 500,
          fontSize: "0.8rem",
        },
        "& fieldset": { border: "none" },
      }}
    >
      {Object.keys(statusConfigs).map((key) => {
        const option = statusConfigs[key];
        const OptionIcon = option.icon;
        return (
          <MenuItem key={key} value={key}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: option.color,
              }}
            >
              <OptionIcon sx={{ fontSize: "1rem" }} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Box>
          </MenuItem>
        );
      })}
    </Select>
  );
};

// --- Job Card Component ---
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
            <span
              className={`status-dot ${job.is_open ? "active" : "closed"}`}
            ></span>
            <p className="status-text">{job.is_open ? "Active" : "Closed"}</p>
          </div>
        </div>
      </div>
      <div className="job-card-applicants">
        <p className="applicant-count">{job.applications_count || 0}</p>
        <p className="applicant-label">Applicants</p>
      </div>
    </div>
  </div>
);

// --- Applicant List Component ---
const ApplicantList = ({ job, onBack, updateJobStatus, removeJob }) => {
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [jobStatus, setJobStatus] = useState(job.is_open);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await apiClient.get(`/jobs/${job.id}/`);
        setJobDetails(jobRes.data);

        const res = await apiClient.get(
          `/jobs/company/jobs/${job.id}/applicants/`
        );
        setApplicants(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [job.id]);

  const toggleJobStatus = async () => {
    try {
      const endpoint = `/jobs/company/jobs/${job.id}/${
        jobStatus ? "close" : "reopen"
      }/`;
      await apiClient.post(endpoint);
      setJobStatus(!jobStatus);
      updateJobStatus(job.id, !jobStatus);
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  const handleDeleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await apiClient.delete(`/jobs/company/jobs/${job.id}/delete/`);
      removeJob(job.id); // ✅ update parent immediately
      alert("Job deleted successfully");
      onBack();
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job");
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await apiClient.post(
        `/jobs/applications/${applicationId}/update-status/`,
        { status: newStatus }
      );
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="applicant-view-container">
      <header className="applicant-header">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="back-link"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
          <span className="back-link-text">Back to Job Dashboard</span>
        </a>
        <h1 className="applicant-header-title">Applicants</h1>
      </header>

      <main className="applicant-main">
        <div className="job-details-header">
          <div>
            <h2 className="job-title-large">{jobDetails?.title}</h2>
            <p className="job-meta">
              📍 {jobDetails?.location} | 💼 {jobDetails?.job_type} | 💲
              {jobDetails?.salary_range || "N/A"}
            </p>
            <p className="job-description">{jobDetails?.description}</p>
          </div>
          <div className="job-actions">
            <button
              className={`close-job-btn ${jobStatus ? "open" : "closed"}`}
              onClick={toggleJobStatus}
            >
              {jobStatus ? "Close Job" : "Reopen Job"}
            </button>

            <button className="delete-job-btn" onClick={handleDeleteJob}>
              <span className="material-symbols-outlined">delete</span>
            </button>

            <button className="edit-job-btn" onClick={openEditModal}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>

        <div className="applicant-table-container">
          <table className="applicant-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Resume</th>
                <th>Cover Letter</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => {
                const fullName =
                  applicant.jobseeker?.first_name ||
                  applicant.jobseeker?.last_name
                    ? `${applicant.jobseeker.first_name || ""} ${
                        applicant.jobseeker.last_name || ""
                      }`.trim()
                    : null;
                const email = applicant.jobseeker?.email || "Unknown";

                return (
                  <tr key={applicant.id}>
                    <td>{fullName || "N/A"}</td>
                    <td>{email}</td> {/* Contact Email */}
                    <td>
                      {new Date(applicant.applied_at).toLocaleDateString()}
                    </td>
                    <td>
                      <StatusDropdown
                        status={applicant.status}
                        onChange={(newStatus) =>
                          handleStatusChange(applicant.id, newStatus)
                        }
                      />
                    </td>
                    <td>
                      {applicant.resume && (
                        <a
                          href={`http://localhost:8000${applicant.resume}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button className="resume-btn">Resume</button>
                        </a>
                      )}
                    </td>
                    <td className="cover-letter-cell">
                      {applicant.cover_letter || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isEditModalOpen && (
          <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
            <JobEditForm
              jobId={job.id}
              onClose={closeEditModal}
              updateJob={(updatedJob) => {
                setJobDetails(updatedJob); // update local display immediately
                if (updateJobStatus)
                  updateJobStatus(updatedJob.id, updatedJob.is_open);
              }}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};

// --- Main Jobposts Component ---
export default function Jobposts() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { jobId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openNewJobModal) {
      setIsModalOpen(true);
    }
  }, [location.state]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobId && jobs.length) {
      const job = jobs.find((j) => j.id.toString() === jobId.toString());
      if (job) setSelectedJob(job);
    }
  }, [jobId, jobs]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const fetchJobs = async () => {
    try {
      const res = await apiClient.get("/jobs/company/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleJobSelect = (job) => setSelectedJob(job);
  const handleBack = () => setSelectedJob(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updateJobStatus = (jobId, isOpen) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, is_open: isOpen } : job
      )
    );
  };

  const removeJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

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
          <ApplicantList
            job={selectedJob}
            onBack={handleBack}
            updateJobStatus={updateJobStatus}
            removeJob={removeJob}
            updateJob={updateJob} // ✅ new
          />
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
                  {jobs.map((job) => (
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
          <JobPostForm refreshJobs={fetchJobs} onClose={closeModal} />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
