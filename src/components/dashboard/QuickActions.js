import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Stack } from '@mui/material';
import {
    Add,
    WaterDrop,
    LocalFlorist,
    Assignment,
    ShoppingCart,
    BugReport,
    Assessment,
    CameraAlt,
    Notifications,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const QuickActions = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const actions = [
        {
            label: 'Log Irrigation',
            icon: <WaterDrop />,
            color: 'info',
            route: '/irrigation-control',
        },
        {
            label: 'Add Crop',
            icon: <Add />,
            color: 'success',
            route: '/crop-analytics',
        },
        {
            label: 'Order Fertilizer',
            icon: <ShoppingCart />,
            color: 'warning',
            route: '/fertilizer-planner',
        },
        {
            label: 'Report Pest',
            icon: <BugReport />,
            color: 'error',
            route: '/pest-control',
        },
        {
            label: 'Field Scouting',
            icon: <CameraAlt />,
            color: 'primary',
            route: '/field-mapping',
        },
        {
            label: 'Task Assignment',
            icon: <Assignment />,
            color: 'secondary',
            route: '/labor-management',
        },
        {
            label: 'View Analytics',
            icon: <Assessment />,
            color: 'success',
            route: '/crop-analytics',
        },
        {
            label: 'Manage Alerts',
            icon: <Notifications />,
            color: 'warning',
            route: '/settings',
        },
    ];

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Quick Actions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Frequently used operations
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        {actions.map((action, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Button
                                    variant="contained"
                                    color={action.color}
                                    fullWidth
                                    sx={{
                                        py: 2,
                                        flexDirection: 'column',
                                        gap: 1,
                                        height: '100%',
                                        minHeight: 100,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 4,
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                    onClick={() => {
                                        showNotification(`Navigating to ${action.label}...`, 'info');
                                        navigate(action.route);
                                    }}
                                >
                                    {React.cloneElement(action.icon, { sx: { fontSize: 32 } })}
                                    <Typography variant="caption" fontWeight={600} textAlign="center">
                                        {action.label}
                                    </Typography>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
