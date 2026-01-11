import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stack,
  IconButton,
  CircularProgress,
  Avatar,
  Paper
} from '@mui/material';
import {
  Notifications,
  AccountCircle,
  Palette,
  Storage,
  Backup,
  Restore,
  ExpandMore,
  Info,
  Warning,
  CheckCircle,
  Error,
  Refresh,
  Download,
  Share,
  FilterList,
  Security
} from '@mui/icons-material';

const Settings = ({ themeMode, onThemeModeChange }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [language, setLanguage] = useState('en');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (type) => (event) => {
    setNotifications({
      ...notifications,
      [type]: event.target.checked,
    });
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account, preferences, and system configurations.
        </Typography>
      </Box>

      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Account" />
          <Tab label="Notifications" />
          <Tab label="Appearance" />
          <Tab label="Security" />
          <Tab label="Data" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Profile Information"
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><AccountCircle /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <TextField fullWidth label="Full Name" defaultValue="John Doe" variant="outlined" />
                  <TextField fullWidth label="Email" defaultValue="john.doe@example.com" variant="outlined" />
                  <TextField fullWidth label="Phone" defaultValue="+1 (555) 123-4567" variant="outlined" />
                  <FormControl fullWidth>
                    <InputLabel>Time Zone</InputLabel>
                    <Select defaultValue="EST" label="Time Zone">
                      <MenuItem value="EST">Eastern Standard Time</MenuItem>
                      <MenuItem value="CST">Central Standard Time</MenuItem>
                      <MenuItem value="PST">Pacific Standard Time</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" fullWidth>Update Profile</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Farm Details"
                avatar={<Avatar sx={{ bgcolor: 'success.main' }}><CheckCircle /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <TextField fullWidth label="Farm Name" defaultValue="Green Valley Farms" />
                  <TextField fullWidth label="Location" defaultValue="Iowa, USA" />
                  <TextField fullWidth label="Farm Size" defaultValue="500 acres" />
                  <FormControl fullWidth>
                    <InputLabel>Primary Crop</InputLabel>
                    <Select defaultValue="corn" label="Primary Crop">
                      <MenuItem value="corn">Corn</MenuItem>
                      <MenuItem value="wheat">Wheat</MenuItem>
                      <MenuItem value="soybeans">Soybeans</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" fullWidth>Save Farm Details</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Notification Preferences" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><Notifications /></Avatar>} />
              <Divider />
              <CardContent>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Configure how you want to receive alerts and updates.
                </Alert>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Channels</Typography>
                    <Stack spacing={1}>
                      <FormControlLabel control={<Switch checked={notifications.email} onChange={handleNotificationChange('email')} />} label="Email Notifications" />
                      <FormControlLabel control={<Switch checked={notifications.push} onChange={handleNotificationChange('push')} />} label="Push Notifications" />
                      <FormControlLabel control={<Switch checked={notifications.sms} onChange={handleNotificationChange('sms')} />} label="SMS Alerts" />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Subscription Types</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Warning color="warning" /></ListItemIcon>
                        <ListItemText primary="Pest Alerts" secondary="Immediate" />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                        <ListItemText primary="Yield Reports" secondary="Weekly" />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Error color="error" /></ListItemIcon>
                        <ListItemText primary="Weather Warnings" secondary="Immediate" />
                        <Switch defaultChecked />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Appearance" avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Palette /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel>Theme Mode</InputLabel>
                    <Select
                      value={themeMode || 'light'}
                      label="Theme Mode"
                      onChange={(e) => onThemeModeChange(e.target.value)}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained">Apply Preferences</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Placeholders for Security and Data tabs */}
      {tabValue > 2 && (
        <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography color="text.secondary">Advanced settings available in Admin Mode.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Settings;
