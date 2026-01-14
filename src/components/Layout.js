import React, { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Stack,
  TextField,
  InputAdornment,
  Popover,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  Typography,
  Avatar,
  Badge,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  Agriculture,
  Menu as MenuIcon,
  Notifications,
  Settings,
  Help,
  Logout,
  Search,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const drawerWidth = 280;

const Layout = ({ children, activeItem }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [autoIrrigation, setAutoIrrigation] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handlePopoverClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        color="inherit" // Use white background from theme
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Breadcrumbs aria-label="breadcrumb" sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link
                underline="hover"
                color="inherit"
                href="/dashboard"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                App
              </Link>
              <Typography color="text.primary" sx={{ fontWeight: 600 }}>
                {activeItem}
              </Typography>
            </Breadcrumbs>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: 120, sm: 250 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }
              }}
            />

            <Stack direction="row" spacing={1}>
              <Tooltip title="Notifications">
                <IconButton color="inherit" size="large">
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton color="inherit" onClick={handlePopoverClick} size="large">
                  <Settings />
                </IconButton>
              </Tooltip>
            </Stack>

            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                cursor: 'pointer',
                boxShadow: 2
              }}
              onClick={handleMenuClick}
            >
              <Agriculture />
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Help fontSize="small" /></ListItemIcon>
          Help Center
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Settings Popover */}
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" gutterBottom>Quick Settings</Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={<Switch checked={autoIrrigation} onChange={(e) => setAutoIrrigation(e.target.checked)} />}
              label="Auto Irrigation"
            />
            <FormControlLabel control={<Switch defaultChecked />} label="Weather Alerts" />
            <FormControlLabel control={<Switch defaultChecked />} label="Pest Notifications" />
          </Stack>
        </Box>
      </Popover>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar activeItem={activeItem} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: (theme) => `1px solid ${theme.palette.divider}` },
          }}
          open
        >
          <Sidebar activeItem={activeItem} />
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ minHeight: '100%' }}>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
