import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Avatar,
  Divider,
  Stack,
  LinearProgress,
  CircularProgress,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  WbSunny,
  BarChart,
  ShowChart,
  Analytics,
  CheckCircle,
  Timeline
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useLocalization } from '../context/LocalizationContext';

const YieldPrediction = ({ location, cropType = 'corn' }) => {
  const { convertUnit, getUnitLabel } = useLocalization();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const lat = location?.lat || 40.7128;
        const lon = location?.lon || -74.0060;
        const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  const forecastData = weatherData?.forecast?.map(day => ({
    name: day.day,
    temp: Math.round(convertUnit(day.temp, 'temp')),
    yield: Math.floor(Math.random() * 20) + 80
  })) || [];

  const yieldData = [
    { crop: 'Corn', forecast: `8.4 ${getUnitLabel('weight')}/ha`, change: '+12%', confidence: 'High' },
    { crop: 'Wheat', forecast: `4.2 ${getUnitLabel('weight')}/ha`, change: '-5%', confidence: 'Medium' },
    { crop: 'Soybeans', forecast: `3.8 ${getUnitLabel('weight')}/ha`, change: '+8%', confidence: 'High' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  if (!weatherData) return <Box sx={{ p: 3 }}><Alert severity="warning">Weather data unavailable.</Alert></Box>;

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">Yield Prediction</Typography>
        <Typography variant="body1" color="text.secondary">
          AI forecasting for <strong>{cropType}</strong> based on local patterns.
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Current Forecast" />
        <Tab label="Model Insights" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%', minHeight: 450 }}>
              <CardHeader title="Yield Probability" avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><TrendingUp /></Avatar>} />
              <Divider />
              <CardContent>
                <Box sx={{ height: 300, width: '100%', mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" stroke="#2E7D32" label={{ value: getUnitLabel('temp'), angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#0288D1" label={{ value: 'Yield %', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#2E7D32" name={`Temp (${getUnitLabel('temp')})`} strokeWidth={3} />
                      <Line yAxisId="right" type="monotone" dataKey="yield" stroke="#0288D1" name="Yield %" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Localized Peak Yield</Typography>
                  <Typography variant="h5" fontWeight={700}>8.4 {getUnitLabel('weight')}/ha</Typography>
                  <LinearProgress variant="determinate" value={84} sx={{ mt: 2, height: 8, borderRadius: 4 }} color="success" />
                </CardContent>
              </Card>
              <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>Localized Advice</Typography>
                  <Typography variant="body2">Optimize irrigation for {getUnitLabel('temp')} variations.</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table>
                <TableHead sx={{ bgcolor: 'background.default' }}>
                  <TableRow>
                    <TableCell>Crop</TableCell>
                    <TableCell>Forecast</TableCell>
                    <TableCell>Change</TableCell>
                    <TableCell>Confidence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {yieldData.map((row) => (
                    <TableRow key={row.crop}>
                      <TableCell sx={{ fontWeight: 600 }}>{row.crop}</TableCell>
                      <TableCell>{row.forecast}</TableCell>
                      <TableCell><Chip label={row.change} color={row.change.startsWith('+') ? 'success' : 'error'} size="small" /></TableCell>
                      <TableCell><Chip label={row.confidence} variant="outlined" size="small" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <CardHeader title="Model Analysis" avatar={<ShowChart />} />
          <Divider />
          <CardContent>
            <Alert severity="info" icon={<Analytics />}>
              Using localized {getUnitLabel('temp')} and regional {getUnitLabel('weight')} metrics.
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default YieldPrediction;
