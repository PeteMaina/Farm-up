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
  Divider,
  Stack,
  Chip
} from '@mui/material';
import { Map, GpsFixed, Layers, ZoomIn, Edit, Share } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const FieldMapping = () => {
  const { showNotification } = useNotification();
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Field Mapping
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interactive field boundaries, soil zones, and crop distribution maps.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Field Map"
              subheader="Viewing: Main Farm"
              avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Map /></Avatar>}
              action={
                <Stack direction="row" spacing={1}>
                  <Button size="small" startIcon={<Share />} onClick={() => showNotification('Sharing field map link...', 'info')}>Share</Button>
                  <Button size="small" startIcon={<Edit />} onClick={() => showNotification('Entering field map edit mode...', 'info')}>Edit</Button>
                </Stack>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{
                height: 450,
                bgcolor: 'grey.100',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                border: '1px dashed #ccc'
              }}>
                <Typography variant="body1" color="text.secondary">
                  Interactive Map Component Placeholder
                  <br />
                  (Google Maps / Leaflet Integration)
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" startIcon={<ZoomIn />} onClick={() => showNotification('Zooming in to map...', 'info')}>
                  Zoom In
                </Button>
                <Button variant="outlined" startIcon={<Layers />} onClick={() => showNotification('Toggling map layers...', 'info')}>
                  Layers
                </Button>
                <Button variant="outlined" startIcon={<GpsFixed />} onClick={() => showNotification('Locating current devices on map...', 'info')}>
                  Locate Me
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Field Statistics"
              avatar={<Avatar sx={{ bgcolor: 'success.main' }}><Layers /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Total Area</Typography>
                  <Typography variant="h4" color="primary">250 <Typography component="span" variant="h6">ha</Typography></Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Active Crops</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="Corn (120 ha)" color="success" variant="outlined" />
                    <Chip label="Wheat (80 ha)" color="warning" variant="outlined" />
                    <Chip label="Soy (50 ha)" color="secondary" variant="outlined" />
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Soil Zones</Typography>
                  <Typography variant="body2" color="text.secondary">
                    3 distinct soil types identified.
                    <br />
                    - Loam (60%)
                    <br />
                    - Clay (30%)
                    <br />
                    - Sandy (10%)
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FieldMapping;
