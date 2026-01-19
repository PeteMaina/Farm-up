import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import all dashboard widgets
import WeatherWidget from './dashboard/WeatherWidget';
import SensorGrid from './dashboard/SensorGrid';
import EquipmentStatus from './dashboard/EquipmentStatus';
import FinancialChart from './dashboard/FinancialChart';
import MarketPrices from './dashboard/MarketPrices';
import LaborManagement from './dashboard/LaborManagement';
import AlertsActivity from './dashboard/AlertsActivity';
import QuickActions from './dashboard/QuickActions';
import LocalNews from './dashboard/LocalNews';

const Dashboard = ({
  location,
  cropType,
  onSetCropType,
  onSetLocation,
}) => {
  const navigate = useNavigate();

  // Real-time sensor data state
  const [realTimeData, setRealTimeData] = useState({
    temperature: 24,
    humidity: 65,
    soilMoisture: 78,
    lightLevel: 85
  });

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const lat = location?.lat || 40.7128;
        const lon = location?.lon || -74.0060;
        const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
        if (response.ok) {
          const data = await response.json();
          setRealTimeData(prev => ({
            ...prev,
            temperature: data.temperature,
            humidity: data.humidity
          }));
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  // Simulate real-time data updates for non-weather sensors
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        soilMoisture: Math.max(0, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        lightLevel: Math.max(0, Math.min(100, prev.lightLevel + (Math.random() - 0.5) * 4))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCropTypeChange = (event) => {
    onSetCropType(event.target.value);
  };

  const handleLocationChange = (event) => {
    onSetLocation(event.target.value);
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Fade in timeout={1000}>
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'start', md: 'center' }} spacing={2}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
                Farm Management Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comprehensive overview of your agricultural operations • Last updated: {new Date().toLocaleTimeString()}
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
              {/* Crop Type Selector */}
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="crop-type-label">Select Crop Type</InputLabel>
                  <Select
                    labelId="crop-type-label"
                    value={cropType}
                    label="Select Crop Type"
                    onChange={handleCropTypeChange}
                  >
                    <MenuItem value="corn">Corn</MenuItem>
                    <MenuItem value="wheat">Wheat</MenuItem>
                    <MenuItem value="tomatoes">Tomatoes</MenuItem>
                    <MenuItem value="soybeans">Soybeans</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Location Input */}
              <Box sx={{ minWidth: 200 }}>
                <TextField
                  label="Set Location"
                  value={location || ''}
                  placeholder="Enter location"
                  onChange={handleLocationChange}
                  fullWidth
                  size="small"
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Fade>

      {/* Main Dashboard Grid */}
      <Stack spacing={4}>
        {/* Section 1: Quick Actions */}
        <Fade in timeout={1200}>
          <Box>
            <QuickActions />
          </Box>
        </Fade>

        {/* Section 2: Live Sensor Grid */}
        <Fade in timeout={1400}>
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
              Live IoT Sensor Data
            </Typography>
            <SensorGrid realTimeData={realTimeData} />
          </Box>
        </Fade>

        <Divider />

        {/* Section 3: Weather & Alerts (Two Column) */}
        <Fade in timeout={1600}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <WeatherWidget location={location} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                <AlertsActivity />
                <LocalNews />
              </Stack>
            </Grid>
          </Grid>
        </Fade>

        <Divider />

        {/* Section 4: Market Prices */}
        <Fade in timeout={1800}>
          <Box>
            <MarketPrices cropType={cropType} />
          </Box>
        </Fade>

        <Divider />

        {/* Section 5: Operations Control (Two Column) */}
        <Fade in timeout={2000}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <EquipmentStatus />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LaborManagement />
            </Grid>
          </Grid>
        </Fade>

        <Divider />

        {/* Section 6: Financial Overview */}
        <Fade in timeout={2200}>
          <Box>
            <FinancialChart />
          </Box>
        </Fade>

        {/* Bottom Spacer */}
        <Box sx={{ pb: 4 }} />
      </Stack>
    </Box>
  );
};

export default Dashboard;
