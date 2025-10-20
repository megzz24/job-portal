import React, { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";
import apiClient from "../../apiClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Applications.css";

const modernTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563EB" },
    background: { default: "#F8F9FA", paper: "#FFFFFF" },
  },
});

// StatusBadge Component
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

export default function Applications() {
  const [applicationsData, setApplicationsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiClient.get("/jobs/applications/");
        const apps = res.data;

        // Transform data for table display
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

        setApplicationsData(formattedApps);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <div className="applications-page">
        <CompanyRepSideNav />
        <div className="applications-content">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1">
              All Applications
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A centralized list of all applications received.
            </Typography>
          </Box>

          <Paper
            sx={{ width: "100%", overflow: "hidden" }}
            className="applications-paper"
          >
            <TableContainer>
              <Table aria-label="all applications table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>JOB TITLE</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      APPLICANT NAME
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      DATE APPLIED
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicationsData.length > 0 ? (
                    applicationsData.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/companyrep/jobposts/${row.jobId}/applicants`)
                        }
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontWeight: 500 }}
                        >
                          {row.jobTitle}{" "}
                          <span
                            style={{
                              color:
                                row.jobStatus === "Open" ? "#16A34A" : "#DC2626",
                              fontWeight: 600,
                            }}
                          >
                            ({row.jobStatus})
                          </span>
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.dateApplied}</TableCell>
                        <TableCell>
                          <StatusBadge status={row.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        style={{ textAlign: "center", padding: "1rem" }}
                      >
                        No applications yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box sx={{ mt: 3 }}>
            <RouterLink to="/companyrep/dashboard">
              ← Back to dashboard
            </RouterLink>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
