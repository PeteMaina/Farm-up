import React from 'react';
import { Box, Typography, Button, Stack, Container, Grid } from '@mui/material';
import { Download, CalendarMonth } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';
import FinancialOverview from './financials/FinancialOverview';
import RevenueChart from './financials/RevenueChart';
import ExpenseBreakdown from './financials/ExpenseBreakdown';
import TransactionHistory from './financials/TransactionHistory';

const FinancialReports = () => {
  const { showNotification } = useNotification();

  const handleExport = () => {
    showNotification('Exporting financial report...', 'info');
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 6 }}>
      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ letterSpacing: '-0.02em', mb: 0.5 }}>
            Financial Performance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive overview of farm revenue, expenses, and profitability.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<CalendarMonth />}>
            This Year
          </Button>
          <Button variant="contained" startIcon={<Download />} onClick={handleExport} sx={{ px: 3 }}>
            Download Report
          </Button>
        </Stack>
      </Stack>

      {/* Overview Cards */}
      <Box sx={{ mb: 4 }}>
        <FinancialOverview />
      </Box>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ExpenseBreakdown />
        </Grid>
      </Grid>

      {/* Transaction History */}
      <Box>
        <TransactionHistory />
      </Box>
    </Container>
  );
};

export default FinancialReports;
