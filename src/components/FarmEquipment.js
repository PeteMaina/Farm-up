import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Avatar,
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import {
  Agriculture,
  Build,
  Schedule,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  MoreVert,
  Add
} from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const FarmEquipment = () => {
  const { showNotification } = useNotification();
  const equipment = [
    { name: 'John Deere Tractor', status: 'Operational', maintenance: 'Due in 45 days', location: 'Barn A', type: 'Tractor' },
    { name: 'Irrigation Pump', status: 'Maintenance Required', maintenance: 'Overdue', location: 'Field B', type: 'Irrigation' },
    { name: 'Harvester', status: 'Operational', maintenance: 'Due in 120 days', location: 'Equipment Shed', type: 'Harvester' },
    { name: 'Seeder', status: 'Out of Service', maintenance: 'Scheduled for tomorrow', location: 'Workshop', type: 'Seeder' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'success';
      case 'Maintenance Required': return 'warning';
      case 'Out of Service': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Operational': return <CheckCircle fontSize="small" />;
      case 'Maintenance Required': return <Warning fontSize="small" />;
      case 'Out of Service': return <ErrorIcon fontSize="small" />;
      default: return null;
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
            Farm Equipment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor status, maintenance schedules, and inventory.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => showNotification('Form to add new equipment...', 'info')}>
          Add Equipment
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {equipment.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'primary.light' }}><Agriculture color="primary" /></Avatar>}
                action={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
                title={<Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>}
                subheader={item.type}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip
                      icon={getStatusIcon(item.status)}
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Location</Typography>
                    <Typography variant="body2" fontWeight={500}>{item.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Maintenance</Typography>
                    <Typography variant="caption" color={item.maintenance === 'Overdue' ? 'error' : 'text.primary'} fontWeight={item.maintenance === 'Overdue' ? 700 : 400}>
                      {item.maintenance}
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="outlined" size="small" fullWidth sx={{ mt: 3 }} onClick={() => showNotification(`Viewing details for ${item.name}...`, 'info')}>
                  Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Maintenance Schedule"
              avatar={<Avatar sx={{ bgcolor: 'secondary.light' }}><Schedule color="secondary" /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2} sx={{ mb: 2 }}>
                <Typography variant="body2">Upcoming tasks for the next 7 days.</Typography>
                {/* Placeholder for schedule items */}
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Irrigation Pump Service</Typography>
                  <Typography variant="caption" color="error">Due: Today</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Tractor Oil Change</Typography>
                  <Typography variant="caption" color="text.secondary">Due: Next Monday</Typography>
                </Box>
              </Stack>
              <Button variant="contained" startIcon={<Build />} fullWidth onClick={() => showNotification('Opening full maintenance schedule...', 'info')}>
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Equipment Stats"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={4}>
                  <Typography variant="h4" color="primary">12</Typography>
                  <Typography variant="caption">Total Units</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" color="success.main">10</Typography>
                  <Typography variant="caption">Operational</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" color="error.main">2</Typography>
                  <Typography variant="caption">Needs Service</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FarmEquipment;
