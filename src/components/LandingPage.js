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
  Rating,
  Chip,
  Divider
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
  CheckCircleOutline,
  HelpOutline,
  AssignmentTurnedIn,
  Psychology,
  Eco,
} from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

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
  const { showNotification } = useNotification();
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

  const howItWorks = [
    {
      title: 'Quick Signup',
      description: 'Create your professional farm profile in less than a minute.',
      icon: <AssignmentTurnedIn sx={{ fontSize: 40 }} />
    },
    {
      title: 'Data Integration',
      description: 'Connect your IoT sensors or input soil and weather data manually.',
      icon: <Psychology sx={{ fontSize: 40 }} />
    },
    {
      title: 'Get Results',
      description: 'Receive AI-driven recommendations to optimize your harvest immediately.',
      icon: <TrendingUp sx={{ fontSize: 40 }} />
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small household farms.',
      features: ['Basic Crop Analytics', 'Weather Integration', 'Community Forum'],
      cta: 'Start Free'
    },
    {
      name: 'Professional',
      price: '$29',
      description: 'Full power for commercial growers.',
      features: ['Advanced AI Predictions', 'Soil Health Monitoring', 'Smart Irrigation', 'IoT Integration'],
      cta: 'Go Pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Bespoke solutions for large operations.',
      features: ['Unlimited Farms', 'Dedicated Agronomist', 'API Access', '24/7 Priority Support'],
      cta: 'Contact Sales'
    },
  ];

  const faqs = [
    { q: 'Is Agrowise suitable for small household gardens?', a: 'Absolutely! Agrowise is designed to assist farmers of all sizes, from backyard gardens to large-scale commercial operations. The AI scales its recommendations based on your acreage.' },
    { q: 'How accurate are the yield predictions?', a: 'Our AI models use historical climate data, satellite imagery, and soil analysis to achieve up to 94% prediction accuracy in optimal conditions.' },
    { q: 'Can I connect my own IoT sensors?', a: 'Yes, our Professional and Enterprise plans support a wide range of standard soil and moisture sensors via our open API.' },
    { q: 'Does it work offline?', a: 'The app requires an internet connection to fetch the latest weather and AI data, but your farm logs are cached and available offline.' },
  ];

  return (
    <Box>
      {/* Navigation */}
      <HideOnScroll>
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: theme.palette.mode === 'dark' ? 'rgba(18,18,18,0.9)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Agrowise
            </Typography>
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" onClick={() => showNotification('Scrolling to Features...', 'info')}>Features</Button>
              <Button color="inherit" onClick={() => showNotification('Scrolling to Pricing...', 'info')}>Pricing</Button>
              <Button color="inherit" onClick={() => showNotification('Scrolling to About...', 'info')}>About</Button>
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
                  Revolutionize Your Farming with Agrowise
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
                  onClick={() => showNotification('Opening demo video...', 'info')}
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
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/2E7D32/FFFFFF?text=Agrowise+Dashboard' }}
                  alt="Agrowise Dashboard"
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

      {/* Stats Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {[
              { label: 'Farmers Served', value: '10,000+' },
              { label: 'Average Yield Increase', value: '30%' },
              { label: 'AI Models', value: '50+' },
              { label: 'Countries', value: '25+' }
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

      {/* How It Works Section */}
      <Box sx={{ py: 12, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F9FBF9' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" letterSpacing={2} fontWeight={700}>
              PROCESS
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 1 }}>
              How Agrowise Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Start your journey to high-yield farming in three simple steps.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {howItWorks.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                      fontSize: '2rem',
                      fontWeight: 800
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
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
          <Stack spacing={12}>
            {features.map((feature, index) => (
              <Grid
                container
                spacing={8}
                alignItems="center"
                key={index}
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
              >
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{
                    p: 3,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    color: 'white',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3
                  }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: 48, color: 'white' } })}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 12, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F4F7F4' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" letterSpacing={2} fontWeight={700}>
              PRICING
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 1 }}>
              Plans for Every Scale
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'visible',
                    transform: plan.highlighted ? 'scale(1.05)' : 'none',
                    bgcolor: plan.highlighted ? 'primary.main' : 'background.paper',
                    color: plan.highlighted ? 'white' : 'text.primary',
                    boxShadow: plan.highlighted ? 10 : 2,
                    zIndex: plan.highlighted ? 1 : 0
                  }}
                >
                  {plan.highlighted && (
                    <Chip
                      label="MOST POPULAR"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: -15,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontWeight: 700
                      }}
                    />
                  )}
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" sx={{ my: 3, fontWeight: 900 }}>
                    {plan.price}<Typography component="span" variant="h6">/mo</Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                    {plan.description}
                  </Typography>
                  <Divider sx={{ mb: 3, bgcolor: plan.highlighted ? 'rgba(255,255,255,0.2)' : 'divider' }} />
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {plan.features.map((f, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CheckCircleOutline size="small" sx={{ color: plan.highlighted ? 'white' : 'primary.main' }} />
                        <Typography variant="body2">{f}</Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    color={plan.highlighted ? 'secondary' : 'primary'}
                    size="large"
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" letterSpacing={2} fontWeight={700}>
              TESTIMONIALS
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 1 }}>
              What Farmers Say
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 4, height: '100%', borderRadius: 4, textAlign: 'center', bgcolor: 'background.default', boxShadow: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mx: 'auto', mb: 2, fontSize: '1.5rem' }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Typography variant="body1" paragraph color="text.secondary" sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{testimonial.content}"
                  </Typography>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    {testimonial.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 12, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F9FBF9' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" letterSpacing={2} fontWeight={700}>
              FAQ
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 1 }}>
              Got Questions?
            </Typography>
          </Box>
          <Box>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  boxShadow: 1
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700 }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 900 }}>
            Ready to Transform Your Farm?
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}>
            Join 10,000+ farmers using Agrowise to increase yield and sustainability.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate('/auth')}
            sx={{ px: 8, py: 2, fontSize: '1.2rem', fontWeight: 800, borderRadius: 3 }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>


      {/* Footer */}
      <Box sx={{ py: 8, backgroundColor: 'grey.900', color: 'grey.300' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                Agrowise
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
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to Features...', 'info')}>Features</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to Pricing...', 'info')}>Pricing</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to API docs...', 'info')}>API</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                COMPANY
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to About Us...', 'info')}>About</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to Blog...', 'info')}>Blog</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to Careers...', 'info')}>Careers</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                SUPPORT
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Navigating to Help Center...', 'info')}>Help Center</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Opening Contact page...', 'info')}>Contact</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => showNotification('Checking System Status...', 'info')}>Status</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="caption" color="grey.500">
              © {new Date().getFullYear()} Agrowise. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
