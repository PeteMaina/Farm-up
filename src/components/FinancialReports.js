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
  Avatar,
  Divider,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  AttachMoney,
  AccountBalance,
  MoneyOff,
  Description,
  Download,
  FilterList,
  Refresh,
  Timeline,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useLocalization } from '../context/LocalizationContext';

const FinancialReports = () => {
  const { formatCurrency } = useLocalization();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const financialData = {
    revenue: 125000,
    expenses: 85000,
    profit: 40000,
    margin: '32%',
  };

  const monthlyHistory = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 42000 },
  ];

  const transactionData = [
    { id: 'T001', date: '2026-06-15', desc: 'Market Corn Sale', category: 'Revenue', amount: 12400 },
    { id: 'T002', date: '2026-06-12', desc: 'Irrigation Maintenance', category: 'Expense', amount: 1200 },
    { id: 'T003', date: '2026-06-10', desc: 'Fertilizer Purchase', category: 'Expense', amount: 3500 },
    { id: 'T004', date: '2026-06-08', desc: 'Logistics and Transport', category: 'Expense', amount: 2800 },
    { id: 'T005', date: '2026-06-05', desc: 'Wheat Export Sale', category: 'Revenue', amount: 18500 },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
            Financial Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Analyze your farm's financial health, revenue, and expenses.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              alert('Financial reports updated!');
            }, 1000);
          }} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="contained" startIcon={<Download />} onClick={() => alert('PDF report is being generated and will download shortly...')}>
            Download PDF
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1} color="success.main">
                  <AttachMoney />
                  <Typography variant="subtitle2" fontWeight={600}>Total Revenue</Typography>
                </Stack>
                <Typography variant="h4" fontWeight={700}>
                  {formatCurrency(financialData.revenue)}
                </Typography>
                <Typography variant="caption" color="success.main" fontWeight={600}>
                  +12.4% vs last Q
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1} color="primary.main">
                  <AccountBalance />
                  <Typography variant="subtitle2" fontWeight={600}>Net Profit</Typography>
                </Stack>
                <Typography variant="h4" fontWeight={700}>
                  {formatCurrency(financialData.profit)}
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={600}>
                  Margin: {financialData.margin}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader title="Recent Transactions" avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Timeline /></Avatar>} />
        <Divider />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.date}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.desc}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell align="right" sx={{ color: row.category === 'Revenue' ? 'success.main' : 'error.main', fontWeight: 700 }}>
                      {row.category === 'Revenue' ? '+' : '-'}{formatCurrency(row.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FinancialReports;
