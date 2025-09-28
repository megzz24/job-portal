import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import JobSeekerSideNav from '../../components/JobSeekerSideNav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'];

export default function JobSeekerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="dashboard-container">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
        <JobSeekerSideNav className={menuOpen ? 'open' : ''} />
        <div className="dashboard-content">
          <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column - Profile Info */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mb: 2, bgcolor: '#E9D5FF', color: '#7F56D9' }}
                  >
                    S
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    Sarah Johnson
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Full Stack Developer
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    San Francisco, CA
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mt: 3 }}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Edit Profile
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
                    About
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue="Full stack developer with 5 years of experience in building scalable web applications. Passionate about creating user-friendly interfaces and optimizing application performance."
                    />
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      Full stack developer with 5 years of experience in building scalable web applications. Passionate about creating user-friendly interfaces and optimizing application performance.
                    </Typography>
                  )}
                </Paper>

                {/* Experience Section */}
                <Paper elevation={0}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Experience</Typography>
                    {isEditing && (
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Stack spacing={3}>
                    <Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <WorkIcon color="primary" />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Senior Developer
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tech Solutions Inc. • 2020 - Present
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <WorkIcon color="primary" />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Software Developer
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Global Innovations Ltd. • 2018 - 2020
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>

                {/* Education Section */}
                <Paper elevation={0}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Education</Typography>
                    {isEditing && (
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <SchoolIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Bachelor of Science in Computer Science
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        University of California • 2014 - 2018
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Skills Section */}
                <Paper elevation={0}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Skills</Typography>
                    {isEditing && (
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          bgcolor: '#EFF6FF',
                          color: '#2563EB',
                          '&:hover': {
                            bgcolor: '#DBEAFE',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}