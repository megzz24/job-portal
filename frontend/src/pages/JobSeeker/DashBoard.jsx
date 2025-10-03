import React, { useState, useEffect } from "react";
import apiClient from "../../apiClient"; // 👈 import your apiClient
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import JobSeekerSideNav from "../../components/JobSeekerSideNav";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";

// Icons
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";

// Status Badge
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    const statusKey = status.toLowerCase().replace(" ", "-");
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
  const IconComponent = config.icon;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "16px",
        fontWeight: 500,
        fontSize: "0.8rem",
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      <IconComponent sx={{ fontSize: "1rem", marginRight: "4px" }} />
      {status}
    </Box>
  );
};

// Theme
const modernTheme = createTheme({
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
});

// Main Dashboard
export default function JobSeekerDashboard() {
  const [summary, setSummary] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const goToApplications = () => navigate("/jobseeker/applications");
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, applicationsRes] = await Promise.all([
          apiClient.get("jobs/summary/"),
          apiClient.get("jobs/applications/"),
        ]);
        setSummary(summaryRes.data);
        setApplications(applicationsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const res = await apiClient.get("jobs/recommended/"); // your endpoint
        setRecommendedJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch recommended jobs:", err);
      }
    };
    fetchRecommendedJobs();
  }, []);

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  }

  const statsData = [
    {
      title: "Total Applications",
      value: summary?.total_applications || 0,
      iconComponent: BusinessCenterIcon,
      iconColor: "primary",
      iconBg: "#DBEAFE",
    },
    {
      title: "Under Review",
      value: summary?.under_review || 0,
      iconComponent: HourglassTopIcon,
      iconColor: "#F59E0B",
      iconBg: "#FEF3C7",
    },
    {
      title: "Interviews",
      value: summary?.interviews || 0,
      iconComponent: CheckCircleIcon,
      iconColor: "#10B981",
      iconBg: "#D1FAE5",
    },
    {
      title: "Offers",
      value: summary?.offers || 0,
      iconComponent: EmojiEventsIcon,
      iconColor: "#6366F1",
      iconBg: "#E0E7FF",
    },
    {
      title: "Rejected",
      value: summary?.reject || 0, // Add this field in your backend summary too
      iconComponent: CancelIcon,
      iconColor: "#C42323",
      iconBg: "#FDEBEB",
    },
  ];

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <div className="dashboard-container">
        {/* Side Nav */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
        <JobSeekerSideNav className={menuOpen ? "open" : ""} />

        <div className="dashboard-content">
          {/* Welcome */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">
              Welcome
              {summary?.jobseeker_name ? `, ${summary.jobseeker_name}` : ""}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's an overview of your job search activity.
            </Typography>
          </Box>

          {/* Stats */}
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            sx={{ mb: 4 }}
          >
            {statsData.map((stat, index) => {
              const IconComponent = stat.iconComponent;
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper variant="outlined" className="stat-card">
                    <Avatar
                      sx={{
                        bgcolor: stat.iconBg,
                        mr: 2,
                        width: 56,
                        height: 56,
                        boxShadow: 2,
                      }}
                    >
                      <IconComponent
                        sx={{
                          color:
                            stat.iconColor === "primary"
                              ? "primary.main"
                              : stat.iconColor,
                          fontSize: 32,
                        }}
                      />
                    </Avatar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="h5">{stat.value}</Typography>
                      <Typography variant="body2">{stat.title}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Applications */}
          <Box sx={{ ml: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                mt: 5,
              }}
            >
              <Typography variant="h5" component="h2">
                Your Applications
              </Typography>
              <Link
                component="button"
                onClick={goToApplications}
                underline="hover"
                sx={{ fontWeight: 500, mr: 5 }}
              >
                View all applications
              </Link>
            </Box>
            <Paper sx={{ width: "97%", overflow: "hidden" }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>JOB TITLE</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>COMPANY</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        DATE APPLIED
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.length > 0 ? (
                      applications.slice(0, 4).map(
                        (
                          row,
                          index // show only first 5
                        ) => (
                          <TableRow key={row.id || index}>
                            <TableCell sx={{ fontWeight: 500 }}>
                              {row.job.title}
                            </TableCell>
                            <TableCell>{row.job.company.name}</TableCell>
                            <TableCell>
                              {new Date(row.applied_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={row.status} />
                            </TableCell>
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* Recommended Jobs */}
          <Box sx={{ ml: 1, mt: 6 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Recommended Jobs
            </Typography>

            {recommendedJobs.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 1,
                  "&::-webkit-scrollbar": { height: 6 },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#9CA3AF",
                    borderRadius: 3,
                  },
                }}
              >
                {recommendedJobs.slice(0, 10).map((job) => (
                  <Paper
                    key={job.id}
                    sx={{
                      minWidth: 250, // 👈 ensures horizontal card layout
                      maxWidth: 320,
                      flexShrink: 0,
                      p: 3,
                      borderRadius: 2,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/jobseeker/jobs`, { state: { jobId: job.id } })
                    } // 👈 pass jobId
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ bgcolor: "#b8e6fe", mr: 2, color:"#00a6f4" }}>
                        {job.company.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.company.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      {job.skills?.map((skill, idx) => (
                        <Box
                          key={idx}
                          component="span"
                          sx={{
                            display: "inline-block",
                            mr: 1,
                            mb: 1,
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "#fccee8",
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#00000",
                          }}
                        >
                          {skill}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No recommended jobs found
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
