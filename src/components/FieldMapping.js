import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Fade,
  Container
} from '@mui/material';
import { Add, Download, Settings } from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';
import FieldMap from './field-mapping/FieldMap';
import FieldStats from './field-mapping/FieldStats';
import FieldList from './field-mapping/FieldList';

const FieldMapping = () => {
  const { showNotification } = useNotification();
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    showNotification(`Selected ${field.name}`, 'info');
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ mb: 1, letterSpacing: '-0.02em' }}>
            Field Mapping
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualize and manage your farm's geography and soil health.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Download />} onClick={() => showNotification('Exporting map data...', 'success')}>
            Export Data
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => showNotification('Opening new field wizard...', 'info')} sx={{ borderRadius: 2, px: 3 }}>
            Add Field
          </Button>
        </Stack>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={3}>

        {/* Left Column: Interactive Map & Stats */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            <FieldMap onFieldSelect={handleFieldSelect} />
            <FieldStats />
          </Stack>
        </Grid>

        {/* Right Column: Field List & Details */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <FieldList onSelect={handleFieldSelect} />

            {/* Contextual Action Card */}
            <Box sx={{
              p: 3,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 3,
              backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 75%, transparent 75%, transparent)',
              backgroundSize: '20px 20px'
            }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                actions
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Need to update soil boundaries or change crop types? Access the advanced editor.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Settings />}
                onClick={() => showNotification('Opening advanced editor...', 'warning')}
                fullWidth
              >
                Open Editor
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FieldMapping;
