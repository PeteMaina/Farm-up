import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import {
  Smartphone,
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryAlert,
  SignalCellularAlt,
  MoreVert,
  Refresh,
  Add
} from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const IoTSensors = () => {
  const { showNotification } = useNotification();
  const sensors = [
    { name: 'Soil Moisture 1', status: 'Online', battery: 85, location: 'Field A', signal: 'Strong', type: 'Moisture' },
    { name: 'Temp Sensor A', status: 'Online', battery: 92, location: 'Greenhouse', signal: 'Excellent', type: 'Temperature' },
    { name: 'Weather Station', status: 'Offline', battery: 0, location: 'Main Field', signal: 'None', type: 'Weather' },
    { name: 'Irrigation Monitor', status: 'Online', battery: 45, location: 'Field B', signal: 'Medium', type: 'Irrigation' },
  ];

  const getStatusColor = (status) => (status === 'Online' ? 'success' : 'error');

  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
            IoT Sensors
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time status of your connected farm devices.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton color="primary" onClick={() => showNotification('Refreshing sensor data...', 'info')}><Refresh /></IconButton>
          <IconButton color="primary" onClick={() => showNotification('Add new sensor form...', 'info')}><Add /></IconButton>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {sensors.map((sensor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', opacity: sensor.status === 'Offline' ? 0.8 : 1 }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: sensor.status === 'Online' ? 'primary.main' : 'grey.400' }}><Smartphone /></Avatar>}
                action={<IconButton><MoreVert /></IconButton>}
                title={<Typography variant="subtitle2" fontWeight={700}>{sensor.name}</Typography>}
                subheader={sensor.location}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip
                      icon={sensor.status === 'Online' ? <Wifi fontSize="small" /> : <WifiOff fontSize="small" />}
                      label={sensor.status}
                      color={getStatusColor(sensor.status)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Signal</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <SignalCellularAlt fontSize="small" color="action" />
                      <Typography variant="body2">{sensor.signal}</Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption">Battery</Typography>
                      <Typography variant="caption" fontWeight={600}>{sensor.battery}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={sensor.battery}
                      color={sensor.battery < 20 ? 'error' : 'success'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Network Health" />
            <Divider />
            <CardContent>
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={4}>
                  <Typography variant="h4" color="success.main">98%</Typography>
                  <Typography variant="caption">Uptime</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" color="primary">42ms</Typography>
                  <Typography variant="caption">Latency</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4">15</Typography>
                  <Typography variant="caption">Active Nodes</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IoTSensors;
