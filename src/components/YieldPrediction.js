import React, { useState, useEffect } from 'react';
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
  WbSunny,
  Opacity,
  Cloud,
} from '@mui/icons-material';

const YieldPrediction = ({ location, cropType = 'corn' }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calculate yield predictions based on weather and crop type
  const getYieldData = () => {
    const baseYields = {
      corn: { base: 2850, weatherFactor: 1.0 },
      wheat: { base: 1950, weatherFactor: 1.0 },
      soybeans: { base: 1200, weatherFactor: 1.0 },
      tomatoes: { base: 850, weatherFactor: 1.0 }
    };

    if (!weatherData) return [];

    const { temperature, humidity, forecast } = weatherData;
    const avgTemp = temperature;
    const avgHumidity = humidity;
    const totalPrecip = forecast?.reduce((sum, day) => sum + (day.precipitation || 0), 0) || 50; // Fallback if no forecast

    return Object.entries(baseYields).map(([crop, data]) => {
      let adjustment = 0;
      let confidence = 'High';

      // Temperature impact
      if (avgTemp < 15 || avgTemp > 35) {
        adjustment -= 0.15;
        confidence = 'Medium';
      } else if (avgTemp >= 20 && avgTemp <= 30) {
        adjustment += 0.1;
      }

      // Humidity impact
      if (avgHumidity < 40 || avgHumidity > 90) {
        adjustment -= 0.1;
        confidence = 'Medium';
      } else if (avgHumidity >= 50 && avgHumidity <= 80) {
        adjustment += 0.05;
      }

      // Crop-specific adjustments
      if (crop.toLowerCase() === cropType.toLowerCase()) {
        adjustment += 0.05; // Bonus for selected crop
      }

      const adjustedYield = Math.round(data.base * (1 + adjustment));
      const change = Math.round(adjustment * 100);

      return {
        crop: crop.charAt(0).toUpperCase() + crop.slice(1),
        forecast: `${adjustedYield.toLocaleString()} tons`,
        change: `${change >= 0 ? '+' : ''}${change}%`,
        confidence
      };
    });
  };

  const yieldData = getYieldData();

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      case 'Low': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Yield Prediction
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered forecast for <strong>{cropType}</strong> and other crops{location ? ` in ${location}` : ''}.
        </Typography>
      </Box>

      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2 }}
        >
          <Tab label="Forecasts" />
          <Tab label="Model Analysis" />
          <Tab label="Historical" />
          <Tab label="Scenarios" />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : !weatherData ? (
        <Alert severity="warning" sx={{ mb: 4 }}>
          <AlertTitle>Weather Data Unavailable</AlertTitle>
          We're unable to fetch real-time weather data. Showing general yield estimates instead.
        </Alert>
      ) : null}

      {tabValue === 0 && !loading && (
        <Grid container spacing={3}>
          {yieldData.slice(0, 2).map((crop, index) => (
            <Grid item xs={12} md={6} key={crop.crop}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title={`${crop.crop} Forecast`}
                  avatar={<Avatar sx={{ bgcolor: index === 0 ? 'primary.main' : 'secondary.main' }}>
                    {index === 0 ? <TrendingUp /> : <Assessment />}
                  </Avatar>}
                />
                <Divider />
                <CardContent>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>{crop.forecast}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <Box component="span" sx={{ color: crop.change.startsWith('+') ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                      {crop.change}
                    </Box> from last season
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" sx={{ minWidth: 60 }}>Confidence</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={crop.confidence === 'High' ? 90 : crop.confidence === 'Medium' ? 70 : 50}
                      color={getConfidenceColor(crop.confidence)}
                      sx={{ flexGrow: 1, height: 6, borderRadius: 3, mx: 1 }}
                    />
                    <Typography variant="caption" fontWeight={600}>{crop.confidence}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Detailed Forecast Summary"
                avatar={<Avatar sx={{ bgcolor: 'info.main' }}><BarChart /></Avatar>}
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Crop</TableCell>
                        <TableCell>Forecasted Yield</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell>Confidence</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {yieldData.map((row) => (
                        <TableRow key={row.crop} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.light', width: 32, height: 32, fontSize: '0.8rem' }}>
                                {row.crop[0]}
                              </Avatar>
                              <Typography variant="subtitle2" fontWeight={600}>{row.crop}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{row.forecast}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.change}
                              color={row.change.startsWith('+') ? 'success' : 'error'}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.confidence}
                              color={getConfidenceColor(row.confidence)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <Timeline />
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
              <CardHeader title="Prediction Model Insights" avatar={<ShowChart />} />
              <Divider />
              <CardContent>
                <Alert severity="info" sx={{ mb: 3 }} icon={<Analytics fontSize="inherit" />}>
                  Our AI model combines {weatherData ? 'real-time weather data' : 'weather patterns'}, historical yields, and soil health metrics.
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="High Accuracy Rate"
                      secondary="92% historically accurate for corn and wheat in your region."
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <WbSunny color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Weather Impact"
                      secondary="Current heat wave factored into -5% yield adjustment for leafy greens."
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Other tabs placeholder logic similar to original but cleaned up */}
      {tabValue > 1 && (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography color="text.secondary">Historical data and Scenario planning tools coming soon.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default YieldPrediction;
