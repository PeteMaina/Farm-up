import React from 'react';
import { Grid, Card, CardContent, Typography, Stack, Box, alpha, useTheme } from '@mui/material';
import { AttachMoney, TrendingUp, TrendingDown, AccountBalance, Savings } from '@mui/icons-material';

const MetricCard = ({ title, value, change, icon, color }) => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    right: -20,
                    top: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: alpha(color, 0.1),
                    zIndex: 0,
                }}
            />
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight={800} sx={{ color: 'text.primary', mb: 1 }}>
                            {value}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 3,
                            bgcolor: alpha(color, 0.1),
                            color: color,
                            display: 'flex'
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: change.startsWith('+') ? 'success.main' : 'error.main',
                            bgcolor: change.startsWith('+') ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontWeight: 700,
                            fontSize: '0.75rem'
                        }}
                    >
                        {change.startsWith('+') ? <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />}
                        {change}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        vs last month
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

const FinancialOverview = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <MetricCard
                    title="Total Revenue"
                    value="$128,430"
                    change="+12.5%"
                    icon={<AttachMoney />}
                    color={theme.palette.primary.main}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <MetricCard
                    title="Total Expenses"
                    value="$64,200"
                    change="-2.4%"
                    icon={<TrendingDown />}
                    color={theme.palette.error.main}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <MetricCard
                    title="Net Profit"
                    value="$64,230"
                    change="+28.4%"
                    icon={<AccountBalance />}
                    color={theme.palette.success.main}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <MetricCard
                    title="Est. ROI"
                    value="24.8%"
                    change="+5.2%"
                    icon={<Savings />}
                    color={theme.palette.warning.main}
                />
            </Grid>
        </Grid>
    );
};

export default FinancialOverview;
