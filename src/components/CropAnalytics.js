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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
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
  Avatar,
  Stack,
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Analytics,
  Timeline,
  PieChart,
  BarChart,
  ShowChart,
  ExpandMore,
  Info,
  Warning,
  CheckCircle,
  Error,
  Refresh,
  Download,
  Share,
  FilterList,
  Search,
  Add,
} from '@mui/icons-material';

const CropAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const cropData = [
    { crop: 'Corn', yield: '2,850 tons', change: '+12%', status: 'excellent' },
    { crop: 'Wheat', yield: '1,950 tons', change: '+8%', status: 'good' },
    { crop: 'Soybeans', yield: '1,200 tons', change: '-3%', status: 'warning' },
    { crop: 'Tomatoes', yield: '850 tons', change: '+15%', status: 'excellent' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'warning': return 'warning';
      case 'danger': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return <CheckCircle />;
      case 'good': return <Info />;
      case 'warning': return <Warning />;
      case 'danger': return <Error />;
      default: return <Info />;
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main" sx={{ mb: 1 }}>
            Crop Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive analytics and insights for your crops.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={() => setLoading(true)}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, pt: 2 }}
        >
          <Tab label="Overview" />
          <Tab label="Yield Analysis" />
          <Tab label="Performance Metrics" />
          <Tab label="Historical Data" />
        </Tabs>
        <Divider />
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Yield Trends"
                avatar={<Avatar sx={{ bgcolor: 'primary.light' }}><TrendingUp color="primary" /></Avatar>}
                action={
                  <IconButton size="small">
                    <Info />
                  </IconButton>
                }
              />
              <Divider />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Current Season Overview
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
                  Analyze historical and predicted yield data across all crops.
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={600}>Progress</Typography>
                    <Typography variant="body2" fontWeight={600}>75%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  75% of expected yield achieved based on current projections.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Key Indicators"
                avatar={<Avatar sx={{ bgcolor: 'secondary.light' }}><Assessment color="secondary" /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2">Soil Health</Typography>
                    <Chip label="Good" color="success" size="small" variant="outlined" />
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2">Water Usage</Typography>
                    <Chip label="Optimal" color="primary" size="small" variant="outlined" />
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2">Pest Control</Typography>
                    <Chip label="Excellent" color="success" size="small" variant="outlined" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Crop Performance Summary"
                avatar={<Avatar sx={{ bgcolor: 'warning.light' }}><BarChart color="warning" /></Avatar>}
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Crop</TableCell>
                        <TableCell>Current Yield</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cropData.map((row) => (
                        <TableRow key={row.crop} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                {row.crop[0]}
                              </Avatar>
                              <Typography variant="subtitle2" fontWeight={600}>{row.crop}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{row.yield}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.change}
                              color={row.change.startsWith('+') ? 'success' : 'error'}
                              size="small"
                              sx={{ borderRadius: 1 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(row.status)}
                              label={row.status}
                              color={getStatusColor(row.status)}
                              variant="outlined"
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <Timeline fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <PieChart fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Yield Analysis Dashboard" avatar={<ShowChart />} />
              <Divider />
              <CardContent>
                <Alert severity="info" sx={{ mb: 3 }} variant="outlined">
                  <AlertTitle>AI Prediction Model</AlertTitle>
                  Our model predicts yields based on historical data, weather patterns, and soil conditions.
                </Alert>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.light' }}><TrendingUp color="success" /></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight={600}>Corn Yield Projection</Typography>}
                      secondary="Expected: 2,850 tons (+12% from last season)"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.light' }}><TrendingUp color="success" /></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight={600}>Wheat Yield Projection</Typography>}
                      secondary="Expected: 1,950 tons (+8% from last season)"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'warning.light' }}><Warning color="warning" /></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight={600}>Soybean Yield Projection</Typography>}
                      secondary="Expected: 1,200 tons (-3% from last season)"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Performance Metrics" avatar={<Assessment />} />
              <Divider />
              <CardContent>
                <Accordion elevation={0} variant="outlined" sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>Soil Health Metrics</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      pH Level: 6.8 (Optimal range: 6.0-7.0)
                      <br />
                      Nutrient Levels: Nitrogen 45%, Phosphorus 32%, Potassium 28%
                      <br />
                      Organic Matter: 3.2%
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>Water Management</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Current Usage: 2.3 liters/day per plant
                      <br />
                      Efficiency Rating: 92%
                      <br />
                      Irrigation Schedule: Automated
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Alerts & Recommendations" avatar={<Warning />} />
              <Divider />
              <CardContent>
                <Alert severity="warning" sx={{ mb: 2 }} variant="standard">
                  <AlertTitle>Attention Required</AlertTitle>
                  Soybean field showing signs of nutrient deficiency. Consider applying fertilizer.
                </Alert>
                <Alert severity="success" sx={{ mb: 2 }} variant="standard">
                  <AlertTitle>Good News</AlertTitle>
                  Corn field irrigation system operating optimally.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Historical Data" avatar={<Timeline />} />
              <Divider />
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                {loading ? <CircularProgress /> : <Typography color="text.secondary">Select a date range to view historical data.</Typography>}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CropAnalytics;
