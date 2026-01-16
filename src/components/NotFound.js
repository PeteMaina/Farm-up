import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { ErrorOutline, Home } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const NotFound = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                }}
            >
                <Stack spacing={4} alignItems="center">
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                        }}
                    >
                        <ErrorOutline
                            sx={{
                                fontSize: 150,
                                color: 'error.main',
                                opacity: 0.2,
                            }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontWeight: 900,
                                fontSize: '6rem',
                                color: 'primary.main',
                                textShadow: (theme) => `4px 4px 0px ${theme.palette.background.paper}`,
                            }}
                        >
                            404
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            Oops! Page Not Found
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                            The page you're looking for doesn't exist or has been moved.
                            Let's get you back to your farm dashboard.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Home />}
                        onClick={() => {
                            showNotification('Returning to safety...', 'info');
                            navigate('/dashboard');
                        }}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            borderRadius: 4,
                            boxShadow: (theme) => `0 8px 16px ${theme.palette.primary.main}40`,
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default NotFound;
