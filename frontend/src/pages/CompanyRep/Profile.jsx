import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";

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
          padding: 24,
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

export default function CompanyRepProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="main-content-wrapper">
          <div className="main-content">
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Grid container spacing={4}>
                {/* Left Column - Company Info */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={0}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mb: 2,
                          bgcolor: "#E9D5FF",
                          color: "#7F56D9",
                        }}
                      >
                        T
                      </Avatar>
                      <Typography variant="h5" gutterBottom>
                        Tech Solutions Inc.
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        Software Development
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <LocationOnIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          San Francisco, CA
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{ mt: 3 }}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        Edit Company Profile
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Right Column - Details */}
                <Grid item xs={12} md={8}>
                  <Stack spacing={4}>
                    {/* About Section */}
                    <Paper elevation={0}>
                      <Typography variant="h6" gutterBottom>
                        About Company
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          defaultValue="Tech Solutions Inc. is a leading software development company specializing in enterprise solutions and innovative technology consulting. With over 10 years of experience, we've helped numerous organizations transform their digital landscape."
                        />
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          Tech Solutions Inc. is a leading software development
                          company specializing in enterprise solutions and
                          innovative technology consulting. With over 10 years
                          of experience, we've helped numerous organizations
                          transform their digital landscape.
                        </Typography>
                      )}
                    </Paper>

                    {/* Company Details */}
                    <Paper elevation={0}>
                      <Typography variant="h6" gutterBottom>
                        Company Details
                      </Typography>
                      <Stack spacing={2}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <BusinessIcon color="primary" />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Company Size
                            </Typography>
                            <Typography variant="body1">
                              500-1000 employees
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <LanguageIcon color="primary" />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Website
                            </Typography>
                            <Typography
                              variant="body1"
                              component="a"
                              href="#"
                              color="primary"
                            >
                              www.techsolutions.com
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Paper>

                    {/* Office Locations */}
                    <Paper elevation={0}>
                      <Typography variant="h6" gutterBottom>
                        Office Locations
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Headquarters
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            123 Tech Park Avenue, San Francisco, CA 94105
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Branch Office
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            456 Innovation Drive, Austin, TX 78701
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>

                    {/* Key Benefits */}
                    <Paper elevation={0}>
                      <Typography variant="h6" gutterBottom>
                        Key Benefits
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body1">
                            • Competitive salary and comprehensive benefits
                            package
                          </Typography>
                          <Typography variant="body1">
                            • Remote work flexibility
                          </Typography>
                          <Typography variant="body1">
                            • Professional development opportunities
                          </Typography>
                          <Typography variant="body1">
                            • Health and wellness programs
                          </Typography>
                          <Typography variant="body1">
                            • Modern office facilities
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
