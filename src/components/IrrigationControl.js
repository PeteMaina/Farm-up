import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Avatar,
  Divider,
  Stack,
  Chip
} from '@mui/material';
import { Opacity as WaterDrop, PlayArrow, Stop, WbSunny, Cloud, Thunderstorm } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const irrigationSystemsInfo = {
  drip: {
    description: 'Efficient water delivery directly to plant roots, ideal for water conservation.',
    suitableRegions: ['Arid', 'Semi-Arid', 'Mediterranean'],
  },
  sprinkler: {
    description: 'Simulates rainfall, suitable for varied terrains.',
    suitableRegions: ['Temperate', 'Tropical', 'Continental'],
  },
  flood: {
    description: 'Traditional method for rice paddies and flat fields.',
    suitableRegions: ['Tropical', 'Subtropical'],
  },
  default: {
    description: 'Select a system for optimal irrigation management.',
    suitableRegions: [],
  },
};

const IrrigationControl = ({ location, cropType = 'default' }) => {
  const theme = useTheme();
  const { showNotification } = useNotification();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState('drip');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCycling, setIsCycling] = useState(false);

  const handleStartCycle = () => {
    setIsCycling(true);
    showNotification(`Starting irrigation cycle using ${selectedSystem} system...`, 'info');
  };

  const handleStopCycle = () => {
    setIsCycling(false);
    showNotification('Irrigation cycle stopped.', 'warning');
  };

  // Fetch weather data for irrigation recommendations
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const lat = location?.lat || 40.7128;
        const lon = location?.lon || -74.0060;

        const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const systemInfo = irrigationSystemsInfo[selectedSystem] || irrigationSystemsInfo.default;

  // Calculate irrigation recommendations based on weather
  const getIrrigationRecommendation = () => {
    if (!weatherData) return null;

    const { temperature, humidity, forecast } = weatherData;
    const nextDayPrecipitation = forecast?.[1]?.precipitation || 0;

    if (nextDayPrecipitation > 50) {
      return { level: 'low', message: 'Heavy rain expected tomorrow - reduce irrigation', color: 'info', icon: <Thunderstorm /> };
    } else if (humidity > 80) {
      return { level: 'low', message: 'High humidity detected - minimal watering needed', color: 'success', icon: <Cloud /> };
    } else if (temperature > 30) {
      return { level: 'high', message: 'Hot weather - increase irrigation frequency', color: 'warning', icon: <WbSunny /> };
    } else {
      return { level: 'normal', message: 'Normal conditions - maintain regular schedule', color: 'primary', icon: <WbSunny /> };
    }
  };

  const recommendation = getIrrigationRecommendation();

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Irrigation Control
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and automate irrigation systems for <strong>{cropType}</strong> crops{location ? ` in ${location}` : ''}.
        </Typography>
      </Box>

      {recommendation && (
        <Alert
          severity={recommendation.color}
          icon={recommendation.icon}
          sx={{ mb: 4 }}
          variant="filled"
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Recommendation: {recommendation.message}
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="System Control"
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><WaterDrop sx={{ color: 'white' }} /></Avatar>}
              action={
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoIrrigation}
                      onChange={(e) => setAutoIrrigation(e.target.checked)}
                      color="success"
                    />
                  }
                  label={<Typography variant="body2" fontWeight={600}>Auto Mode</Typography>}
                />
              }
            />
            <Divider />
            <CardContent>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="irrigation-system-label">Irrigation System Type</InputLabel>
                <Select
                  labelId="irrigation-system-label"
                  value={selectedSystem}
                  label="Irrigation System Type"
                  onChange={(e) => setSelectedSystem(e.target.value)}
                >
                  <MenuItem value="drip">Drip Irrigation</MenuItem>
                  <MenuItem value="sprinkler">Sprinkler System</MenuItem>
                  <MenuItem value="flood">Flood Irrigation</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom color="text.primary">
                  System Description
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {systemInfo.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" fontWeight={600}>Suitable Regions:</Typography>
                  {systemInfo.suitableRegions.map(region => (
                    <Chip key={region} label={region} size="small" />
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PlayArrow />}
                  size="large"
                  disabled={autoIrrigation || isCycling}
                  fullWidth
                  onClick={handleStartCycle}
                >
                  {isCycling ? 'Cycle Running...' : 'Start Cycle'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Stop />}
                  size="large"
                  disabled={autoIrrigation || !isCycling}
                  fullWidth
                  onClick={handleStopCycle}
                >
                  Stop Cycle
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Water Usage Stats"
              avatar={<Avatar sx={{ bgcolor: 'info.main' }}><WaterDrop sx={{ color: 'white' }} /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" fontWeight={700} color="primary">
                  1,230 L
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Used Today
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Daily Average</Typography>
                  <Typography variant="body2" fontWeight={600}>1,150 L</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Efficiency Score</Typography>
                  <Typography variant="body2" fontWeight={600} color="success.main">94%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Projected Monthly</Typography>
                  <Typography variant="body2" fontWeight={600}>35,650 L</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IrrigationControl;
