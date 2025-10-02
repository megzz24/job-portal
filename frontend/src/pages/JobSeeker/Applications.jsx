import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import JobSeekerSideNav from "../../components/JobSeekerSideNav";
import apiClient from "../../apiClient"; // your configured axios instance
import "./Applications.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";

// ✅ Same theme as dashboard
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

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get("jobs/applications/"); // backend endpoint
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <div className="applications-page">
        <JobSeekerSideNav />
        <div className="applications-content">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1">
              All Applications
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A centralized list of all applications received.
            </Typography>
          </Box>

          {loading ? (
            <Typography>Loading applications...</Typography>
          ) : (
            <Paper
              sx={{ width: "100%", overflow: "hidden" }}
              className="applications-paper"
            >
              <TableContainer>
                <Table aria-label="all applications table">
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
                      applications.map((row) => (
                        <TableRow key={row.id}>
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
                      ))
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
          )}

          <Box sx={{ mt: 3 }}>
            <RouterLink
              to="/jobseeker/dashboard"
              style={{ color: modernTheme.palette.primary.main }}
            >
              ← Back to dashboard
            </RouterLink>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
