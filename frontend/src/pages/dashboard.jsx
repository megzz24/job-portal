import * as React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha, styled } from '@mui/material/styles';

// --- Icons for Stats and Status ---
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';


// --- Styled Components for AppBar ---
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.grey[500], 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1.2, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
  },
}));

// --- ResponsiveAppBar Component ---
const pages = ['Home', 'Jobs', 'Companies', 'Applications'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState('Home');

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleCloseNavMenu = (page) => {
    if (typeof page === 'string') {
        setActivePage(page);
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddCircleOutlineIcon sx={{ color: 'primary.main', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'inherit',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CareerConnect
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'inherit',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CareerConnect
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ 
                    my: 2, 
                    color: 'text.secondary', 
                    display: 'block',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1rem',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: activePage === page ? '60%' : '0',
                        height: '2px',
                        bottom: '6px',
                        left: '20%',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover:after': {
                        width: '60%',
                    }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper><SearchIcon sx={{ color: 'text.secondary' }} /></SearchIconWrapper>
              <StyledInputBase placeholder="Search for jobs, companies, etc." />
            </Search>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Sarah" src="https://placehold.co/40x40/E9D5FF/7F56D9?text=S" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
  const styles = {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '16px',
      fontWeight: 500,
      fontSize: '0.8rem',
    },
    icon: {
      fontSize: '1rem',
      marginRight: '4px',
    },
    interview: {
      backgroundColor: '#E6F7F0',
      color: '#0D824B',
    },
    'under-review': {
      backgroundColor: '#FFF8E6',
      color: '#B57E00',
    },
    rejected: {
      backgroundColor: '#FDEBEB',
      color: '#C42323',
    },
  };
  const statusKey = status.toLowerCase().replace(' ', '-');
  const icons = {
    interview: <CheckCircleIcon sx={styles.icon} />,
    'under-review': <HourglassTopIcon sx={styles.icon} />,
    rejected: <CancelIcon sx={styles.icon} />,
  };
  return (
    <Box sx={{...styles.base, ...styles[statusKey]}}>
      {icons[statusKey]}
      {status}
    </Box>
  );
};


// --- Dashboard Page ---

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

const statsData = [
    { title: 'Total Applications', value: '12', icon: <BusinessCenterIcon color="primary"/>, iconBg: '#DBEAFE' },
    { title: 'Under Review', value: '5', icon: <HourglassTopIcon sx={{color: '#F59E0B'}} />, iconBg: '#FEF3C7' },
    { title: 'Interviews', value: '3', icon: <CheckCircleIcon sx={{color: '#10B981'}} />, iconBg: '#D1FAE5' },
    { title: 'Offers', value: '1', icon: <EmojiEventsIcon sx={{color: '#6366F1'}}/>, iconBg: '#E0E7FF' }
];

const applicationsData = [
    { title: 'Software Engineer', company: 'Tech Innovators Inc.', date: '2024-07-15', status: 'Interview' },
    { title: 'Data Analyst', company: 'Global Solutions Ltd.', date: '2024-07-20', status: 'Under Review' },
    { title: 'UX Designer', company: 'Creative Minds Corp.', date: '2024-07-25', status: 'Rejected' },
]

export default function Dashboard() {
  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default'}}>
        <ResponsiveAppBar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">Welcome, Sarah!</Typography>
            <Typography variant="body1" color="text.secondary">Here's an overview of your job search activity.</Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', border: 'none', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <Avatar sx={{ bgcolor: stat.iconBg, width: 48, height: 48, mr: 2 }}>
                        {stat.icon}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                    </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">Your Applications</Typography>
                <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>View all applications</Link>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>JOB TITLE</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>COMPANY</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>DATE APPLIED</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applicationsData.map((row) => (
                      <TableRow 
                        key={row.title} 
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: 'action.hover' }
                        }}
                      >
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
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

