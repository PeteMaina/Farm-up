import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useTheme,
  alpha,
  Tooltip,
  Zoom
} from '@mui/material';
import {
  Agriculture,
  Analytics,
  WaterDrop,
  Grass,
  TrendingUp,
  Security,
  Cloud,
  Smartphone,
  Logout,
  Dashboard as DashboardIcon,
  Assessment,
  Timeline,
  Map,
  Science,
  ShoppingCart,
  People,
  BarChart,
  PieChart,
  ShowChart,
  Nature,
  WbSunny,
  Opacity,
  LocalFlorist,
  BugReport,
  Warning,
  CheckCircle,
  Error,
  Info,
  Settings,
  Help,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useNotification } from '../context/NotificationContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { showNotification } = useNotification();

  // Helper to determine active state
  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (location.pathname === path) return true;
    return false;
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', badge: null },
    { text: 'Crop Analytics', icon: <Analytics />, path: '/crop-analytics', badge: '3' },
    { text: 'Soil Management', icon: <Grass />, path: '/soil-management', badge: null },
    { text: 'Irrigation Control', icon: <WaterDrop />, path: '/irrigation-control', badge: 'New' },
    { text: 'Fertilizer Planner', icon: <Science />, path: '/fertilizer-planner', badge: null },
    { text: 'Yield Prediction', icon: <TrendingUp />, path: '/yield-prediction', badge: null },
    { text: 'Weather Insights', icon: <WbSunny />, path: '/weather-insights', badge: null },
    { text: 'Pest Control', icon: <BugReport />, path: '/pest-control', badge: null },
    { text: 'Market Prices', icon: <BarChart />, path: '/market-prices', badge: null },
    { text: 'Farm Equipment', icon: <Agriculture />, path: '/farm-equipment', badge: null },
    { text: 'Labor Management', icon: <People />, path: '/labor-management', badge: null },
    { text: 'Financial Reports', icon: <Assessment />, path: '/financial-reports', badge: null },
    { text: 'IoT Sensors', icon: <Smartphone />, path: '/iot-sensors', badge: null },
    { text: 'Field Mapping', icon: <Map />, path: '/field-mapping', badge: null },
    { text: 'Sustainability', icon: <Nature />, path: '/sustainability', badge: null },
    { text: 'Settings', icon: <Settings />, path: '/settings', badge: null },
    { text: 'Help & Support', icon: <Help />, path: '/help-support', badge: null },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        backdropFilter: 'blur(10px)',
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `4px 0 20px ${alpha(theme.palette.common.black, 0.02)}`
      }}
    >
      {/* Header Profile Section */}
      <Box sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: `radial-gradient(circle at 50% -20%, ${alpha(theme.palette.primary.main, 0.2)}, transparent 70%)`,
            zIndex: 0
          }}
        />
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 2,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            border: `4px solid ${theme.palette.background.paper}`,
            zIndex: 1,
            position: 'relative'
          }}
        >
          <Agriculture sx={{ fontSize: 36 }} />
        </Avatar>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
          Agrowise
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
          Pro Platform
        </Typography>
      </Box>

      {/* Navigation List */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pb: 2, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.primary.main, 0.2), borderRadius: '4px' } }}>
        <List disablePadding>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={item.text} placement="right" arrow TransitionComponent={Zoom} disableHoverListener={true}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      px: 2,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      color: active ? 'primary.main' : 'text.secondary',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: active
                          ? alpha(theme.palette.primary.main, 0.15)
                          : alpha(theme.palette.text.primary, 0.04),
                        transform: 'translateX(4px)',
                        '& .icon-root': {
                          transform: 'scale(1.1) rotate(5deg)',
                          color: active ? 'primary.main' : 'text.primary',
                        }
                      },
                      '&::before': active ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        height: '70%',
                        width: '4px',
                        backgroundColor: 'primary.main',
                        borderRadius: '0 4px 4px 0',
                      } : {}
                    }}
                  >
                    <ListItemIcon
                      className="icon-root"
                      sx={{
                        minWidth: 40,
                        color: active ? 'primary.main' : 'inherit',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                      }}
                    >
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color="error"
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}
                        >
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: active ? 700 : 500,
                        sx: { transition: 'font-weight 0.2s' }
                      }}
                    />
                    {active && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          boxShadow: `0 0 8px ${theme.palette.primary.main}`
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Section */}
      <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Button
          fullWidth
          variant="outlined"
          color="error" // Use error color for sign out to be distinct but subtle outline
          startIcon={<Logout />}
          onClick={() => {
            showNotification('Signed out successfully', 'success');
            navigate('/');
          }}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: alpha(theme.palette.error.main, 0.3),
            color: 'error.main',
            '&:hover': {
              borderColor: 'error.main',
              bgcolor: alpha(theme.palette.error.main, 0.05)
            }
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
