import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, Stack, Avatar, Chip } from '@mui/material';
import {
    WbSunny,
    Opacity,
    Grass,
    Brightness6,
    Science,
    LocalFlorist,
    Co2,
    WaterDrop,
    Thermostat,
    TrendingUp,
    TrendingDown,
} from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const SensorGrid = ({ realTimeData }) => {
    const [sensorData, setSensorData] = useState({
        temperature: realTimeData?.temperature || 24,
        humidity: realTimeData?.humidity || 65,
        soilMoisture: realTimeData?.soilMoisture || 78,
        lightLevel: realTimeData?.lightLevel || 85,
        soilPh: 6.5,
        nitrogenLevel: 45,
        phosphorusLevel: 38,
        potassiumLevel: 52,
        co2Level: 420,
        waterTankLevel: 85,
    });

    // Generate sparkline data for each sensor
    const [sparklineData, setSparklineData] = useState({});

    useEffect(() => {
        // Initialize sparkline data
        const initialSparklines = {};
        Object.keys(sensorData).forEach(key => {
            initialSparklines[key] = Array.from({ length: 20 }, (_, i) => ({
                value: sensorData[key] + (Math.random() - 0.5) * 5
            }));
        });
        setSparklineData(initialSparklines);

        // Update sparklines periodically
        const interval = setInterval(() => {
            setSparklineData(prev => {
                const updated = {};
                Object.keys(prev).forEach(key => {
                    const newData = [...prev[key].slice(1), {
                        value: sensorData[key] + (Math.random() - 0.5) * 5
                    }];
                    updated[key] = newData;
                });
                return updated;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [sensorData]);

    const sensors = [
        {
            label: 'Temperature',
            value: `${sensorData.temperature.toFixed(1)}°C`,
            icon: <Thermostat />,
            color: 'warning',
            trend: 'up',
            change: '+2.3°C',
            status: 'optimal',
            sparklineKey: 'temperature'
        },
        {
            label: 'Humidity',
            value: `${sensorData.humidity.toFixed(0)}%`,
            icon: <Opacity />,
            color: 'info',
            trend: 'down',
            change: '-3%',
            status: 'optimal',
            sparklineKey: 'humidity'
        },
        {
            label: 'Soil Moisture',
            value: `${sensorData.soilMoisture.toFixed(0)}%`,
            icon: <Grass />,
            color: 'success',
            trend: 'up',
            change: '+5%',
            status: 'optimal',
            sparklineKey: 'soilMoisture'
        },
        {
            label: 'Light Intensity',
            value: `${sensorData.lightLevel.toFixed(0)}%`,
            icon: <Brightness6 />,
            color: 'primary',
            trend: 'up',
            change: '+12%',
            status: 'high',
            sparklineKey: 'lightLevel'
        },
        {
            label: 'Soil pH Level',
            value: sensorData.soilPh.toFixed(1),
            icon: <Science />,
            color: 'secondary',
            trend: 'stable',
            change: '0',
            status: 'optimal',
            sparklineKey: 'soilPh'
        },
        {
            label: 'Nitrogen (N)',
            value: `${sensorData.nitrogenLevel} ppm`,
            icon: <LocalFlorist />,
            color: 'success',
            trend: 'down',
            change: '-8 ppm',
            status: 'low',
            sparklineKey: 'nitrogenLevel'
        },
        {
            label: 'Phosphorus (P)',
            value: `${sensorData.phosphorusLevel} ppm`,
            icon: <LocalFlorist />,
            color: 'info',
            trend: 'up',
            change: '+3 ppm',
            status: 'optimal',
            sparklineKey: 'phosphorusLevel'
        },
        {
            label: 'Potassium (K)',
            value: `${sensorData.potassiumLevel} ppm`,
            icon: <LocalFlorist />,
            color: 'warning',
            trend: 'up',
            change: '+5 ppm',
            status: 'optimal',
            sparklineKey: 'potassiumLevel'
        },
        {
            label: 'CO₂ Level',
            value: `${sensorData.co2Level} ppm`,
            icon: <Co2 />,
            color: 'error',
            trend: 'up',
            change: '+15 ppm',
            status: 'normal',
            sparklineKey: 'co2Level'
        },
        {
            label: 'Water Tank Level',
            value: `${sensorData.waterTankLevel}%`,
            icon: <WaterDrop />,
            color: 'primary',
            trend: 'down',
            change: '-5%',
            status: 'high',
            sparklineKey: 'waterTankLevel'
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'optimal': return 'success';
            case 'high': return 'warning';
            case 'low': return 'error';
            default: return 'default';
        }
    };

    return (
        <Grid container spacing={2}>
            {sensors.map((sensor, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack spacing={1.5}>
                                {/* Icon and Label */}
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Avatar sx={{ bgcolor: `${sensor.color}.light`, color: `${sensor.color}.main`, width: 36, height: 36 }}>
                                        {React.cloneElement(sensor.icon, { sx: { fontSize: 20 } })}
                                    </Avatar>
                                    <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ flex: 1 }}>
                                        {sensor.label}
                                    </Typography>
                                </Stack>

                                {/* Value */}
                                <Typography variant="h5" fontWeight={700} color="text.primary">
                                    {sensor.value}
                                </Typography>

                                {/* Sparkline Chart */}
                                {sparklineData[sensor.sparklineKey] && (
                                    <ResponsiveContainer width="100%" height={40}>
                                        <LineChart data={sparklineData[sensor.sparklineKey]}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke={sensor.color === 'warning' ? '#FFA726' : sensor.color === 'success' ? '#66BB6A' : sensor.color === 'info' ? '#29B6F6' : '#2E7D32'}
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}

                                {/* Trend and Status */}
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        {sensor.trend === 'up' ? (
                                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                                        ) : sensor.trend === 'down' ? (
                                            <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
                                        ) : null}
                                        <Typography variant="caption" color={sensor.trend === 'up' ? 'success.main' : sensor.trend === 'down' ? 'error.main' : 'text.secondary'}>
                                            {sensor.change}
                                        </Typography>
                                    </Stack>
                                    <Chip
                                        label={sensor.status}
                                        size="small"
                                        color={getStatusColor(sensor.status)}
                                        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                                    />
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SensorGrid;
