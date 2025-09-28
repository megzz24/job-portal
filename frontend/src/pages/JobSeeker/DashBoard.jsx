import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import JobSeekerSideNav from '../../components/JobSeekerSideNav';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';

// Icons for Stats and Status
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';



// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    const statusKey = status.toLowerCase().replace(' ', '-');
    switch (statusKey) {
      case 'interview':
        return {
          bg: '#E6F7F0',
          color: '#0D824B',
          icon: CheckCircleIcon
        };
      case 'under-review':
        return {
          bg: '#FFF8E6',
          color: '#B57E00',
          icon: HourglassTopIcon
        };
      case 'rejected':
        return {
          bg: '#FDEBEB',
          color: '#C42323',
          icon: CancelIcon
        };
      default:
        return {
          bg: '#F3F4F6',
          color: '#6B7280',
          icon: HourglassTopIcon
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '16px',
      fontWeight: 500,
      fontSize: '0.8rem',
      backgroundColor: config.bg,
      color: config.color,
    }}>
      <IconComponent sx={{ fontSize: '1rem', marginRight: '4px' }} />
      {status}
    </Box>
  );
};

// Theme
const modernTheme = createTheme({
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

// Main Dashboard Component
export default function JobSeekerDashboard() {
  const statsData = [
  { 
    title: 'Total Applications', 
    value: '12', 
    iconComponent: BusinessCenterIcon,
    iconColor: 'primary',
    iconBg: '#DBEAFE' 
  },
  { 
    title: 'Under Review', 
    value: '5', 
    iconComponent: HourglassTopIcon,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7' 
  },
  { 
    title: 'Interviews', 
    value: '3', 
    iconComponent: CheckCircleIcon,
    iconColor: '#10B981',
    iconBg: '#D1FAE5' 
  },
  { 
    title: 'Offers', 
    value: '1', 
    iconComponent: EmojiEventsIcon,
    iconColor: '#6366F1',
    iconBg: '#E0E7FF' 
  }
];
  
  const applicationsData = [
    { title: 'Software Engineer', company: 'Tech Innovators Inc.', date: '2024-07-15', status: 'Interview' },
    { title: 'Data Analyst', company: 'Global Solutions Ltd.', date: '2024-07-20', status: 'Under Review' },
    { title: 'UX Designer', company: 'Creative Minds Corp.', date: '2024-07-25', status: 'Rejected' },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <div className="dashboard-container">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
        <JobSeekerSideNav className={menuOpen ? 'open' : ''} />
        <div className="dashboard-content">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">Welcome, Sarah!</Typography>
            <Typography variant="body1" color="text.secondary">Here's an overview of your job search activity.</Typography>
          </Box>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            sx={{ mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}
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
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch', // Ensures all cards in a row have the same height
                  }}
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
                          color: stat.iconColor === 'primary' ? 'primary.main' : stat.iconColor,
                          fontSize: 32,
                        }}
                      />
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="h5" component="p" className="stat-value">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" className="stat-title">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">Your Applications</Typography>
                <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>View all applications</Link>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="applications table">
                  <TableHead>
                    <TableRow className="applications-table-header-row">
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>JOB TITLE</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>COMPANY</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>DATE APPLIED</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applicationsData.map((row, index) => (
                      <TableRow 
                        key={`${row.title}-${index}`} 
                        className="applications-table-row"
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                          {row.title}
                        </TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <StatusBadge status={row.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}