import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardHeader, Button, TextField, Avatar, Divider, Stack } from '@mui/material';
import { Science, Grass as LocalFlorist, CalendarMonth } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const FertilizerPlanner = () => {
  const { showNotification } = useNotification();
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Fertilizer Planner
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Plan and schedule fertilizer applications for optimal crop nutrition.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Nitrogen Application"
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><Science /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Log Application</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Amount (kg/ha)"
                  type="number"
                  defaultValue={120}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Application Date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
                <Button variant="contained" size="large" fullWidth onClick={() => showNotification('Fertilizer application scheduled!', 'success')}>
                  Schedule Application
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Phosphorus & Potassium"
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><LocalFlorist /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Recommended Dosage</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="h5" color="secondary.main">80 kg</Typography>
                      <Typography variant="caption" display="block">Phosphorus (P)</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="h5" color="secondary.main">120 kg</Typography>
                      <Typography variant="caption" display="block">Potassium (K)</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Button variant="outlined" startIcon={<CalendarMonth />} fullWidth onClick={() => showNotification('Viewing full schedule...', 'info')}>
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FertilizerPlanner;
