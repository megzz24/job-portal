import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SchoolIcon from "@mui/icons-material/School";
import JobSeekerSideNav from "../../components/JobSeekerSideNav";
import apiClient from "../../apiClient"; // Axios instance

const theme = createTheme({
  palette: { primary: { main: "#2563EB" }, background: { default: "#F8F9FA" } },
});

export default function JobSeekerProfile() {
  const [profile, setProfile] = useState({ skills: [], skills_names: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const API_BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    apiClient
      .get("users/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = () => {
    const updatePayload = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      field_name: profile.field_name,
      location: profile.location,
      about: profile.about,
      experience: profile.experience,
      education: profile.education,
      skills: profile.skills.map((s) => s.id ?? s),
    };

    apiClient
      .patch("users/profile/", updatePayload)
      .then((res) => {
        setProfile(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Save error:", err.response?.data || err.message);
      });
  };

  if (!profile) return <div>Loading...</div>;

  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await apiClient.patch("users/profile/avatar/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        profile_picture: res.data.profile_picture,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await apiClient.patch("users/profile/resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // only update resume, don’t overwrite full profile
      setProfile((prev) => ({ ...prev, resume: res.data.resume }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="dashboard-container">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
        <JobSeekerSideNav className={menuOpen ? "open" : ""} />
        <div className="dashboard-content">
          <Container maxWidth="lg" sx={{ py: 4, ml: 1 }}>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 2, textAlign: "center" }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={
                        profile.profile_picture
                          ? `${API_BASE_URL}${profile.profile_picture}`
                          : ""
                      }
                      sx={{ width: 120, height: 120, mb: 2, mx: "auto" }}
                    >
                      {profile.first_name?.[0]}
                    </Avatar>

                    {!isEditing && (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          id="avatar-upload"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleAvatarUpload(e.target.files[0])
                          }
                        />
                        <label
                          htmlFor="avatar-upload"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            borderRadius: "50%",
                            padding: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <CameraAltIcon
                            style={{ color: "white", fontSize: 20 }}
                          />
                        </label>
                      </>
                    )}
                  </Box>

                  {/* Name, Field, Location */}
                  {isEditing ? (
                    <Stack spacing={1} sx={{ alignItems: "center", mt: 1 }}>
                      {/* Row 1: First + Last Name */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ width: "100%", maxWidth: 300 }}
                      >
                        <TextField
                          fullWidth
                          size="small"
                          label="First Name"
                          value={profile.first_name || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              first_name: e.target.value,
                            })
                          }
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="Last Name"
                          value={profile.last_name || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </Stack>

                      {/* Row 2: Field */}
                      <TextField
                        fullWidth
                        size="small"
                        label="Field"
                        value={profile.field_name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, field_name: e.target.value })
                        }
                        sx={{ maxWidth: 300 }}
                      />

                      {/* Row 3: Location */}
                      <TextField
                        fullWidth
                        size="small"
                        label="Location"
                        value={profile.location || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, location: e.target.value })
                        }
                        sx={{ maxWidth: 300 }}
                      />
                    </Stack>
                  ) : (
                    <>
                      <Typography variant="h5">
                        {profile.first_name} {profile.last_name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {profile.field_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profile.location}
                      </Typography>
                    </>
                  )}

                  {/* Edit Button */}
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </Paper>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={8}>
                <Stack spacing={4}>
                  {/* Resume Section */}
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Resume
                    </Typography>

                    {profile.resume ? (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Current Resume:{" "}
                        <a
                          href={`${API_BASE_URL}${profile.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        No resume uploaded yet
                      </Typography>
                    )}

                    {!isEditing && (
                      <>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          style={{ display: "none" }}
                          id="resumeUpload"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleResumeUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="resumeUpload">
                          <Button variant="outlined" component="span">
                            Upload Resume
                          </Button>
                        </label>
                      </>
                    )}
                  </Paper>

                  {/* About */}
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="h6">About</Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={profile.about || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, about: e.target.value })
                        }
                      />
                    ) : (
                      <Typography variant="body1">{profile.about}</Typography>
                    )}
                  </Paper>

                  {/* Experience */}
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Experience</Typography>
                      {isEditing && (
                        <Button
                          size="small"
                          onClick={() =>
                            setProfile({
                              ...profile,
                              experience: [
                                ...(profile.experience || []),
                                { company: "", role: "", years: "" },
                              ],
                            })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </Box>

                    <Stack spacing={2}>
                      {profile.experience?.map((exp, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <WorkIcon color="primary" />
                          {isEditing ? (
                            <>
                              <TextField
                                label="Role"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = [...profile.experience];
                                  updated[idx].role = e.target.value;
                                  setProfile({
                                    ...profile,
                                    experience: updated,
                                  });
                                }}
                              />
                              <TextField
                                label="Company"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = [...profile.experience];
                                  updated[idx].company = e.target.value;
                                  setProfile({
                                    ...profile,
                                    experience: updated,
                                  });
                                }}
                              />
                              <TextField
                                label="Years"
                                value={exp.years}
                                onChange={(e) => {
                                  const updated = [...profile.experience];
                                  updated[idx].years = e.target.value;
                                  setProfile({
                                    ...profile,
                                    experience: updated,
                                  });
                                }}
                              />
                              <Button
                                color="error"
                                onClick={() => {
                                  const updated = profile.experience.filter(
                                    (_, i) => i !== idx
                                  );
                                  setProfile({
                                    ...profile,
                                    experience: updated,
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            <Box>
                              <Typography variant="subtitle1">
                                {exp.role}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {exp.company} • {exp.years}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* Education */}
                  {/* Education Section */}
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Education</Typography>
                      {isEditing && (
                        <Button
                          size="small"
                          onClick={() =>
                            setProfile({
                              ...profile,
                              education: [
                                ...(profile.education || []),
                                { degree: "", institution: "", year: "" },
                              ],
                            })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </Box>

                    <Stack spacing={2}>
                      {profile.education?.map((edu, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <SchoolIcon color="primary" />
                          {isEditing ? (
                            <>
                              <TextField
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => {
                                  const updated = [...profile.education];
                                  updated[idx].degree = e.target.value;
                                  setProfile({
                                    ...profile,
                                    education: updated,
                                  });
                                }}
                              />
                              <TextField
                                label="Institution"
                                value={edu.institution}
                                onChange={(e) => {
                                  const updated = [...profile.education];
                                  updated[idx].institution = e.target.value;
                                  setProfile({
                                    ...profile,
                                    education: updated,
                                  });
                                }}
                              />
                              <TextField
                                label="Year"
                                value={edu.year}
                                onChange={(e) => {
                                  const updated = [...profile.education];
                                  updated[idx].year = e.target.value;
                                  setProfile({
                                    ...profile,
                                    education: updated,
                                  });
                                }}
                              />
                              <Button
                                color="error"
                                onClick={() => {
                                  const updated = profile.education.filter(
                                    (_, i) => i !== idx
                                  );
                                  setProfile({
                                    ...profile,
                                    education: updated,
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            <Box>
                              <Typography variant="subtitle1">
                                {edu.degree}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {edu.institution} • {edu.year}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* Skills */}
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Skills</Typography>
                      {isEditing && (
                        <TextField
                          size="small"
                          placeholder="Add skill"
                          onKeyDown={async (e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              const skillName = e.target.value.trim();
                              try {
                                const res = await apiClient.post(
                                  "jobs/skills/",
                                  { name: skillName }
                                );
                                const newSkill = res.data; // { id, name }

                                setProfile({
                                  ...profile,
                                  skills: [
                                    ...(profile.skills || []),
                                    newSkill.id,
                                  ],
                                  skill_names: [
                                    ...(profile.skill_names || []),
                                    newSkill.name,
                                  ],
                                });

                                e.target.value = "";
                              } catch (err) {
                                console.error(err);
                              }
                            }
                          }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                    >
                      {profile.skill_names?.map((skillName, idx) => (
                        <Chip
                          key={idx}
                          label={skillName}
                          onDelete={
                            isEditing
                              ? () => {
                                  const updatedIds = profile.skills.filter(
                                    (_, i) => i !== idx
                                  );
                                  const updatedNames =
                                    profile.skill_names.filter(
                                      (_, i) => i !== idx
                                    );

                                  setProfile({
                                    ...profile,
                                    skills: updatedIds,
                                    skill_names: updatedNames,
                                  });
                                }
                              : undefined
                          }
                          sx={{ bgcolor: "#EFF6FF", color: "#2563EB" }}
                        />
                      ))}
                    </Box>
                  </Paper>

                  {/* Save Button */}
                  {isEditing && (
                    <Button variant="contained" onClick={handleSave}>
                      Save Profile
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
