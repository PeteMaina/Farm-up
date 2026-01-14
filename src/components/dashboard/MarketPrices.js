import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocalization } from '../../context/LocalizationContext';

const MarketPrices = ({ cropType }) => {
    const { formatCurrency } = useLocalization();

    // Market price data for different crops (last 7 days)
    const priceHistory = {
        corn: [
            { day: 'Mon', price: 245 },
            { day: 'Tue', price: 248 },
            { day: 'Wed', price: 242 },
            { day: 'Thu', price: 250 },
            { day: 'Fri', price: 253 },
            { day: 'Sat', price: 255 },
            { day: 'Sun', price: 258 },
        ],
        wheat: [
            { day: 'Mon', price: 312 },
            { day: 'Tue', price: 310 },
            { day: 'Wed', price: 315 },
            { day: 'Thu', price: 318 },
            { day: 'Fri', price: 316 },
            { day: 'Sat', price: 320 },
            { day: 'Sun', price: 322 },
        ],
        tomatoes: [
            { day: 'Mon', price: 1850 },
            { day: 'Tue', price: 1820 },
            { day: 'Wed', price: 1880 },
            { day: 'Thu', price: 1900 },
            { day: 'Fri', price: 1920 },
            { day: 'Sat', price: 1890 },
            { day: 'Sun', price: 1950 },
        ],
        soybeans: [
            { day: 'Mon', price: 520 },
            { day: 'Tue', price: 518 },
            { day: 'Wed', price: 525 },
            { day: 'Thu', price: 530 },
            { day: 'Fri', price: 528 },
            { day: 'Sat', price: 535 },
            { day: 'Sun', price: 540 },
        ],
    };

    const currentPrices = [
        { crop: 'Corn', price: 258, change: 5.3, trend: 'up', unit: '/bushel' },
        { crop: 'Wheat', price: 322, change: 3.2, trend: 'up', unit: '/bushel' },
        { crop: 'Soybeans', price: 540, change: 3.8, trend: 'up', unit: '/bushel' },
        { crop: 'Tomatoes', price: 1950, change: 5.4, trend: 'up', unit: '/ton' },
        { crop: 'Cotton', price: 0.87, change: -1.2, trend: 'down', unit: '/lb' },
        { crop: 'Rice', price: 16.5, change: 0, trend: 'stable', unit: '/cwt' },
    ];

    const selectedCropData = priceHistory[cropType?.toLowerCase()] || priceHistory.corn;
    const currentPrice = selectedCropData[selectedCropData.length - 1].price;
    const previousPrice = selectedCropData[0].price;
    const priceChange = currentPrice - previousPrice;
    const percentChange = ((priceChange / previousPrice) * 100).toFixed(1);

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />;
            case 'down': return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />;
            default: return <TrendingFlat sx={{ fontSize: 16, color: 'text.secondary' }} />;
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return 'success';
            case 'down': return 'error';
            default: return 'default';
        }
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Market Prices
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Live commodity prices and trends
                        </Typography>
                    </Box>

                    {/* Featured Crop Price Chart */}
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {cropType || 'Corn'} Price Trend (7 Days)
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                                    <Typography variant="h4" fontWeight={700}>
                                        {formatCurrency(currentPrice)}
                                    </Typography>
                                    <Chip
                                        label={`${priceChange >= 0 ? '+' : ''}${percentChange}%`}
                                        size="small"
                                        color={priceChange >= 0 ? 'success' : 'error'}
                                        icon={priceChange >= 0 ? <TrendingUp /> : <TrendingDown />}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={selectedCropData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="day" style={{ fontSize: '12px' }} />
                                <YAxis style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#2E7D32"
                                    strokeWidth={3}
                                    dot={{ fill: '#2E7D32', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Market Overview Table */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            All Commodities
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="caption" fontWeight={700}>Commodity</Typography></TableCell>
                                    <TableCell align="right"><Typography variant="caption" fontWeight={700}>Price</Typography></TableCell>
                                    <TableCell align="right"><Typography variant="caption" fontWeight={700}>Change</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="caption" fontWeight={700}>Trend</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentPrices.map((item, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>{item.crop}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2">
                                                {formatCurrency(item.price)}
                                                <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem', ml: 0.5 }}>
                                                    {item.unit}
                                                </Box>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color={item.change > 0 ? 'success.main' : item.change < 0 ? 'error.main' : 'text.secondary'}
                                            >
                                                {item.change > 0 ? '+' : ''}{item.change}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={item.trend}
                                                size="small"
                                                color={getTrendColor(item.trend)}
                                                icon={getTrendIcon(item.trend)}
                                                sx={{ minWidth: 80 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default MarketPrices;
