import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Link,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import {
  Group as GroupIcon,
  CalendarToday as CalendarTodayIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import apiClient from "../../apiClient";
import CompanyRepSideNav from "../../components/CompanyRepSideNav";

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
});

export default function CompanyRepProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rep, setRep] = useState({
    name: "",
    department: "",
    profile_picture: null,
    user: {},
  });
  const [company, setCompany] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    industry: "",
    company_size: "",
    founded_date: "",
    email: "",
    phone_number: "",
    linkedin: "",
    logo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, repRes] = await Promise.all([
          apiClient.get("/users/company/info/"),
          apiClient.get("/users/companyrep/profile/"),
        ]);
        setCompany(companyRes.data);
        setRep(repRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCompanyChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files?.length > 0) {
      setCompany((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRepChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture" && files?.length > 0) {
      setRep((prev) => ({ ...prev, profile_picture: files[0] }));
    } else if (["first_name", "last_name"].includes(name)) {
      setRep((prev) => ({
        ...prev,
        user: { ...prev.user, [name]: value },
      }));
    } else {
      setRep((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const companyData = new FormData();
      Object.entries(company).forEach(([key, value]) => {
        if (!value) return;
        if (key === "logo") {
          if (value instanceof File) companyData.append("logo", value);
        } else if (typeof value !== "object") {
          companyData.append(key, value);
        }
      });

      const repData = new FormData();
      if (rep.profile_picture instanceof File) {
        repData.append("profile_picture", rep.profile_picture);
      }
      repData.append("first_name", rep.user?.first_name || "");
      repData.append("last_name", rep.user?.last_name || "");
      repData.append("department", rep.department || "");

      const [companyRes, repRes] = await Promise.all([
        apiClient.put("/users/company/update/", companyData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        apiClient.put("/users/companyrep/update/", repData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      ]);

      setCompany(companyRes.data);
      setRep(repRes.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Failed to update company or rep info");
    }
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
        <div className="main-content-wrapper">
          <div className="main-content">
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Grid container spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={4}>
                  <Stack spacing={3}>
                    {/* Company Card */}
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        textAlign: "center",
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 120,
                            height: 120,
                            bgcolor: "#E9D5FF",
                            color: "#7F56D9",
                          }}
                          src={
                            company.logo
                              ? typeof company.logo === "string"
                                ? company.logo
                                : URL.createObjectURL(company.logo)
                              : ""
                          }
                        >
                          {company.name?.charAt(0) || "C"}
                        </Avatar>
                        {isEditing && (
                          <Button
                            variant="contained"
                            component="label"
                            size="small"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              minWidth: 0,
                              width: 32,
                              height: 32,
                              p: 0,
                              borderRadius: "50%",
                            }}
                          >
                            <input
                              type="file"
                              name="logo"
                              hidden
                              onChange={handleCompanyChange}
                            />
                            <PhotoCameraIcon sx={{ fontSize: 18 }} />
                          </Button>
                        )}
                      </Box>

                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        {isEditing ? (
                          <TextField
                            name="name"
                            value={company.name}
                            onChange={handleCompanyChange}
                            variant="standard"
                            sx={{ maxWidth: 220, mx: "auto" }}
                          />
                        ) : (
                          company.name || "Company Name"
                        )}
                      </Typography>

                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                        mt={1}
                      >
                        <LocationOnIcon color="action" fontSize="small" />
                        {isEditing ? (
                          <TextField
                            name="location"
                            value={company.location}
                            onChange={handleCompanyChange}
                            variant="standard"
                            sx={{ maxWidth: 200 }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {company.location || "Location"}
                          </Typography>
                        )}
                      </Box>

                      <Divider sx={{ my: 3 }} />

                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{ width: "100%", borderRadius: 2 }}
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                      >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </Card>

                    {/* Rep Card */}
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        textAlign: "center",
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            bgcolor: "#D1FAE5",
                            color: "#059669",
                          }}
                          src={
                            rep.profile_picture
                              ? typeof rep.profile_picture === "string"
                                ? rep.profile_picture
                                : URL.createObjectURL(rep.profile_picture)
                              : ""
                          }
                        >
                          {rep.name?.charAt(0).toUpperCase() || "N"}
                        </Avatar>
                        {isEditing && (
                          <Button
                            variant="contained"
                            component="label"
                            size="small"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              minWidth: 0,
                              width: 28,
                              height: 28,
                              p: 0,
                              borderRadius: "50%",
                            }}
                          >
                            <input
                              type="file"
                              name="profile_picture"
                              hidden
                              onChange={handleRepChange}
                            />
                            <PhotoCameraIcon sx={{ fontSize: 16 }} />
                          </Button>
                        )}
                      </Box>

                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {isEditing ? (
                          <>
                            <TextField
                              name="first_name"
                              label="First Name"
                              value={rep.user?.first_name || ""}
                              onChange={handleRepChange}
                              variant="standard"
                              sx={{ maxWidth: 180, mx: "auto", mb: 1 }}
                            />
                            <TextField
                              name="last_name"
                              label="Last Name"
                              value={rep.user?.last_name || ""}
                              onChange={handleRepChange}
                              variant="standard"
                              sx={{ maxWidth: 180, mx: "auto" }}
                            />
                          </>
                        ) : rep.user?.first_name && rep.user?.last_name ? (
                          `${rep.user.first_name} ${rep.user.last_name}`
                        ) : (
                          "N/A"
                        )}
                      </Typography>

                      <Stack spacing={1} mt={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon color="primary" />
                          <Typography variant="body2">
                            {rep.user?.email || "N/A"}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <BusinessIcon color="primary" />
                          {isEditing ? (
                            <TextField
                              name="department"
                              value={rep.department || ""}
                              onChange={handleRepChange}
                              variant="standard"
                              sx={{ maxWidth: 180 }}
                            />
                          ) : (
                            <Typography variant="body2">
                              {rep.department || "N/A"}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Card>
                  </Stack>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={8}>
                  <Stack spacing={4}>
                    {/* About */}
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          About Company
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {isEditing ? (
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            name="description"
                            value={company.description || ""}
                            onChange={handleCompanyChange}
                          />
                        ) : (
                          <Typography variant="body1" color="text.secondary">
                            {company.description ||
                              "Add a description about your company."}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>

                    {/* Company Details */}
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Company Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={2}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <GroupIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                name="industry"
                                value={company.industry || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : (
                              <Typography variant="body2">
                                {company.industry || "Industry"}
                              </Typography>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <CalendarTodayIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                type="date"
                                name="founded_date"
                                value={company.founded_date || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : (
                              <Typography variant="body2">
                                Since {company.founded_date || "N/A"}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Contact Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={2}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <EmailIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                name="email"
                                value={company.email || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : (
                              <Typography variant="body2">
                                {company.email || "N/A"}
                              </Typography>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <PhoneIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                name="phone_number"
                                value={company.phone_number || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : (
                              <Typography variant="body2">
                                {company.phone_number || "N/A"}
                              </Typography>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LanguageIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                name="website"
                                value={company.website || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : (
                              <Link
                                href={company.website}
                                target="_blank"
                                underline="hover"
                              >
                                {company.website || "Website"}
                              </Link>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LinkedInIcon color="action" />
                            {isEditing ? (
                              <TextField
                                fullWidth
                                name="linkedin"
                                value={company.linkedin || ""}
                                onChange={handleCompanyChange}
                              />
                            ) : company.linkedin ? (
                              <Link
                                href={company.linkedin}
                                target="_blank"
                                underline="hover"
                              >
                                {company.linkedin}
                              </Link>
                            ) : (
                              <Typography variant="body2">N/A</Typography>
                            )}
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
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
