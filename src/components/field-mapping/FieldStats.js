import React from 'react';
import { Card, CardHeader, CardContent, Grid, Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const FieldStats = () => {
    const cropData = [
        { name: 'Corn', value: 120, color: '#4caf50' },
        { name: 'Wheat', value: 80, color: '#ff9800' },
        { name: 'Soy', value: 50, color: '#2196f3' },
    ];

    const soilData = [
        { name: 'Loam', value: 60, fill: '#795548' },
        { name: 'Clay', value: 30, fill: '#8d6e63' },
        { name: 'Sandy', value: 10, fill: '#a1887f' },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)', color: 'white', p: 1, borderRadius: 1 }}>
                    <Typography variant="body2">{`${payload[0].name}: ${payload[0].value} ha`}</Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Grid container spacing={2}>
            {/* Crop Distribution */}
            <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <CardHeader title="Crop Distribution" titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }} />
                    <CardContent>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={cropData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {cropData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                            {cropData.map((entry) => (
                                <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: entry.color }} />
                                    <Typography variant="caption">{entry.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Soil Composition */}
            <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <CardHeader title="Soil Composition" titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }} />
                    <CardContent>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart data={soilData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default FieldStats;
