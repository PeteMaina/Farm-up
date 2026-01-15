import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Avatar,
  Divider,
  Stack,
  Button
} from '@mui/material';
import { NatureOutlined as Eco, Recycling, Nature, WaterDrop, Co2 } from '@mui/icons-material';

const Sustainability = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Sustainability
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your farms environmental impact and eco-friendly initiatives.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Carbon Footprint"
              avatar={<Avatar sx={{ bgcolor: 'grey.800' }}><Co2 /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight={700} color="success.main">-15%</Typography>
                <Typography variant="body2" color="text.secondary">Reduction vs Last Year</Typography>
              </Box>
              <Typography variant="subtitle2" gutterBottom>Target: -20% by Q4</Typography>
              <LinearProgress variant="determinate" value={75} color="success" sx={{ height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Water Conservation"
              avatar={<Avatar sx={{ bgcolor: 'info.main' }}><WaterDrop /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight={700} color="info.main">2.5k L</Typography>
                <Typography variant="body2" color="text.secondary">Water Saved This Month</Typography>
              </Box>
              <Typography variant="subtitle2" gutterBottom>Efficiency Rating: Excellent</Typography>
              <LinearProgress variant="determinate" value={88} color="info" sx={{ height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Biodiversity Index"
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Nature /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight={700} color="secondary.main">8.2</Typography>
                <Typography variant="body2" color="text.secondary">Ecosystem Health Score</Typography>
              </Box>
              <Typography variant="subtitle2" gutterBottom>Status: Thriving</Typography>
              <LinearProgress variant="determinate" value={82} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Eco-Initiatives" avatar={<Eco color="success" />} />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Active Programs</Typography>
                  <ul style={{ paddingLeft: 20 }}>
                    <li><Typography variant="body1">Solar Panel Installation (Phase 1 Complete)</Typography></li>
                    <li><Typography variant="body1">Composting Organic Waste (Ongoing)</Typography></li>
                    <li><Typography variant="body1">Pollinator Habitat Restoration</Typography></li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                  <Button variant="contained" color="success" size="large" onClick={() => alert('Sustainability report is being generated...')}>
                    Download Sustainability Report
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

export default Sustainability;
