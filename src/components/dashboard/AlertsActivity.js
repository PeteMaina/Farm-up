import React from 'react';
import { Card, CardContent, Typography, Box, Stack, List, ListItem, ListItemText, Chip, Avatar } from '@mui/material';
import {
    Warning,
    Info,
    CheckCircle,
    WaterDrop,
    BugReport,
    Agriculture,
    Build,
    Schedule,
} from '@mui/icons-material';

const AlertsActivity = () => {
    const alerts = [
        {
            type: 'warning',
            title: 'Low Nitrogen Levels Detected',
            description: 'Field B nitrogen levels below optimal threshold',
            time: '15 mins ago',
            icon: <Warning />,
        },
        {
            type: 'info',
            title: 'Irrigation Scheduled',
            description: 'Zone 3 irrigation will begin at 6:00 PM',
            time: '1 hour ago',
            icon: <WaterDrop />,
        },
        {
            type: 'warning',
            title: 'Pest Activity Detected',
            description: 'Increased aphid population in Field A',
            time: '2 hours ago',
            icon: <BugReport />,
        },
    ];

    const recentActivities = [
        {
            user: 'John Smith',
            action: 'Completed field inspection in Zone A',
            time: '5 mins ago',
            icon: <CheckCircle />,
            color: 'success',
        },
        {
            user: 'Mike Johnson',
            action: 'Started plowing operation in Field B',
            time: '25 mins ago',
            icon: <Agriculture />,
            color: 'primary',
        },
        {
            user: 'James Wilson',
            action: 'Completed harvester maintenance',
            time: '45 mins ago',
            icon: <Build />,
            color: 'warning',
        },
        {
            user: 'Sarah Williams',
            action: 'Adjusted irrigation schedule for Zone 2',
            time: '1 hour ago',
            icon: <WaterDrop />,
            color: 'info',
        },
        {
            user: 'Emily Davis',
            action: 'Submitted quality control report',
            time: '1.5 hours ago',
            icon: <CheckCircle />,
            color: 'success',
        },
        {
            user: 'David Brown',
            action: 'Logged equipment usage for Tractor #2',
            time: '2 hours ago',
            icon: <Schedule />,
            color: 'default',
        },
    ];

    const getAlertColor = (type) => {
        switch (type) {
            case 'warning': return 'warning';
            case 'error': return 'error';
            case 'info': return 'info';
            case 'success': return 'success';
            default: return 'default';
        }
    };

    return (
        <Stack spacing={3}>
            {/* Alerts Card */}
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                Active Alerts
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Critical notifications requiring attention
                            </Typography>
                        </Box>

                        <List sx={{ p: 0 }}>
                            {alerts.map((alert, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        mb: 1,
                                        bgcolor: `${getAlertColor(alert.type)}.light`,
                                        '&:hover': {
                                            bgcolor: `${getAlertColor(alert.type)}.lighter`,
                                        },
                                    }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="flex-start" width="100%">
                                        <Avatar sx={{ bgcolor: `${getAlertColor(alert.type)}.main`, color: 'white' }}>
                                            {alert.icon}
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {alert.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {alert.description}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" mt={0.5}>
                                                {alert.time}
                                            </Typography>
                                        </Box>
                                        <Chip label={alert.type.toUpperCase()} size="small" color={getAlertColor(alert.type)} />
                                    </Stack>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                Recent Activity
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Latest actions and updates across the farm
                            </Typography>
                        </Box>

                        <List sx={{ p: 0 }}>
                            {recentActivities.map((activity, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                                        borderColor: 'divider',
                                        px: 0,
                                        py: 1.5,
                                    }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center" width="100%">
                                        <Avatar sx={{ bgcolor: `${activity.color}.light`, color: `${activity.color}.main`, width: 36, height: 36 }}>
                                            {React.cloneElement(activity.icon, { sx: { fontSize: 20 } })}
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="body2" fontWeight={600}>
                                                {activity.user}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {activity.action}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {activity.time}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default AlertsActivity;
