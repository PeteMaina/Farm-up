import React, { useState } from 'react';
import {
  Typography, Box, Grid, Card, CardContent, CardHeader, Button, Tabs, Tab,
  Switch, FormControlLabel, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Accordion, AccordionSummary, AccordionDetails, List, ListItem,
  ListItemText, ListItemIcon, Divider, Stack, Avatar, Chip, Slider,
  RadioGroup, Radio, IconButton, Tooltip, Badge, LinearProgress, Table,
  TableBody, TableCell, TableHead, TableRow, Paper
} from '@mui/material';
import {
  Notifications, AccountCircle, Palette, Storage, Security, ExpandMore,
  CheckCircle, Warning, CloudUpload, Download, Refresh, Delete, Edit,
  Visibility, VisibilityOff, Lock, Key, Smartphone, Language, Schedule,
  People, Public, AttachMoney, MoneyOff, CreditCard, TrendingUp, Backup,
  Restore, SaveAlt, Share, VpnKey, DevicesOther, History, Assessment, GpsFixed
} from '@mui/icons-material';
import { useLocalization } from '../context/LocalizationContext';

const Settings = ({ themeMode, onThemeModeChange }) => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Account Settings
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Farm Manager',
    bio: 'Experienced farm manager specializing in precision agriculture'
  });

  const [farmDetails, setFarmDetails] = useState({
    name: 'Green Valley Farms',
    location: 'Iowa, USA',
    size: '500',
    type: 'organic',
    established: '2010',
    license: 'AG-2010-45678'
  });

  const [subscription, setSubscription] = useState({
    plan: 'professional',
    billing: 'annual',
    nextBilling: '2026-02-15'
  });

  const {
    city, country, continent, currency, units, locale, isSmartDetect,
    updatePreference
  } = useLocalization();

  const [preferences, setPreferences] = useState({
    units: units,
    currency: currency,
    timezone: 'EST',
    language: locale.split('-')[0],
    dateFormat: 'MM/DD/YYYY'
  });

  // Notification Settings
  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    sms: true,
    push: false,
    inApp: true,
    webhook: false
  });

  const [alertCategories, setAlertCategories] = useState({
    weather: { enabled: true, priority: 'high', channels: ['email', 'push'] },
    equipment: { enabled: true, priority: 'medium', channels: ['email'] },
    crop: { enabled: true, priority: 'high', channels: ['email', 'sms'] },
    financial: { enabled: false, priority: 'low', channels: ['email'] },
    labor: { enabled: true, priority: 'medium', channels: ['inApp'] },
    inventory: { enabled: true, priority: 'low', channels: ['inApp'] }
  });

  const [notificationSchedule, setNotificationSchedule] = useState({
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '07:00',
    digestEnabled: true,
    digestFrequency: 'daily',
    digestTime: '08:00'
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    accentColor: '#2E7D32',
    density: 'comfortable',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-US'
  });

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    fontSize: 'medium',
    reduceAnimations: false,
    screenReader: false
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    twoFactorMethod: 'totp',
    passwordRequirements: {
      minLength: 12,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true
    },
    sessionTimeout: 30
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Weather Integration', key: 'sk_live_51H...', created: '2025-12-01', lastUsed: '2026-01-10' },
    { id: 2, name: 'Market Data API', key: 'mk_test_51H...', created: '2025-11-15', lastUsed: '2026-01-09' }
  ]);

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Iowa, USA', ip: '192.168.1.10', current: true, lastActive: 'Now' },
    { id: 2, device: 'Mobile App (iOS)', location: 'Iowa, USA', ip: '192.168.1.25', current: false, lastActive: '2 hours ago' }
  ]);

  // Data Settings
  const [backup, setBackup] = useState({
    autoBackupEnabled: true,
    frequency: 'daily',
    time: '02:00',
    retention: 30,
    lastBackup: '2026-01-11 02:00'
  });

  const [dataExport, setDataExport] = useState({
    format: 'csv',
    includeMedia: true,
    dateRange: 'all'
  });

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'OpenWeather API', status: 'connected', type: 'Weather' },
    { id: 2, name: 'QuickBooks', status: 'disconnected', type: 'Accounting' },
    { id: 3, name: 'John Deere Operations Center', status: 'connected', type: 'Equipment' }
  ]);

  const [storage, setStorage] = useState({
    used: 4.2,
    total: 10,
    breakdown: {
      sensors: 1.5,
      media: 2.1,
      reports: 0.4,
      backups: 0.2
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive system configuration and preferences
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Account" icon={<AccountCircle />} iconPosition="start" />
          <Tab label="Notifications" icon={<Notifications />} iconPosition="start" />
          <Tab label="Appearance" icon={<Palette />} iconPosition="start" />
          <Tab label="Security" icon={<Security />} iconPosition="start" />
          <Tab label="Data" icon={<Storage />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* ACCOUNT TAB */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader
                title="Profile Information"
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><AccountCircle /></Avatar>}
                action={<Button size="small" startIcon={<CloudUpload />}>Upload Photo</Button>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <TextField fullWidth label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  <TextField fullWidth label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <TextField fullWidth label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select value={profile.role} label="Role" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                      <MenuItem value="Farm Manager">Farm Manager</MenuItem>
                      <MenuItem value="Owner">Owner</MenuItem>
                      <MenuItem value="Supervisor">Supervisor</MenuItem>
                      <MenuItem value="Operator">Operator</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="Bio" multiline rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                  <Button variant="contained" fullWidth>Save Profile</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Farm Details */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Farm Details" avatar={<Avatar sx={{ bgcolor: 'success.main' }}><Public /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <TextField fullWidth label="Farm Name" value={farmDetails.name} onChange={(e) => setFarmDetails({ ...farmDetails, name: e.target.value })} />
                  <TextField fullWidth label="Location" value={farmDetails.location} onChange={(e) => setFarmDetails({ ...farmDetails, location: e.target.value })} />
                  <TextField fullWidth label="Farm Size (acres)" value={farmDetails.size} onChange={(e) => setFarmDetails({ ...farmDetails, size: e.target.value })} />
                  <FormControl fullWidth>
                    <InputLabel>Farm Type</InputLabel>
                    <Select value={farmDetails.type} label="Farm Type" onChange={(e) => setFarmDetails({ ...farmDetails, type: e.target.value })}>
                      <MenuItem value="organic">Organic Certified</MenuItem>
                      <MenuItem value="conventional">Conventional</MenuItem>
                      <MenuItem value="transitional">Transitional to Organic</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="Established Year" value={farmDetails.established} onChange={(e) => setFarmDetails({ ...farmDetails, established: e.target.value })} />
                  <TextField fullWidth label="License Number" value={farmDetails.license} onChange={(e) => setFarmDetails({ ...farmDetails, license: e.target.value })} />
                  <Button variant="outlined" fullWidth>Update Farm Info</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Subscription & Billing */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Subscription & Billing" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><CreditCard /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Current Plan</Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <Chip label="Professional" color="primary" />
                      <Typography variant="h6" fontWeight={700}>$49/month</Typography>
                    </Stack>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel>Billing Cycle</InputLabel>
                    <Select value={subscription.billing} label="Billing Cycle" onChange={(e) => setSubscription({ ...subscription, billing: e.target.value })}>
                      <MenuItem value="monthly">Monthly - $49/mo</MenuItem>
                      <MenuItem value="annual">Annual - $490/yr (Save 17%)</MenuItem>
                    </Select>
                  </FormControl>
                  <Alert severity="info">Next billing date: {subscription.nextBilling}</Alert>
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Usage This Month</Typography>
                    <LinearProgress variant="determinate" value={68} sx={{ my: 1, height: 8, borderRadius: 4 }} />
                    <Typography variant="caption">680 / 1000 API calls</Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" fullWidth>Change Plan</Button>
                    <Button variant="contained" fullWidth>Upgrade</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* System Preferences */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="System Preferences" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Language /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControlLabel
                    control={<Switch checked={isSmartDetect} onChange={(e) => updatePreference({ isSmartDetect: e.target.checked })} />}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <GpsFixed fontSize="small" color="primary" />
                        <Typography variant="body1">Global Smart-Detection (IP-based)</Typography>
                      </Stack>
                    }
                    sx={{ mb: 2, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', ml: 0 }}
                  />

                  {isSmartDetect && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Auto-detected: {city}, {country} ({continent})
                    </Alert>
                  )}

                  <FormControl fullWidth>
                    <InputLabel>Unit System</InputLabel>
                    <Select
                      disabled={isSmartDetect}
                      value={isSmartDetect ? units : preferences.units}
                      label="Unit System"
                      onChange={(e) => {
                        const val = e.target.value;
                        setPreferences({ ...preferences, units: val });
                        updatePreference({ units: val });
                      }}
                    >
                      <MenuItem value="imperial">Imperial (acres, °F, mph)</MenuItem>
                      <MenuItem value="metric">Metric (hectares, °C, km/h)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      disabled={isSmartDetect}
                      value={isSmartDetect ? currency : preferences.currency}
                      label="Currency"
                      onChange={(e) => {
                        const val = e.target.value;
                        setPreferences({ ...preferences, currency: val });
                        updatePreference({ currency: val });
                      }}
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                      <MenuItem value="KES">KES (KSh)</MenuItem>
                      <MenuItem value="INR">INR (₹)</MenuItem>
                      <MenuItem value="CAD">CAD ($)</MenuItem>
                      <MenuItem value="AUD">AUD ($)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select value={preferences.timezone} label="Timezone" onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}>
                      <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                      <MenuItem value="CST">Central Time (CST)</MenuItem>
                      <MenuItem value="MST">Mountain Time (MST)</MenuItem>
                      <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select value={preferences.language} label="Language" onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select value={preferences.dateFormat} label="Date Format" onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}>
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" fullWidth>Apply Preferences</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Team Members"
                avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><People /></Avatar>}
                action={<Button size="small" startIcon={<People />}>Invite Member</Button>}
              />
              <Divider />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { name: 'John Doe', email: 'john.doe@example.com', role: 'Owner', status: 'Active' },
                      { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager', status: 'Active' },
                      { name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Operator', status: 'Invited' }
                    ].map((member, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell><Chip label={member.role} size="small" /></TableCell>
                        <TableCell><Chip label={member.status} size="small" color={member.status === 'Active' ? 'success' : 'default'} /></TableCell>
                        <TableCell align="right">
                          <IconButton size="small"><Edit /></IconButton>
                          <IconButton size="small"><Delete /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* NOTIFICATIONS TAB */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {/* Delivery Channels */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Delivery Channels" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><Notifications /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <FormControlLabel control={<Switch checked={notificationChannels.email} onChange={(e) => setNotificationChannels({ ...notificationChannels, email: e.target.checked })} />} label="Email Notifications" />
                  <FormControlLabel control={<Switch checked={notificationChannels.sms} onChange={(e) => setNotificationChannels({ ...notificationChannels, sms: e.target.checked })} />} label="SMS Alerts" />
                  <FormControlLabel control={<Switch checked={notificationChannels.push} onChange={(e) => setNotificationChannels({ ...notificationChannels, push: e.target.checked })} />} label="Push Notifications" />
                  <FormControlLabel control={<Switch checked={notificationChannels.inApp} onChange={(e) => setNotificationChannels({ ...notificationChannels, inApp: e.target.checked })} />} label="In-App Notifications" />
                  <FormControlLabel control={<Switch checked={notificationChannels.webhook} onChange={(e) => setNotificationChannels({ ...notificationChannels, webhook: e.target.checked })} />} label="Webhooks" />
                  {notificationChannels.webhook && (
                    <TextField fullWidth size="small" placeholder="https://your-webhook-url.com/notifications" label="Webhook URL" />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Notification Schedule */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Notification Schedule" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Schedule /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControlLabel
                    control={<Switch checked={notificationSchedule.quietHoursEnabled} onChange={(e) => setNotificationSchedule({ ...notificationSchedule, quietHoursEnabled: e.target.checked })} />}
                    label="Enable Quiet Hours"
                  />
                  {notificationSchedule.quietHoursEnabled && (
                    <Stack direction="row" spacing={2}>
                      <TextField fullWidth type="time" label="Start Time" value={notificationSchedule.quietStart} onChange={(e) => setNotificationSchedule({ ...notificationSchedule, quietStart: e.target.value })} />
                      <TextField fullWidth type="time" label="End Time" value={notificationSchedule.quietEnd} onChange={(e) => setNotificationSchedule({ ...notificationSchedule, quietEnd: e.target.value })} />
                    </Stack>
                  )}
                  <Divider />
                  <FormControlLabel
                    control={<Switch checked={notificationSchedule.digestEnabled} onChange={(e) => setNotificationSchedule({ ...notificationSchedule, digestEnabled: e.target.checked })} />}
                    label="Daily Digest"
                  />
                  {notificationSchedule.digestEnabled && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Frequency</InputLabel>
                        <Select value={notificationSchedule.digestFrequency} label="Frequency" onChange={(e) => setNotificationSchedule({ ...notificationSchedule, digestFrequency: e.target.value })}>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField fullWidth type="time" label="Digest Time" value={notificationSchedule.digestTime} onChange={(e) => setNotificationSchedule({ ...notificationSchedule, digestTime: e.target.value })} />
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Alert Categories */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Alert Categories" subheader="Configure what alerts you receive and how" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  {Object.entries(alertCategories).map(([key, value]) => (
                    <Grid item xs={12} md={6} key={key}>
                      <Card variant="outlined">
                        <CardContent>
                          <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1" fontWeight={600} textTransform="capitalize">{key} Alerts</Typography>
                              <Switch checked={value.enabled} onChange={(e) => setAlertCategories({ ...alertCategories, [key]: { ...value, enabled: e.target.checked } })} />
                            </Stack>
                            {value.enabled && (
                              <>
                                <FormControl fullWidth size="small">
                                  <InputLabel>Priority</InputLabel>
                                  <Select value={value.priority} label="Priority" onChange={(e) => setAlertCategories({ ...alertCategories, [key]: { ...value, priority: e.target.value } })}>
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                  </Select>
                                </FormControl>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Notify via:</Typography>
                                  <Stack direction="row" spacing={1} mt={0.5}>
                                    {value.channels.map(ch => <Chip key={ch} label={ch} size="small" />)}
                                  </Stack>
                                </Box>
                              </>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={3}>
                  <Button variant="contained" fullWidth>Save Notification Preferences</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Test Notification */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Test Notifications" />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Send a test notification to verify your settings
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" fullWidth startIcon={<Notifications />}>Send Email Test</Button>
                  <Button variant="outlined" fullWidth startIcon={<Smartphone />}>Send SMS Test</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* APPEARANCE TAB */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          {/* Theme Settings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Theme Settings" avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Palette /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Theme Mode</InputLabel>
                    <Select value={themeMode || 'light'} label="Theme Mode" onChange={(e) => onThemeModeChange(e.target.value)}>
                      <MenuItem value="light">Light Mode</MenuItem>
                      <MenuItem value="dark">Dark Mode</MenuItem>
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Accent Color</Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      {['#2E7D32', '#0288D1', '#F57C00', '#7B1FA2', '#D32F2F'].map(color => (
                        <Box
                          key={color}
                          sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: color, cursor: 'pointer', border: appearance.accentColor === color ? '3px solid' : 'none', borderColor: 'primary.main' }}
                          onClick={() => setAppearance({ ...appearance, accentColor: color })}
                        />
                      ))}
                    </Stack>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel>Display Density</InputLabel>
                    <Select value={appearance.density} label="Display Density" onChange={(e) => setAppearance({ ...appearance, density: e.target.value })}>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="comfortable">Comfortable</MenuItem>
                      <MenuItem value="spacious">Spacious</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Localization */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Localization" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Language /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select value={preferences.language} label="Language" onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="de">Deutsch</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select value={appearance.dateFormat} label="Date Format" onChange={(e) => setAppearance({ ...appearance, dateFormat: e.target.value })}>
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY (US)</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (EU)</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Time Format</InputLabel>
                    <Select value={appearance.timeFormat} label="Time Format" onChange={(e) => setAppearance({ ...appearance, timeFormat: e.target.value })}>
                      <MenuItem value="12h">12-hour (3:30 PM)</MenuItem>
                      <MenuItem value="24h">24-hour (15:30)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Number Format</InputLabel>
                    <Select value={appearance.numberFormat} label="Number Format" onChange={(e) => setAppearance({ ...appearance, numberFormat: e.target.value })}>
                      <MenuItem value="en-US">1,234.56 (US)</MenuItem>
                      <MenuItem value="de-DE">1.234,56 (EU)</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Accessibility */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Accessibility" avatar={<Avatar sx={{ bgcolor: 'success.main' }}><Visibility /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <FormControlLabel control={<Switch checked={accessibility.highContrast} onChange={(e) => setAccessibility({ ...accessibility, highContrast: e.target.checked })} />} label="High Contrast Mode" />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Font Size</Typography>
                    <RadioGroup value={accessibility.fontSize} onChange={(e) => setAccessibility({ ...accessibility, fontSize: e.target.value })}>
                      <FormControlLabel value="small" control={<Radio />} label="Small" />
                      <FormControlLabel value="medium" control={<Radio />} label="Medium (Default)" />
                      <FormControlLabel value="large" control={<Radio />} label="Large" />
                      <FormControlLabel value="xlarge" control={<Radio />} label="Extra Large" />
                    </RadioGroup>
                  </Box>
                  <FormControlLabel control={<Switch checked={accessibility.reduceAnimations} onChange={(e) => setAccessibility({ ...accessibility, reduceAnimations: e.target.checked })} />} label="Reduce Animations" />
                  <FormControlLabel control={<Switch checked={accessibility.screenReader} onChange={(e) => setAccessibility({ ...accessibility, screenReader: e.target.checked })} />} label="Screen Reader Optimizations" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Dashboard Preferences */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Dashboard Preferences" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><Assessment /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Default Dashboard View</InputLabel>
                    <Select defaultValue="overview">
                      <MenuItem value="overview">Overview</MenuItem>
                      <MenuItem value="analytics">Analytics Focus</MenuItem>
                      <MenuItem value="operations">Operations Focus</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Chart Style</InputLabel>
                    <Select defaultValue="modern">
                      <MenuItem value="modern">Modern</MenuItem>
                      <MenuItem value="classic">Classic</MenuItem>
                      <MenuItem value="minimal">Minimal</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Data Refresh Rate</InputLabel>
                    <Select defaultValue="5">
                      <MenuItem value="3">Every 3 seconds</MenuItem>
                      <MenuItem value="5">Every 5 seconds</MenuItem>
                      <MenuItem value="10">Every 10 seconds</MenuItem>
                      <MenuItem value="30">Every 30 seconds</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" fullWidth>Apply Settings</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* SECURITY TAB */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          {/* Password & Authentication */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Password & Authentication" avatar={<Avatar sx={{ bgcolor: 'error.main' }}><Lock /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <TextField fullWidth type={showPassword ? 'text' : 'password'} label="Current Password" InputProps={{
                    endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                  }} />
                  <TextField fullWidth type="password" label="New Password" />
                  <TextField fullWidth type="password" label="Confirm New Password" />
                  <Button variant="contained" fullWidth>Change Password</Button>
                  <Divider />
                  <FormControlLabel
                    control={<Switch checked={security.twoFactorEnabled} onChange={(e) => setSecurity({ ...security, twoFactorEnabled: e.target.checked })} />}
                    label="Enable Two-Factor Authentication (2FA)"
                  />
                  {security.twoFactorEnabled && (
                    <FormControl fullWidth>
                      <InputLabel>2FA Method</InputLabel>
                      <Select value={security.twoFactorMethod} label="2FA Method" onChange={(e) => setSecurity({ ...security, twoFactorMethod: e.target.value })}>
                        <MenuItem value="totp">Authenticator App (TOTP)</MenuItem>
                        <MenuItem value="sms">SMS Code</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Password Requirements */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Password Requirements" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><Security /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Minimum Length</Typography>
                    <Slider value={security.passwordRequirements.minLength} onChange={(e, val) => setSecurity({ ...security, passwordRequirements: { ...security.passwordRequirements, minLength: val } })} min={8} max={20} marks valueLabelDisplay="on" />
                  </Box>
                  <FormControlLabel control={<Switch checked={security.passwordRequirements.requireUppercase} onChange={(e) => setSecurity({ ...security, passwordRequirements: { ...security.passwordRequirements, requireUppercase: e.target.checked } })} />} label="Require Uppercase Letters" />
                  <FormControlLabel control={<Switch checked={security.passwordRequirements.requireNumbers} onChange={(e) => setSecurity({ ...security, passwordRequirements: { ...security.passwordRequirements, requireNumbers: e.target.checked } })} />} label="Require Numbers" />
                  <FormControlLabel control={<Switch checked={security.passwordRequirements.requireSymbols} onChange={(e) => setSecurity({ ...security, passwordRequirements: { ...security.passwordRequirements, requireSymbols: e.target.checked } })} />} label="Require Symbols" />
                  <FormControl fullWidth>
                    <InputLabel>Session Timeout</InputLabel>
                    <Select value={security.sessionTimeout} label="Session Timeout" onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}>
                      <MenuItem value={15}>15 minutes</MenuItem>
                      <MenuItem value={30}>30 minutes</MenuItem>
                      <MenuItem value={60}>1 hour</MenuItem>
                      <MenuItem value={240}>4 hours</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Sessions */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Active Sessions" subheader="Devices currently logged into your account" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><DevicesOther /></Avatar>} />
              <Divider />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Device</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>IP Address</TableCell>
                      <TableCell>Last Active</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeSessions.map(session => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <DevicesOther fontSize="small" />
                            <Typography>{session.device}</Typography>
                            {session.current && <Chip label="Current" size="small" color="success" />}
                          </Stack>
                        </TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>{session.ip}</TableCell>
                        <TableCell>{session.lastActive}</TableCell>
                        <TableCell align="right">
                          {!session.current && <Button size="small" color="error">Logout</Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* API Keys */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="API Keys"
                subheader="Manage API access tokens"
                avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><VpnKey /></Avatar>}
                action={<Button size="small" startIcon={<Key />}>Create New Key</Button>}
              />
              <Divider />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Key</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Last Used</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiKeys.map(key => (
                      <TableRow key={key.id}>
                        <TableCell>{key.name}</TableCell>
                        <TableCell><Chip label={key.key} size="small" /></TableCell>
                        <TableCell>{key.created}</TableCell>
                        <TableCell>{key.lastUsed}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small"><Refresh /></IconButton>
                          <IconButton size="small" color="error"><Delete /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Audit Log */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Security Audit Log" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><History /></Avatar>} />
              <Divider />
              <CardContent sx={{ maxHeight: 300, overflow: 'auto' }}>
                <List dense>
                  {[
                    { event: 'Password changed', time: '2 hours ago', status: 'success' },
                    { event: 'New device login', time: '1 day ago', status: 'info' },
                    { event: 'Failed login attempt', time: '3 days ago', status: 'warning' },
                    { event: 'API key created', time: '5 days ago', status: 'success' },
                    { event: '2FA enabled', time: '1 week ago', status: 'success' }
                  ].map((log, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        {log.status === 'success' && <CheckCircle color="success" />}
                        {log.status === 'warning' && <Warning color="warning" />}
                        {log.status === 'info' && <History color="info" />}
                      </ListItemIcon>
                      <ListItemText primary={log.event} secondary={log.time} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* DATA TAB */}
      {tabValue === 4 && (
        <Grid container spacing={3}>
          {/* Backup Settings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Backup Settings" avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><Backup /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControlLabel
                    control={<Switch checked={backup.autoBackupEnabled} onChange={(e) => setBackup({ ...backup, autoBackupEnabled: e.target.checked })} />}
                    label="Enable Automatic Backups"
                  />
                  {backup.autoBackupEnabled && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Backup Frequency</InputLabel>
                        <Select value={backup.frequency} label="Backup Frequency" onChange={(e) => setBackup({ ...backup, frequency: e.target.value })}>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField fullWidth type="time" label="Backup Time" value={backup.time} onChange={(e) => setBackup({ ...backup, time: e.target.value })} />
                      <FormControl fullWidth>
                        <InputLabel>Retention Period (days)</InputLabel>
                        <Select value={backup.retention} label="Retention Period" onChange={(e) => setBackup({ ...backup, retention: e.target.value })}>
                          <MenuItem value={7}>7 days</MenuItem>
                          <MenuItem value={30}>30 days</MenuItem>
                          <MenuItem value={90}>90 days</MenuItem>
                          <MenuItem value={365}>1 year</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                  <Alert severity="info">Last backup: {backup.lastBackup}</Alert>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<Backup />}>Backup Now</Button>
                    <Button variant="outlined" fullWidth startIcon={<Restore />}>Restore</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Export */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Export Data" avatar={<Avatar sx={{ bgcolor: 'success.main' }}><Download /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Export Format</InputLabel>
                    <Select value={dataExport.format} label="Export Format" onChange={(e) => setDataExport({ ...dataExport, format: e.target.value })}>
                      <MenuItem value="csv">CSV (Spreadsheet)</MenuItem>
                      <MenuItem value="json">JSON (Raw Data)</MenuItem>
                      <MenuItem value="pdf">PDF (Reports)</MenuItem>
                      <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Date Range</InputLabel>
                    <Select value={dataExport.dateRange} label="Date Range" onChange={(e) => setDataExport({ ...dataExport, dateRange: e.target.value })}>
                      <MenuItem value="all">All Time</MenuItem>
                      <MenuItem value="year">Last Year</MenuItem>
                      <MenuItem value="month">Last Month</MenuItem>
                      <MenuItem value="week">Last Week</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={<Switch checked={dataExport.includeMedia} onChange={(e) => setDataExport({ ...dataExport, includeMedia: e.target.checked })} />}
                    label="Include Media Files"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Export includes sensor data, reports, and configurations
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<Download />}>Export Data</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Import */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Import Data" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><CloudUpload /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <Alert severity="warning">Import will merge with existing data. Use caution.</Alert>
                  <FormControl fullWidth>
                    <InputLabel>Import Type</InputLabel>
                    <Select defaultValue="sensors">
                      <MenuItem value="sensors">Sensor Data</MenuItem>
                      <MenuItem value="crops">Crop Records</MenuItem>
                      <MenuItem value="equipment">Equipment Logs</MenuItem>
                      <MenuItem value="financial">Financial Data</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" fullWidth component="label" startIcon={<CloudUpload />}>
                    Upload CSV/JSON
                    <input type="file" hidden accept=".csv,.json" />
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: CSV, JSON. Max file size: 50MB
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Storage Usage */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Storage Usage" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><Storage /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Total Usage</Typography>
                      <Typography variant="body2" fontWeight={600}>{storage.used} GB / {storage.total} GB</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={(storage.used / storage.total) * 100} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Divider />
                  {Object.entries(storage.breakdown).map(([key, value]) => (
                    <Stack direction="row" justifyContent="space-between" key={key}>
                      <Typography variant="caption" textTransform="capitalize">{key}</Typography>
                      <Typography variant="caption" fontWeight={600}>{value} GB</Typography>
                    </Stack>
                  ))}
                  <Button variant="outlined" fullWidth>Upgrade Storage</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Integrations */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="External Integrations"
                subheader="Connect with third-party services"
                avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Share /></Avatar>}
                action={<Button size="small" startIcon={<Share />}>Add Integration</Button>}
              />
              <Divider />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Service</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Sync</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {integrations.map(integration => (
                      <TableRow key={integration.id}>
                        <TableCell>{integration.name}</TableCell>
                        <TableCell><Chip label={integration.type} size="small" /></TableCell>
                        <TableCell>
                          <Chip
                            label={integration.status}
                            size="small"
                            color={integration.status === 'connected' ? 'success' : 'default'}
                            icon={integration.status === 'connected' ? <CheckCircle /> : undefined}
                          />
                        </TableCell>
                        <TableCell>{integration.status === 'connected' ? '5 mins ago' : 'Never'}</TableCell>
                        <TableCell align="right">
                          <Button size="small">{integration.status === 'connected' ? 'Disconnect' : 'Connect'}</Button>
                          <IconButton size="small"><Refresh /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Retention */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Data Retention Policy" avatar={<Avatar sx={{ bgcolor: 'error.main' }}><History /></Avatar>} />
              <Divider />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Delete Inactive Records After</InputLabel>
                    <Select defaultValue="never">
                      <MenuItem value="never">Never (Keep All)</MenuItem>
                      <MenuItem value="90">90 days</MenuItem>
                      <MenuItem value="180">6 months</MenuItem>
                      <MenuItem value="365">1 year</MenuItem>
                      <MenuItem value="730">2 years</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Archive Old Data After</InputLabel>
                    <Select defaultValue="180">
                      <MenuItem value="90">90 days</MenuItem>
                      <MenuItem value="180">6 months</MenuItem>
                      <MenuItem value="365">1 year</MenuItem>
                    </Select>
                  </FormControl>
                  <Alert severity="info">Archived data can be restored within 30 days</Alert>
                  <Button variant="outlined" fullWidth color="error" startIcon={<Delete />}>Delete Old Records Now</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Settings;
