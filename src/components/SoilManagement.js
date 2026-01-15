import React from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import { Grass, Science, Opacity, Nature, Spa } from '@mui/icons-material';

const cropNutrientsInfo = {
  corn: {
    phOptimal: '6.0 - 6.8',
    moistureOptimal: '40% - 50%',
    nitrogen: 'High',
    phosphorus: 'Medium',
    potassium: 'Medium',
  },
  wheat: {
    phOptimal: '6.0 - 7.0',
    moistureOptimal: '30% - 40%',
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'High',
  },
  rice: {
    phOptimal: '5.5 - 6.5',
    moistureOptimal: '50% - 70%',
    nitrogen: 'High',
    phosphorus: 'High',
    potassium: 'Medium',
  },
  default: {
    phOptimal: '6.0 - 7.0',
    moistureOptimal: '40% - 50%',
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'Medium',
  },
};

import { useLocalization } from '../context/LocalizationContext';

const SoilManagement = ({ location, cropType = 'default' }) => {
  const { getUnitLabel, convertUnit } = useLocalization();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample dynamic data
  const nutrients = cropNutrientsInfo[cropType] || cropNutrientsInfo.default;

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Soil Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor soil health, pH levels, and nutrient content tailored for <strong>{cropType.charAt(0).toUpperCase() + cropType.slice(1)}</strong>{' '}
          cultivation{location ? ` in ${location}` : ''}.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Soil pH Level"
              avatar={<Avatar sx={{ bgcolor: 'info.light' }}><Science color="info" /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }} color="primary">
                6.8
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Optimal range: {nutrients.phOptimal}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ minWidth: 35 }}>Low</Typography>
                <LinearProgress variant="determinate" value={85} sx={{ flexGrow: 1, mx: 1, height: 8, borderRadius: 4 }} color="success" />
                <Typography variant="caption" sx={{ minWidth: 35 }}>High</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Moisture Content"
              avatar={<Avatar sx={{ bgcolor: 'primary.light' }}><Opacity color="primary" /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }} color="info.main">
                45%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Ideal range: {nutrients.moistureOptimal}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ minWidth: 35 }}>Dry</Typography>
                <LinearProgress variant="determinate" value={45} sx={{ flexGrow: 1, mx: 1, height: 8, borderRadius: 4 }} color="info" />
                <Typography variant="caption" sx={{ minWidth: 35 }}>Wet</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Nutrient Levels"
              avatar={<Avatar sx={{ bgcolor: 'success.light' }}><Grass color="success" /></Avatar>}
            />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText primary="Nitrogen" secondary={nutrients.nitrogen} />
                  <Chip color={nutrients.nitrogen === 'High' ? 'success' : 'warning'} label={nutrients.nitrogen} size="small" variant="outlined" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="Phosphorus" secondary={nutrients.phosphorus} />
                  <Chip color={nutrients.phosphorus === 'High' ? 'success' : 'warning'} label={nutrients.phosphorus} size="small" variant="outlined" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="Potassium" secondary={nutrients.potassium} />
                  <Chip color={nutrients.potassium === 'High' ? 'success' : 'warning'} label={nutrients.potassium} size="small" variant="outlined" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Sustainability Tips"
              avatar={<Avatar sx={{ bgcolor: 'success.main' }}><Nature sx={{ color: 'white' }} /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" component="div">
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <Box component="li" sx={{ mb: 1 }}>Rotate crops to reduce pest and disease build-up.</Box>
                  <Box component="li" sx={{ mb: 1 }}>Use cover crops to prevent erosion and improve soil health.</Box>
                  <Box component="li" sx={{ mb: 1 }}>Apply organic amendments to enhance nutrient levels naturally.</Box>
                  <Box component="li">Monitor soil moisture to optimize irrigation and conserve water.</Box>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Additional Resources"
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><Spa sx={{ color: 'white' }} /></Avatar>}
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                For in-depth soil analysis, we recommend visiting the Soil Health Institute or contacting your local agricultural extension service. Regular soil testing is key to maximizing your yields sustainability.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => alert('Professional soil test scheduled! A specialist will contact you shortly.')}
                >
                  Schedule Professional Soil Test &rarr;
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SoilManagement;
