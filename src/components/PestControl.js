import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Stack,
  IconButton,
} from '@mui/material';
import {
  BugReport,
  Warning,
  CheckCircle,
  Assessment,
  Timeline,
  ExpandMore,
  Info,
  Refresh,
  FilterList,
  Add,
} from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const PestControl = () => {
  const [tabValue, setTabValue] = useState(0);
  const { showNotification } = useNotification();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const pestData = [
    { pest: 'Aphids', field: 'Tomato Field A', severity: 'High', status: 'Active' },
    { pest: 'Corn Borer', field: 'Corn Field B', severity: 'Medium', status: 'Monitored' },
    { pest: 'Spider Mites', field: 'Soybean Field C', severity: 'Low', status: 'Resolved' },
    { pest: 'Cutworms', field: 'Wheat Field D', severity: 'High', status: 'Active' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error';
      case 'Monitored': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Pest Control
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage pest threats to protect your yield.
        </Typography>
      </Box>

      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Current Threats" />
          <Tab label="History" />
          <Tab label="Prevention" />
          <Tab label="Treatments" />
        </Tabs>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button startIcon={<Add />} variant="contained" size="small" onClick={() => showNotification('Opening report form...', 'info')} >
            Report Threat
          </Button>
        </Box>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Active Pest Threats"
                avatar={<Avatar sx={{ bgcolor: 'error.main' }}><BugReport /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>Tomato Field A</Typography>
                    <Chip label="Aphids Detected" color="error" size="small" variant="filled" />
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>Corn Field B</Typography>
                    <Chip label="Corn Borer" color="warning" size="small" variant="filled" />
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>Soybean Field C</Typography>
                    <Chip label="Spider Mites" color="warning" size="small" variant="filled" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Protection Status"
                avatar={<Avatar sx={{ bgcolor: 'success.main' }}><CheckCircle /></Avatar>}
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Companion Planting</Typography>
                    <Chip label="Active" color="success" size="small" variant="outlined" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Biological Control</Typography>
                    <Chip label="Scheduled" color="primary" size="small" variant="outlined" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Trap Monitoring</Typography>
                    <Chip label="Daily" color="info" size="small" variant="outlined" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Pest Detection Summary"
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><Assessment /></Avatar>}
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Pest Type</TableCell>
                        <TableCell>Field</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pestData.map((row) => (
                        <TableRow key={row.pest} hover>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <BugReport color="action" fontSize="small" />
                              <Typography variant="body2" fontWeight={500}>{row.pest}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{row.field}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.severity}
                              color={getSeverityColor(row.severity)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={getStatusColor(row.status)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={() => showNotification(`Details for ${row.pest} in ${row.field}...`, 'info')}>
                              <Info fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Placeholder for other tabs */}
      {tabValue > 0 && (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography color="text.secondary">Detailed reports being generated...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PestControl;
