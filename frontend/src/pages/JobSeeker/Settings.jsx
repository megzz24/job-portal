import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Button from '@mui/material/Button';
import JobSeekerSideNav from '../../components/JobSeekerSideNav';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const sections = [
  {
    title: 'Profile Settings',
    icon: <PersonIcon />,
    items: [
      {
        title: 'Profile Visibility',
        description: 'Make your profile visible to employers',
        type: 'switch',
        defaultValue: true,
      },
      {
        title: 'Resume Privacy',
        description: 'Allow employers to download your resume',
        type: 'switch',
        defaultValue: true,
      },
    ],
  },
  {
    title: 'Notification Settings',
    icon: <NotificationsIcon />,
    items: [
      {
        title: 'Job Alerts',
        description: 'Receive notifications for new job matches',
        type: 'switch',
        defaultValue: true,
      },
      {
        title: 'Application Updates',
        description: 'Get notified about your application status',
        type: 'switch',
        defaultValue: true,
      },
      {
        title: 'Email Notifications',
        description: 'Receive updates via email',
        type: 'switch',
        defaultValue: true,
      },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: <SecurityIcon />,
    items: [
      {
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security',
        type: 'button',
        buttonText: 'Enable 2FA',
      },
      {
        title: 'Change Password',
        description: 'Update your account password',
        type: 'button',
        buttonText: 'Change',
      },
    ],
  },
  {
    title: 'Account Visibility',
    icon: <VisibilityIcon />,
    items: [
      {
        title: 'Profile Searchability',
        description: 'Allow employers to find you in searches',
        type: 'switch',
        defaultValue: true,
      },
    ],
  },
];

export default function JobSeekerSettings() {
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
          <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>Settings</Typography>
          
          {sections.map((section, index) => (
            <Paper key={section.title} sx={{ mb: 3, overflow: 'hidden' }}>
              <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                {section.icon}
                <Typography variant="h6">{section.title}</Typography>
              </Box>
              <Divider />
              <List>
                {section.items.map((item, itemIndex) => (
                  <ListItem key={item.title}>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontWeight: 500,
                      }}
                    />
                    <ListItemSecondaryAction>
                      {item.type === 'switch' ? (
                        <Switch defaultChecked={item.defaultValue} color="primary" />
                      ) : (
                        <Button variant="outlined" size="small">
                          {item.buttonText}
                        </Button>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
          
          {/* Danger Zone */}
          <Paper sx={{ mt: 4, bgcolor: '#FEF2F2' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" color="error">
                Danger Zone
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
              >
                Delete Account
              </Button>
            </Box>
          </Paper>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}