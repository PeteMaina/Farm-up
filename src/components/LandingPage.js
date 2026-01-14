import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  useTheme,
  Avatar,
  Rating
} from '@mui/material';
import {
  Agriculture,
  Analytics,
  WaterDrop,
  Grass,
  TrendingUp,
  Security,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <Agriculture sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Crop Recommendations',
      description: 'Get personalized crop suggestions based on your location, soil type, and climate data.',
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your farm performance with predictive analytics.',
    },
    {
      icon: <WaterDrop sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Irrigation',
      description: 'Optimize water usage with AI-driven irrigation recommendations.',
    },
    {
      icon: <Grass sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fertilizer Optimization',
      description: 'Precise fertilizer recommendations to maximize yield and minimize waste.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Yield Prediction',
      description: 'Accurate yield forecasts to help you plan and optimize your harvest.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Farm Security',
      description: 'Monitor your farm 24/7 with AI-powered security and alert systems.',
    },
  ];

  const testimonials = [
    {
      name: 'John Farmer',
      role: 'Organic Farmer',
      avatar: 'J',
      content: 'This app has revolutionized my farming practices. The AI recommendations are spot on!',
      rating: 5,
    },
    {
      name: 'Sarah Green',
      role: 'AgriTech Entrepreneur',
      avatar: 'S',
      content: 'The most comprehensive farming app I\'ve ever used. Features beyond imagination.',
      rating: 5,
    },
    {
      name: 'Mike Thompson',
      role: 'Large Scale Farmer',
      avatar: 'M',
      content: 'Increased my yields by 30% in just one season. Game-changing technology.',
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Navigation */}
      <HideOnScroll>
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: theme.palette.mode === 'dark' ? 'rgba(18,18,18,0.9)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 800, letterSpacing: '-0.5px' }}>
              AgriAI
            </Typography>
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit">Features</Button>
              <Button color="inherit">Pricing</Button>
              <Button color="inherit">About</Button>
              <Button variant="contained" onClick={() => navigate('/auth')} sx={{ ml: 2 }}>
                Sign In
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #E8F5E9 100%)`,
          pt: 10,
          pb: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h1" gutterBottom lineHeight={1.1} sx={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Revolutionize Your Farming with AI
                </Typography>
              </Box>
              <Typography variant="h5" paragraph sx={{ color: 'text.secondary', mb: 5, fontWeight: 400, transform: 'none' }}>
                Discover the best crops for your location, optimize fertilizers, irrigation, and boost yields with cutting-edge AI technology.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/auth')}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: 20,
                    bottom: 20,
                    background: theme.palette.primary.light,
                    opacity: 0.2,
                    borderRadius: 8,
                    zIndex: 0
                  }
                }}
              >
                <Box
                  component="img"
                  src="/hero.png"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/2E7D32/FFFFFF?text=AgriAI+Dashboard' }}
                  alt="AgriAI Dashboard"
                  sx={{
                    width: '100%',
                    borderRadius: 6,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                    position: 'relative',
                    zIndex: 1,
                    border: '1px solid rgba(255,255,255,0.5)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" letterSpacing={2} fontWeight={700}>
              FEATURES
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 1 }}>
              Powerful Features for Modern Farmers
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    bgcolor: 'background.default',
                    '&:hover': {
                      bgcolor: 'background.paper',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                      transform: 'translateY(-5px)'
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2, p: 1.5, display: 'inline-block', borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
                      {React.cloneElement(feature.icon, { sx: { fontSize: 32, color: 'white' } })}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {[
              { label: 'Farmers Served', value: '10,000+' },
              { label: 'Average Yield Increase', value: '30%' },
              { label: 'AI Models', value: '50+' },
              { label: 'Support', value: '24/7' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Stack alignItems="center" spacing={1}>
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 12, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 8 }}>
            What Farmers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>{testimonial.avatar}</Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                    </Box>
                  </Stack>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography variant="body1" paragraph color="text.secondary">
                    "{testimonial.content}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 8, backgroundColor: 'grey.900', color: 'grey.300' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                AgriAI
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 300 }}>
                Empowering farmers with AI-driven insights for sustainable agriculture.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                PRODUCT
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Features</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Pricing</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>API</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                COMPANY
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>About</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Blog</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Careers</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                SUPPORT
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Help Center</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Contact</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>Status</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="caption" color="grey.500">
              © {new Date().getFullYear()} AgriAI. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
