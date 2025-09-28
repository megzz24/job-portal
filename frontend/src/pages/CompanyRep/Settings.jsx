import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CompanyRepSideNav from '../../components/CompanyRepSideNav';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, color: '#111827' },
    h5: { fontWeight: 600, color: '#111827' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { 
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
});

const SettingsSection = ({ icon: Icon, title, children }) => (
  <Paper elevation={0} sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon sx={{ mr: 2, color: 'primary.main' }} />
      <Typography variant="h6">{title}</Typography>
    </Box>
    {children}
  </Paper>
);

export default function CompanyRepSettings() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    applicationUpdates: true,
    messageNotifications: true,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSecurityChange = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="careerconnect-app">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
        <CompanyRepSideNav className={menuOpen ? 'open' : ''} />
        <div className="main-content-wrapper">
          <div className="main-content">
            <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Settings
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {/* Account Information */}
              <SettingsSection icon={AccountCircleIcon} title="Account Information">
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    defaultValue="Tech Solutions Inc."
                  />
                  <TextField
                    fullWidth
                    label="Company Email"
                    defaultValue="hr@techsolutions.com"
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    defaultValue="+1 (555) 123-4567"
                  />
                  <Button variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Stack>
              </SettingsSection>

              {/* Notifications */}
              <SettingsSection icon={NotificationsIcon} title="Notifications">
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Email Alerts"
                      secondary="Receive alerts about new job applications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={notificationSettings.emailAlerts}
                        onChange={() => handleNotificationChange('emailAlerts')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Application Updates"
                      secondary="Get notified when candidates update their applications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={notificationSettings.applicationUpdates}
                        onChange={() => handleNotificationChange('applicationUpdates')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Message Notifications"
                      secondary="Receive notifications for new messages"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={notificationSettings.messageNotifications}
                        onChange={() => handleNotificationChange('messageNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Marketing Emails"
                      secondary="Receive updates about new features and promotions"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => handleNotificationChange('marketingEmails')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </SettingsSection>

              {/* Security */}
              <SettingsSection icon={SecurityIcon} title="Security">
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security to your account"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={securitySettings.twoFactorAuth}
                        onChange={() => handleSecurityChange('twoFactorAuth')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Login Alerts"
                      secondary="Get notified of new login attempts"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={securitySettings.loginAlerts}
                        onChange={() => handleSecurityChange('loginAlerts')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Change Password"
                      secondary="Update your account password"
                    />
                    <IconButton edge="end">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </SettingsSection>

              {/* Privacy */}
              <SettingsSection icon={PrivacyTipIcon} title="Privacy">
                <List>
                  <ListItem button>
                    <ListItemText
                      primary="Company Profile Visibility"
                      secondary="Manage who can see your company profile"
                    />
                    <IconButton edge="end">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Data Usage"
                      secondary="Manage how your data is used"
                    />
                    <IconButton edge="end">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Download Your Data"
                      secondary="Get a copy of your data"
                    />
                    <IconButton edge="end">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </SettingsSection>
            </Grid>
          </Grid>
            </Container>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}