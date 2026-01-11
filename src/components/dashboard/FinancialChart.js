import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Grid, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, AttachMoney, MoneyOff, AccountBalance } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const FinancialChart = () => {
    // Monthly revenue vs expenses data
    const monthlyData = [
        { month: 'Jan', revenue: 45000, expenses: 32000 },
        { month: 'Feb', revenue: 52000, expenses: 35000 },
        { month: 'Mar', revenue: 48000, expenses: 33000 },
        { month: 'Apr', revenue: 61000, expenses: 38000 },
        { month: 'May', revenue: 55000, expenses: 36000 },
        { month: 'Jun', revenue: 67000, expenses: 42000 },
    ];

    // Expense breakdown
    const expenseBreakdown = [
        { name: 'Labor', value: 35, color: '#2E7D32' },
        { name: 'Equipment', value: 25, color: '#0288D1' },
        { name: 'Fertilizer', value: 20, color: '#FFA726' },
        { name: 'Seeds', value: 12, color: '#66BB6A' },
        { name: 'Utilities', value: 8, color: '#29B6F6' },
    ];

    // Calculate totals
    const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
    const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
    const profit = totalRevenue - totalExpenses;
    const profitMargin = ((profit / totalRevenue) * 100).toFixed(1);

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Financial Overview
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Year-to-date financial performance
                        </Typography>
                    </Box>

                    {/* Summary Cards */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <AttachMoney />
                                            <Typography variant="subtitle2">Total Revenue</Typography>
                                        </Stack>
                                        <Typography variant="h4" fontWeight={700}>
                                            ${(totalRevenue / 1000).toFixed(0)}K
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <TrendingUp sx={{ fontSize: 16 }} />
                                            <Typography variant="caption">+12.5% vs last period</Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Card sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <MoneyOff />
                                            <Typography variant="subtitle2">Total Expenses</Typography>
                                        </Stack>
                                        <Typography variant="h4" fontWeight={700}>
                                            ${(totalExpenses / 1000).toFixed(0)}K
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <TrendingUp sx={{ fontSize: 16 }} />
                                            <Typography variant="caption">+8.3% vs last period</Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <AccountBalance />
                                            <Typography variant="subtitle2">Net Profit</Typography>
                                        </Stack>
                                        <Typography variant="h4" fontWeight={700}>
                                            ${(profit / 1000).toFixed(0)}K
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <Typography variant="caption">Margin: {profitMargin}%</Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Revenue vs Expenses Bar Chart */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Monthly Revenue vs Expenses
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                                <YAxis style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#66BB6A" name="Revenue" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="expenses" fill="#EF5350" name="Expenses" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Expense Breakdown Pie Chart */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Expense Breakdown
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={expenseBreakdown}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {expenseBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1.5} justifyContent="center" height="100%">
                                    {expenseBreakdown.map((item, index) => (
                                        <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: item.color }} />
                                                <Typography variant="body2">{item.name}</Typography>
                                            </Stack>
                                            <Typography variant="body2" fontWeight={600}>{item.value}%</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FinancialChart;
