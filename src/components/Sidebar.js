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
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';

const Sidebar = ({ activeItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: activeItem === 'Dashboard', badge: null },
    { text: 'Crop Analytics', icon: <Analytics />, badge: '3' },
    { text: 'Soil Management', icon: <Grass />, badge: null },
    { text: 'Irrigation Control', icon: <WaterDrop />, badge: 'New' },
    { text: 'Fertilizer Planner', icon: <Science />, badge: null },
    { text: 'Yield Prediction', icon: <TrendingUp />, badge: null },
    { text: 'Weather Insights', icon: <WbSunny />, badge: null },
    { text: 'Pest Control', icon: <BugReport />, badge: null },
    { text: 'Market Prices', icon: <BarChart />, badge: null },
    { text: 'Farm Equipment', icon: <Agriculture />, badge: null },
    { text: 'Labor Management', icon: <People />, badge: null },
    { text: 'Financial Reports', icon: <Assessment />, badge: null },
    { text: 'IoT Sensors', icon: <Smartphone />, badge: null },
    { text: 'Field Mapping', icon: <Map />, badge: null },
    { text: 'Sustainability', icon: <Nature />, badge: null },
    { text: 'Settings', icon: <Settings />, badge: null, path: '/settings' },
    { text: 'Help & Support', icon: <Help />, badge: null, path: '/help-support' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
          <Agriculture sx={{ fontSize: 30 }} />
        </Avatar>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
          AgriAI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Smart Farming Platform
        </Typography>
      </Box>

      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (!item.active) {
                  const path = item.path || `/${item.text.toLowerCase().replace(/\s+/g, '-')}`;
                  navigate(path);
                }
              }}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                backgroundColor: item.active ? 'primary.main' : 'transparent',
                color: item.active ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: item.active ? 'primary.dark' : 'action.hover',
                  cursor: item.active ? 'default' : 'pointer',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.active ? 'white' : 'primary.main', minWidth: 40 }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Logout />}
          onClick={() => navigate('/')}
          sx={{ borderRadius: 3 }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
