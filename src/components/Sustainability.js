import { useNotification } from '../context/NotificationContext';
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Avatar,
  Divider,
  Stack,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  NatureOutlined as Eco,
  Recycling,
  Nature,
  WaterDrop,
  Co2,
  Bolt,
  Verified,
  MonetizationOn,
  TrendingUp,
  Download,
  Upload,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Sustainability = () => {
  const { showNotification } = useNotification();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock Data
  const carbonData = [
    { month: 'Jan', emissions: 45, sequestration: 12 },
    { month: 'Feb', emissions: 42, sequestration: 14 },
    { month: 'Mar', emissions: 48, sequestration: 18 },
    { month: 'Apr', emissions: 55, sequestration: 22 },
    { month: 'May', emissions: 50, sequestration: 28 },
    { month: 'Jun', emissions: 40, sequestration: 35 },
  ];

  const energyMix = [
    { name: 'Solar', value: 45 },
    { name: 'Grid', value: 35 },
    { name: 'Biofuel', value: 20 },
  ];

  const COLORS = ['#2E7D32', '#F57C00', '#1976D2'];

  const complianceList = [
    { name: 'USDA Organic', status: 'Active', expiry: '2026-12-31', progress: 100 },
    { name: 'GlobalG.A.P.', status: 'Pending Audit', expiry: '2026-08-15', progress: 85 },
    { name: 'Carbon Standard', status: 'In Progress', expiry: 'N/A', progress: 45 },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header Section */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
            Sustainability & Compliance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your environmental impact, certifications, and eco-ROI.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => showNotification('Downloading comprehensive ESG report...', 'info')}
          >
            Export Report
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Verified />}
            onClick={() => showNotification('Audit readiness check initiated...', 'success')}
          >
            Start Audit
          </Button>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'success.dark', color: 'white' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Eco-Score</Typography>
                  <Typography variant="h2" fontWeight={700}>85/100</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}><Nature /></Avatar>
              </Stack>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp fontSize="small" />
                <Typography variant="body2">+5 points vs last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Est. Carbon Credits</Typography>
                  <Typography variant="h3" fontWeight={700} color="primary.main">$12,450</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light' }}><MonetizationOn color="primary" /></Avatar>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Based on 145 tons sequestrated
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Compliance Status</Typography>
                  <Typography variant="h3" fontWeight={700} color="warning.main">2/3</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light' }}><Verified color="warning" /></Avatar>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                1 Audit Pending (Due in 14 days)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="sustainability tabs">
          <Tab label="Carbon & Energy" icon={<Co2 />} iconPosition="start" />
          <Tab label="Resource Efficiency" icon={<WaterDrop />} iconPosition="start" />
          <Tab label="Compliance & Certs" icon={<Verified />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content 1: Carbon & Energy */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardHeader title="Emissions vs. Sequestration" subheader="Track your net-zero progress" />
              <Divider />
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emissions" name="Emissions (tCO2e)" fill="#EF5350" />
                    <Bar dataKey="sequestration" name="Sequestration (tCO2e)" fill="#66BB6A" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Energy Mix" subheader="Renewable usage breakdown" />
              <Divider />
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={energyMix}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {energyMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Chip
                    icon={<Bolt />}
                    label="45% Renewable Energy"
                    color="success"
                    variant="outlined"
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                    Solar installation saved $2,300 this year.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab Content 2: Resource Efficiency */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Water Efficiency" />
              <Divider />
              <CardContent>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">Drip Irrigation Coverage</Typography>
                      <Typography variant="body2" fontWeight={700}>85%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={85} color="info" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">Rainwater Harvesting Goal</Typography>
                      <Typography variant="body2" fontWeight={700}>12,500 / 15,000 L</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={83} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Alert severity="info" icon={<WaterDrop />}>
                    <AlertTitle>Optimization Tip</AlertTitle>
                    Switching Field B to drip irrigation could save another 15% water.
                    <Button size="small" sx={{ display: 'block', mt: 1 }} onClick={() => showNotification('Analyzing irrigation switch ROI...', 'info')}>
                      Calculate ROI
                    </Button>
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Waste Management" />
              <Divider />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon><Recycling color="success" /></ListItemIcon>
                    <ListItemText primary="Organic Waste Composting" secondary="90% diverted from landfill" />
                    <Chip label="Excellent" color="success" size="small" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon><Co2 color="warning" /></ListItemIcon>
                    <ListItemText primary="Plastic Recycling" secondary="Needs improvement in collection" />
                    <Button size="small" variant="outlined" onClick={() => showNotification('Scheduling waste pickup...', 'info')}>Schedule Pickup</Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab Content 3: Compliance & Certs */}
      {tabValue === 2 && (
        <Card>
          <CardHeader title="Active Certifications" action={<Button startIcon={<Upload />} onClick={() => showNotification('Opening document uploader...', 'info')}>Upload Doc</Button>} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {complianceList.map((cert) => (
                <Grid item xs={12} md={4} key={cert.name}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">{cert.name}</Typography>
                      {cert.status === 'Active' ? <CheckCircle color="success" /> : <Warning color="warning" />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status: <strong>{cert.status}</strong>
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                      Expires: {cert.expiry}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress variant="determinate" value={cert.progress} sx={{ flexGrow: 1, height: 6, borderRadius: 3 }} color={cert.progress === 100 ? 'success' : 'warning'} />
                      <Typography variant="caption">{cert.progress}%</Typography>
                    </Box>
                    <Button fullWidth variant="outlined" size="small" sx={{ mt: 2 }} onClick={() => showNotification(`Viewing details for ${cert.name}`, 'info')}>
                      Manage
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Sustainability;
