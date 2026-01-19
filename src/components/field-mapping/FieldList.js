import React, { useState } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Chip,
    TextField,
    InputAdornment,
    Box,
    IconButton
} from '@mui/material';
import { Grass, Search, ChevronRight, WaterDrop, WbSunny, Agriculture } from '@mui/icons-material';

const fields = [
    { id: 1, name: "North Sector", type: "Corn", status: "Growing", moisture: "32%", health: "Good", icon: <Agriculture /> },
    { id: 2, name: "East Patch", type: "Wheat", status: "Harvest Ready", moisture: "18%", health: "Excellent", icon: <WbSunny /> },
    { id: 3, name: "South River", type: "Soy", status: "Seeding", moisture: "45%", health: "Average", icon: <WaterDrop /> },
    { id: 4, name: "West Valley", type: "Fallow", status: "Resting", moisture: "28%", health: "N/A", icon: <Grass /> },
];

const FieldList = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFields = fields.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper elevation={0} sx={{ height: 500, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 3 }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Field Inventory
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search fields..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" color="disabled" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, bgcolor: 'grey.50' }
                    }}
                />
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto' }}>
                {filteredFields.map((field) => (
                    <ListItem
                        key={field.id}
                        button
                        onClick={() => onSelect && onSelect(field)}
                        secondaryAction={
                            <IconButton edge="end" size="small">
                                <ChevronRight />
                            </IconButton>
                        }
                        sx={{
                            '&:hover': { bgcolor: 'action.hover' },
                            borderBottom: '1px solid rgba(0,0,0,0.02)'
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                {field.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight={600}>{field.name}</Typography>
                                    <Chip
                                        label={field.status}
                                        size="small"
                                        color={field.status === 'Harvest Ready' ? 'success' : 'default'}
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.65rem' }}
                                    />
                                </Box>
                            }
                            secondary={
                                <Typography variant="caption" color="text.secondary">
                                    {field.type} • Moisture: {field.moisture} • Health: {field.health}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default FieldList;
