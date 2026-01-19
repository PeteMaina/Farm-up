import React, { useState } from 'react';
import { Box, Paper, Typography, Tooltip, Fade } from '@mui/material';

const FieldMap = ({ onFieldSelect }) => {
    const [hoveredField, setHoveredField] = useState(null);

    // Mock data for polygon fields
    const fields = [
        { id: 1, name: "North Sector", type: "Corn", color: "#4caf50", path: "M50,50 L200,50 L250,150 L50,150 Z", area: "120 ha" },
        { id: 2, name: "East Patch", type: "Wheat", color: "#ff9800", path: "M250,150 L450,150 L400,300 L200,300 Z", area: "80 ha" },
        { id: 3, name: "South River", type: "Soy", color: "#2196f3", path: "M50,150 L200,300 L50,300 Z", area: "50 ha" },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                height: 500,
                bgcolor: '#e3f2fd',
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                    Interactive Field Map
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Select a zone to view details
                </Typography>
            </Box>

            {/* SVG Container */}
            <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Background Grid Pattern */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Fields */}
                {fields.map((field) => (
                    <Tooltip
                        key={field.id}
                        title={`${field.name} (${field.type}) - ${field.area}`}
                        placement="top"
                        TransitionComponent={Fade}
                        followCursor
                    >
                        <path
                            d={field.path}
                            fill={field.color}
                            stroke="white"
                            strokeWidth={hoveredField === field.id ? 3 : 1}
                            fillOpacity={hoveredField === field.id ? 0.9 : 0.7}
                            filter={hoveredField === field.id ? "url(#shadow)" : ""}
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={() => setHoveredField(field.id)}
                            onMouseLeave={() => setHoveredField(null)}
                            onClick={() => onFieldSelect(field)}
                        />
                    </Tooltip>
                ))}

                {/* Decorative Elements */}
                <circle cx="450" cy="50" r="10" fill="#ff5722" fillOpacity="0.2">
                    <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="450" cy="50" r="6" fill="#ff5722" />
            </svg>

            {/* Legend Overlay */}
            <Box sx={{ position: 'absolute', bottom: 20, right: 20, bgcolor: 'rgba(255,255,255,0.9)', p: 1.5, borderRadius: 2, backdropFilter: 'blur(4px)' }}>
                {fields.map(f => (
                    <Box key={f.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: f.color, mr: 1 }} />
                        <Typography variant="caption" fontWeight={600}>{f.type}</Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default FieldMap;
