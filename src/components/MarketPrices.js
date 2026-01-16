import React, { useState } from 'react';
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
  Avatar,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  BarChart,
  ShowChart,
  Refresh,
  Download,
} from '@mui/icons-material';
import { useLocalization } from '../context/LocalizationContext';
import { useNotification } from '../context/NotificationContext';

const MarketPrices = () => {
  const { formatCurrency, getUnitLabel } = useLocalization();
  const { showNotification } = useNotification();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const priceData = [
    { commodity: 'Corn', price: 4.25, unit: 'bushel', trend: 'up', change: '+2.4%' },
    { commodity: 'Wheat', price: 5.10, unit: 'bushel', trend: 'down', change: '-1.2%' },
    { commodity: 'Soybeans', price: 12.80, unit: 'bushel', trend: 'up', change: '+1.8%' },
    { commodity: 'Rice', price: 15.50, unit: 'cwt', trend: 'up', change: '+0.5%' },
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  const getChangeColor = (change) => {
    return change.startsWith('+') ? 'success' : 'error';
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Market Prices
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Live commodity prices and market trends.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 4 }} justifyContent="flex-end">
        <Button variant="outlined" startIcon={<Refresh />} onClick={() => showNotification('Market prices updated!', 'success')} >
          Refresh
        </Button>
        <Button variant="contained" startIcon={<Download />} onClick={() => showNotification('Exporting market data...', 'info')} >
          Export
        </Button>
      </Stack>

      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Prices" />
          <Tab label="Trends" />
          <Tab label="Analysis" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Corn Price"
                avatar={<Avatar sx={{ bgcolor: 'success.light' }}><TrendingUp color="success" /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>{formatCurrency(4.25)}</Typography>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  +2.4% from last week
                </Typography>
                <Typography variant="caption" color="text.secondary">per bushel</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Wheat Price"
                avatar={<Avatar sx={{ bgcolor: 'error.light' }}><TrendingDown color="error" /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>{formatCurrency(5.10)}</Typography>
                <Typography variant="body2" color="error.main" fontWeight={600}>
                  -1.2% from last week
                </Typography>
                <Typography variant="caption" color="text.secondary">per bushel</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Commodity Overview"
                avatar={<Avatar sx={{ bgcolor: 'info.main' }}><BarChart /></Avatar>}
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Commodity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priceData.map((row) => (
                        <TableRow key={row.commodity} hover>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>{row.commodity}</Typography>
                          </TableCell>
                          <TableCell>{formatCurrency(row.price)} / {row.unit}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.change}
                              color={getChangeColor(row.change)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            {getTrendIcon(row.trend)}
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

      {/* Placeholder for other tabs */}
      {tabValue > 0 && (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography color="text.secondary">Detailed market analysis loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MarketPrices;
