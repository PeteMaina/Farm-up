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
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { dashboardService } from '../services/api';

const CropAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState([]);
  const { showNotification } = useNotification();
  const theme = useTheme();

  React.useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await dashboardService.getCrops();
        setCrops(data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification('Crop analytics data refreshed!', 'success');
    }, 1000);
  };

  const handleExport = () => {
    const data = JSON.stringify(cropData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'crop_analytics_export.json';
    link.click();
    link.click();
    showNotification('Exporting crop analytics data...', 'info');
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
          <Button variant="outlined" startIcon={<Refresh />} onClick={handleRefresh} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="contained" startIcon={<Download />} onClick={handleExport}>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Active Crop Health"
                avatar={<Avatar sx={{ bgcolor: 'success.light' }}><Assessment color="success" /></Avatar>}
              />
              <Divider />
              <CardContent>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Crop</TableCell>
                        <TableCell>Yield</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cropData.map((row) => (
                        <TableRow key={row.crop}>
                          <TableCell><Typography variant="subtitle2" fontWeight={600}>{row.crop}</Typography></TableCell>
                          <TableCell>{row.yield}</TableCell>
                          <TableCell>
                            <Chip size="small" label={row.status} color={getStatusColor(row.status)} />
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
    </Box>
  );
};

export default CropAnalytics;
