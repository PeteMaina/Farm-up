import { useLocalization } from '../context/LocalizationContext';

const WeatherInsights = ({ location }) => {
  const { convertUnit, getUnitLabel } = useLocalization();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Use location coordinates if available, otherwise default
        const lat = location?.lat || 40.7128; // Default to NYC
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

  if (loading) {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load weather data: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Weather Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time weather data and forecasts for <strong>{location || 'Current Location'}</strong>.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Temperature"
              avatar={<Avatar sx={{ bgcolor: 'warning.light' }}><Thermometer color="warning" /></Avatar>}
            />
            <CardContent>
              <Typography variant="h3" fontWeight={700}>
                {Math.round(convertUnit(weatherData?.temperature, 'temp'))}{getUnitLabel('temp')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feels like {Math.round(convertUnit(weatherData?.temperature + 2, 'temp'))}{getUnitLabel('temp')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Humidity"
              avatar={<Avatar sx={{ bgcolor: 'info.light' }}><Opacity color="info" /></Avatar>}
            />
            <CardContent>
              <Typography variant="h3" fontWeight={700}>{weatherData?.humidity}%</Typography>
              <Stack spacing={1} sx={{ mt: 1 }}>
                <LinearProgress variant="determinate" value={weatherData?.humidity} color="info" sx={{ height: 6, borderRadius: 3 }} />
                <Typography variant="caption" color="text.secondary">Relative Humidity</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Wind"
              avatar={<Avatar sx={{ bgcolor: 'grey.300' }}><WindPower color="action" /></Avatar>}
            />
            <CardContent>
              <Typography variant="h3" fontWeight={700}>
                {Math.round(convertUnit(weatherData?.windSpeed, 'speed'))} <Typography component="span" variant="h5" color="text.secondary">{getUnitLabel('speed')}</Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Direction: North-West
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Precipitation"
              avatar={<Avatar sx={{ bgcolor: 'primary.light' }}><Cloud color="primary" /></Avatar>}
            />
            <CardContent>
              <Typography variant="h3" fontWeight={700}>{weatherData?.precipitation} <Typography component="span" variant="h5" color="text.secondary">mm</Typography></Typography>
              <Typography variant="body2" color="text.secondary">
                Chance of Rain: {weatherData?.forecast?.[0]?.precipitation > 0 ? 'High' : 'Low'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Forecast Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          4-Day Forecast
        </Typography>
        <Grid container spacing={2}>
          {weatherData?.forecast?.map((day, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>{day.day}</Typography>
                  <Box sx={{ my: 2 }}>
                    {day.condition === 'Sunny' ? <WbSunny color="warning" fontSize="large" /> : <Cloud color="info" fontSize="large" />}
                  </Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {Math.round(convertUnit(day.temp, 'temp'))}{getUnitLabel('temp')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {day.condition}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Stack direction="row" alignItems="center" justify="center" spacing={1} sx={{ justifyContent: 'center' }}>
                    <WaterDrop fontSize="small" color="primary" />
                    <Typography variant="caption">{day.precipitation}% precip</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WeatherInsights;
