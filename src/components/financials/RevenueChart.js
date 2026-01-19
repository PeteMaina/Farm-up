import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, Button, Stack, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from '@mui/icons-material';

const data = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
    { month: 'Jul', revenue: 3490, expenses: 4300 },
    { month: 'Aug', revenue: 4000, expenses: 2400 },
    { month: 'Sep', revenue: 5600, expenses: 4300 },
    { month: 'Oct', revenue: 6500, expenses: 5100 },
    { month: 'Nov', revenue: 6000, expenses: 4800 },
    { month: 'Dec', revenue: 7200, expenses: 5200 },
];

const RevenueChart = () => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title="Revenue vs Expenses"
                titleTypographyProps={{ fontWeight: 700 }}
                action={
                    <Button size="small" startIcon={<Download />}>
                        Export
                    </Button>
                }
            />
            <CardContent>
                <Box sx={{ height: 350, width: '100%' }}>
                    <ResponsiveContainer>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend iconType="circle" />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke={theme.palette.primary.main}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                strokeWidth={2}
                                name="Income"
                            />
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                stroke={theme.palette.error.main}
                                fillOpacity={1}
                                fill="url(#colorExpenses)"
                                strokeWidth={2}
                                name="Expenses"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
