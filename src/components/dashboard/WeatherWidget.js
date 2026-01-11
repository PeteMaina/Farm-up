import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Stack, Chip, LinearProgress } from '@mui/material';
import { WbSunny, Opacity, Air, CloudQueue, Umbrella } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const WeatherWidget = ({ location }) => {
    // Simulated 7-day forecast data
    const forecastData = [
        { day: 'Mon', temp: 24, precip: 10, wind: 12 },
        { day: 'Tue', temp: 26, precip: 5, wind: 10 },
        { day: 'Wed', temp: 23, precip: 40, wind: 15 },
        { day: 'Thu', temp: 22, precip: 60, wind: 18 },
        { day: 'Fri', temp: 25, precip: 20, wind: 14 },
        { day: 'Sat', temp: 27, precip: 5, wind: 11 },
        { day: 'Sun', temp: 28, precip: 0, wind: 9 },
    ];

    const currentWeather = {
        temp: 24,
        humidity: 65,
        windSpeed: 12,
        precipitation: 10,
        condition: 'Partly Cloudy',
        uvIndex: 7,
        visibility: 10,
        pressure: 1013,
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Weather Forecast
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {location?.city || 'Your Location'} • Updated: {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>

                    {/* Current Weather Grid */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={1}>
                                <WbSunny color="warning" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" fontWeight={700}>{currentWeather.temp}°C</Typography>
                                <Typography variant="caption" color="text.secondary">Temperature</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={1}>
                                <Opacity color="info" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" fontWeight={700}>{currentWeather.humidity}%</Typography>
                                <Typography variant="caption" color="text.secondary">Humidity</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={1}>
                                <Air color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" fontWeight={700}>{currentWeather.windSpeed} km/h</Typography>
                                <Typography variant="caption" color="text.secondary">Wind Speed</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={1}>
                                <Umbrella color="secondary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" fontWeight={700}>{currentWeather.precipitation}%</Typography>
                                <Typography variant="caption" color="text.secondary">Precipitation</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Additional Metrics */}
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">UV Index</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h6" fontWeight={600}>{currentWeather.uvIndex}</Typography>
                                <Chip label="High" size="small" color="warning" />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">Visibility</Typography>
                            <Typography variant="h6" fontWeight={600}>{currentWeather.visibility} km</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">Pressure</Typography>
                            <Typography variant="h6" fontWeight={600}>{currentWeather.pressure} hPa</Typography>
                        </Grid>
                    </Grid>

                    {/* 7-Day Temperature Forecast Chart */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            7-Day Temperature Trend
                        </Typography>
                        <ResponsiveContainer width="100%" height={150}>
                            <AreaChart data={forecastData}>
                                <defs>
                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFA726" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FFA726" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="day" style={{ fontSize: '12px' }} />
                                <YAxis style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="temp" stroke="#FFA726" fillOpacity={1} fill="url(#colorTemp)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Precipitation Probability */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Precipitation Probability
                        </Typography>
                        <ResponsiveContainer width="100%" height={120}>
                            <LineChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="day" style={{ fontSize: '12px' }} />
                                <YAxis style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="precip" stroke="#29B6F6" strokeWidth={2} dot={{ fill: '#29B6F6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Season Progress */}
                    <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                            <Typography variant="subtitle2" fontWeight={600}>Growing Season Progress</Typography>
                            <Typography variant="caption" color="text.secondary">68% Complete</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={68} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;
