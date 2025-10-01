import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import CompanyRepSideNav from '../../components/CompanyRepSideNav';
import './Applications.css';

const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB' },
    background: { default: '#F8F9FA', paper: '#FFFFFF' },
  }
});

const StatusBadge = ({ status }) => {
  const color = status === 'Interview' ? '#10B981' : status === 'Under Review' ? '#B57E00' : '#C42323';
  return (
    <span className="status-badge" style={{ background: '#F3F4F6', color }}>{status}</span>
  );
};

const applicationsData = [
  { id: 1, title: 'Software Engineer', company: 'Tech Innovators Inc.', date: '2024-07-15', status: 'Interview' },
  { id: 2, title: 'Data Analyst', company: 'Global Solutions Ltd.', date: '2024-07-20', status: 'Under Review' },
  { id: 3, title: 'UX Designer', company: 'Creative Minds Corp.', date: '2024-07-25', status: 'Rejected' },
  { id: 4, title: 'Frontend Engineer', company: 'Bright Apps LLC', date: '2024-08-01', status: 'Under Review' },
  { id: 5, title: 'Backend Engineer', company: 'ServerWorks', date: '2024-08-05', status: 'Interview' },
  { id: 6, title: 'Product Designer', company: 'Design Studio', date: '2024-08-10', status: 'Rejected' },
  // Additional mock rows to illustrate "view all"
];

export default function Applications() {
  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <div className="applications-page">
        <CompanyRepSideNav />
        <div className="applications-content">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1">All Applications</Typography>
            <Typography variant="body1" color="text.secondary">A centralized list of all applications received.</Typography>
          </Box>

          <Paper sx={{ width: '100%', overflow: 'hidden' }} className="applications-paper">
            <TableContainer>
              <Table aria-label="all applications table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>JOB TITLE</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>COMPANY</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DATE APPLIED</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicationsData.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{row.title}</TableCell>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell><StatusBadge status={row.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box sx={{ mt: 3 }}>
            <RouterLink to="/companyrep/dashboard">← Back to dashboard</RouterLink>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
