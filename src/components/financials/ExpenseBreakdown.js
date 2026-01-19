import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, Stack, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Labor', value: 35, color: '#FF6384' },
    { name: 'Fertilizers', value: 25, color: '#36A2EB' },
    { name: 'Equipment', value: 20, color: '#FFCE56' },
    { name: 'Utilities', value: 10, color: '#4BC0C0' },
    { name: 'Seeds', value: 10, color: '#9966FF' },
];

const ExpenseBreakdown = () => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Expense Breakdown" titleTypographyProps={{ fontWeight: 700 }} />
            <CardContent>
                <Box sx={{ height: 280, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {data.map((item) => (
                        <Stack key={item.name} direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                                <Typography variant="body2">{item.name}</Typography>
                            </Stack>
                            <Typography variant="body2" fontWeight={600}>{item.value}%</Typography>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ExpenseBreakdown;
