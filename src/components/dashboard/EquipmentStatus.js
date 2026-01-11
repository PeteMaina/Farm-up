import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, LinearProgress, List, ListItem, ListItemText, Avatar, Grid } from '@mui/material';
import { Agriculture, FlightTakeoff, Build, BatteryFull, Battery60, Battery20, CheckCircle, Warning, Error as ErrorIcon } from '@mui/icons-material';

const EquipmentStatus = () => {
    const equipment = [
        {
            name: 'Tractor #1 (John Deere 8R)',
            type: 'Tractor',
            status: 'Active',
            battery: 85,
            location: 'Field A - North',
            task: 'Plowing',
            operator: 'Mike Johnson',
            hoursUsed: 4.5,
            maintenanceDue: 45,
            icon: <Agriculture />
        },
        {
            name: 'Tractor #2 (Kubota M7)',
            type: 'Tractor',
            status: 'Idle',
            battery: 100,
            location: 'Barn',
            task: 'Standby',
            operator: null,
            hoursUsed: 0,
            maintenanceDue: 120,
            icon: <Agriculture />
        },
        {
            name: 'Drone #1 (DJI Agras T40)',
            type: 'Drone',
            status: 'Active',
            battery: 62,
            location: 'Field B - South',
            task: 'Spraying Pesticides',
            operator: 'Auto-Pilot',
            hoursUsed: 1.2,
            maintenanceDue: 15,
            icon: <FlightTakeoff />
        },
        {
            name: 'Drone #2 (DJI Agras T20)',
            type: 'Drone',
            status: 'Charging',
            battery: 45,
            location: 'Charging Station',
            task: 'Recharging',
            operator: null,
            hoursUsed: 2.8,
            maintenanceDue: 85,
            icon: <FlightTakeoff />
        },
        {
            name: 'Harvester (Case IH Axial)',
            type: 'Harvester',
            status: 'Maintenance',
            battery: null,
            location: 'Workshop',
            task: 'Oil Change',
            operator: 'Maintenance Crew',
            hoursUsed: 0,
            maintenanceDue: 0,
            icon: <Build />
        },
        {
            name: 'Irrigation Pump #1',
            type: 'Pump',
            status: 'Active',
            battery: null,
            location: 'Field C - East',
            task: 'Watering Zone 3',
            operator: 'Automated',
            hoursUsed: 6.5,
            maintenanceDue: 200,
            icon: <Build />
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Idle': return 'default';
            case 'Charging': return 'info';
            case 'Maintenance': return 'warning';
            default: return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active': return <CheckCircle sx={{ fontSize: 16 }} />;
            case 'Idle': return <CheckCircle sx={{ fontSize: 16 }} />;
            case 'Charging': return <Battery60 sx={{ fontSize: 16 }} />;
            case 'Maintenance': return <Warning sx={{ fontSize: 16 }} />;
            default: return null;
        }
    };

    const getBatteryIcon = (battery) => {
        if (!battery) return null;
        if (battery >= 70) return <BatteryFull color="success" />;
        if (battery >= 30) return <Battery60 color="warning" />;
        return <Battery20 color="error" />;
    };

    const getBatteryColor = (battery) => {
        if (battery >= 70) return 'success';
        if (battery >= 30) return 'warning';
        return 'error';
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Equipment & Machinery Status
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Real-time monitoring of farm equipment
                        </Typography>
                    </Box>

                    {/* Summary Stats */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="success.main">3</Typography>
                                <Typography variant="caption" color="text.secondary">Active</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="text.secondary">1</Typography>
                                <Typography variant="caption" color="text.secondary">Idle</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="warning.main">1</Typography>
                                <Typography variant="caption" color="text.secondary">Maintenance</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="info.main">1</Typography>
                                <Typography variant="caption" color="text.secondary">Charging</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Equipment List */}
                    <List sx={{ p: 0 }}>
                        {equipment.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    mb: 1.5,
                                    bgcolor: 'background.paper',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                <Stack spacing={1.5} sx={{ width: '100%' }}>
                                    {/* Top Row: Icon, Name, Status */}
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                            {item.icon}
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {item.location}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={getStatusColor(item.status)}
                                            icon={getStatusIcon(item.status)}
                                        />
                                    </Stack>

                                    {/* Details Grid */}
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Current Task</Typography>
                                            <Typography variant="body2" fontWeight={600}>{item.task}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Operator</Typography>
                                            <Typography variant="body2" fontWeight={600}>{item.operator || 'None'}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Hours Used Today</Typography>
                                            <Typography variant="body2" fontWeight={600}>{item.hoursUsed}h</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Maintenance Due</Typography>
                                            <Typography variant="body2" fontWeight={600}>{item.maintenanceDue > 0 ? `${item.maintenanceDue}h` : 'Now'}</Typography>
                                        </Grid>
                                    </Grid>

                                    {/* Battery/Fuel Status */}
                                    {item.battery !== null && (
                                        <Stack spacing={0.5}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                                    {getBatteryIcon(item.battery)}
                                                    <Typography variant="caption" fontWeight={600}>Battery</Typography>
                                                </Stack>
                                                <Typography variant="caption" fontWeight={600} color={`${getBatteryColor(item.battery)}.main`}>
                                                    {item.battery}%
                                                </Typography>
                                            </Stack>
                                            <LinearProgress
                                                variant="determinate"
                                                value={item.battery}
                                                color={getBatteryColor(item.battery)}
                                                sx={{ height: 6, borderRadius: 3 }}
                                            />
                                        </Stack>
                                    )}
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EquipmentStatus;
