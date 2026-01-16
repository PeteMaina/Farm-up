import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Avatar,
  Stack,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import { People, Work, Schedule, MoreVert, Phone, Email } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const LaborManagement = () => {
  const { showNotification } = useNotification();
  const workers = [
    { name: 'John Smith', role: 'Farm Manager', tasks: 5, status: 'On Shift' },
    { name: 'Maria Garcia', role: 'Irrigation Specialist', tasks: 3, status: 'On Shift' },
    { name: 'David Lee', role: 'Equipment Operator', tasks: 4, status: 'Break' },
    { name: 'Sarah Johnson', role: 'Crop Scout', tasks: 2, status: 'Off Duty' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Shift': return 'success';
      case 'Break': return 'warning';
      case 'Off Duty': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Labor Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Workforce overview, task assignments, and scheduling.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {workers.map((worker, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{worker.name[0]}</Avatar>}
                action={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
                title={<Typography variant="subtitle2" fontWeight={700}>{worker.name}</Typography>}
                subheader={worker.role}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip label={worker.status} color={getStatusColor(worker.status)} size="small" variant="filled" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Active Tasks</Typography>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: 'secondary.main' }}>{worker.tasks}</Avatar>
                  </Box>
                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ pt: 1 }}>
                    <IconButton size="small" color="primary" onClick={() => showNotification(`Calling ${worker.name}...`, 'info')}><Phone fontSize="small" /></IconButton>
                    <IconButton size="small" color="primary" onClick={() => showNotification(`Emailing ${worker.name}...`, 'info')}><Email fontSize="small" /></IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Task Management"
              avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Work /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="body1">
                    Assign tasks, monitor progress, and manage shifts efficiently.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                  <Button variant="contained" startIcon={<Schedule />} onClick={() => showNotification('Opening workforce schedule...', 'info')}>
                    View Schedule
                  </Button>
                  <Button variant="outlined" sx={{ ml: 2 }} onClick={() => showNotification('Opening task assignment form...', 'info')}>
                    Assign Task
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LaborManagement;
