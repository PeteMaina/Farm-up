import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const Notification = () => {
    const { notification, hideNotification } = useNotification();
    const theme = useTheme();

    if (!notification) return null;

    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />;
            case 'error':
                return <ErrorIcon sx={{ color: theme.palette.error.main, mr: 1.5 }} />;
            case 'warning':
                return <WarningIcon sx={{ color: theme.palette.warning.main, mr: 1.5 }} />;
            case 'info':
            default:
                return <InfoIcon sx={{ color: theme.palette.info.main, mr: 1.5 }} />;
        }
    };

    const getBackgroundColor = () => {
        // Using a very subtle background based on type, or just standard paper with a colored border
        return theme.palette.background.paper;
    };

    const getBorderColor = () => {
        switch (notification.type) {
            case 'success':
                return theme.palette.success.main;
            case 'error':
                return theme.palette.error.main;
            case 'warning':
                return theme.palette.warning.main;
            case 'info':
            default:
                return theme.palette.info.main;
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 24,
                right: 24, // Or '50%' with transform toggle for center
                zIndex: 9999,
                animation: 'slideIn 0.3s ease-out forwards',
                '@keyframes slideIn': {
                    '0%': { transform: 'translateX(100%)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 }
                }
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    minWidth: '300px',
                    maxWidth: '450px',
                    bgcolor: getBackgroundColor(),
                    borderLeft: `6px solid ${getBorderColor()}`,
                    borderRadius: 2,
                }}
            >
                {getIcon()}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {notification.message}
                    </Typography>
                </Box>
                <IconButton size="small" onClick={hideNotification} sx={{ ml: 1 }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default Notification;
