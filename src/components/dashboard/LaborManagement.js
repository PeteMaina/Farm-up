import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Avatar, Chip, List, ListItem, Grid } from '@mui/material';
import { Person, CheckCircle, AccessTime, Agriculture } from '@mui/icons-material';

const LaborManagement = () => {
    const workers = [
        {
            name: 'John Smith',
            role: 'Farm Manager',
            status: 'Active',
            currentTask: 'Field Inspection - Zone A',
            startTime: '07:00 AM',
            hoursWorked: 5.5,
            location: 'Field A',
        },
        {
            name: 'Mike Johnson',
            role: 'Tractor Operator',
            status: 'Active',
            currentTask: 'Plowing Field B',
            startTime: '06:30 AM',
            hoursWorked: 6.0,
            location: 'Field B',
        },
        {
            name: 'Sarah Williams',
            role: 'Irrigation Specialist',
            status: 'Active',
            currentTask: 'System Maintenance',
            startTime: '08:00 AM',
            hoursWorked: 4.5,
            location: 'Irrigation Hub',
        },
        {
            name: 'David Brown',
            role: 'Harvester Operator',
            status: 'Break',
            currentTask: 'Lunch Break',
            startTime: '07:00 AM',
            hoursWorked: 5.0,
            location: 'Break Room',
        },
        {
            name: 'Emily Davis',
            role: 'Quality Control',
            status: 'Active',
            currentTask: 'Crop Sampling',
            startTime: '08:30 AM',
            hoursWorked: 4.0,
            location: 'Field C',
        },
        {
            name: 'James Wilson',
            role: 'Equipment Technician',
            status: 'Active',
            currentTask: 'Harvester Maintenance',
            startTime: '07:30 AM',
            hoursWorked: 5.0,
            location: 'Workshop',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Break': return 'warning';
            case 'Offline': return 'default';
            default: return 'default';
        }
    };

    const totalHours = workers.reduce((sum, worker) => sum + worker.hoursWorked, 0);
    const activeWorkers = workers.filter(w => w.status === 'Active').length;

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Labor Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Active workforce and task assignments
                        </Typography>
                    </Box>

                    {/* Summary Stats */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="success.main">{activeWorkers}</Typography>
                                <Typography variant="caption" color="text.secondary">Active Workers</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="primary.main">{workers.length}</Typography>
                                <Typography variant="caption" color="text.secondary">Total Clocked In</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="text.primary">{totalHours.toFixed(1)}h</Typography>
                                <Typography variant="caption" color="text.secondary">Total Hours Today</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Typography variant="h4" fontWeight={700} color="warning.main">1</Typography>
                                <Typography variant="caption" color="text.secondary">On Break</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Worker List */}
                    <List sx={{ p: 0 }}>
                        {workers.map((worker, index) => (
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
                                    {/* Top Row */}
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <Person />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {worker.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {worker.role}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={worker.status}
                                            size="small"
                                            color={getStatusColor(worker.status)}
                                            icon={worker.status === 'Active' ? <CheckCircle /> : <AccessTime />}
                                        />
                                    </Stack>

                                    {/* Details Grid */}
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="caption" color="text.secondary">Current Task</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <Agriculture sx={{ fontSize: 16, color: 'primary.main' }} />
                                                <Typography variant="body2" fontWeight={600}>{worker.currentTask}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Location</Typography>
                                            <Typography variant="body2" fontWeight={600}>{worker.location}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={2}>
                                            <Typography variant="caption" color="text.secondary">Start Time</Typography>
                                            <Typography variant="body2" fontWeight={600}>{worker.startTime}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="caption" color="text.secondary">Hours Worked</Typography>
                                            <Typography variant="body2" fontWeight={600} color="primary.main">{worker.hoursWorked}h</Typography>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default LaborManagement;
