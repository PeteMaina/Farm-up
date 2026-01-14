import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fab
} from '@mui/material';
import {
  Help,
  ContactSupport,
  Book,
  ExpandMore,
  Email,
  Phone,
  Forum,
  Search,
  SmartToy, // AgroBot Icon
  PlayCircle,
  VideoLibrary,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Send,
  ThumbUp,
  ThumbDown
} from '@mui/icons-material';

const HelpSupport = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I am AgroBot, your AI farming assistant. How can I help you today?' }
  ]);
  const [activeTab, setActiveTab] = useState('all');

  const faqs = [
    {
      category: 'Technical',
      question: 'How do I set up irrigation schedules?',
      answer: 'Navigate to Irrigation Control and use the scheduling feature to set automated watering times based on soil moisture levels.'
    },
    {
      category: 'Technical',
      question: 'What should I do if a sensor goes offline?',
      answer: 'Check the IoT Sensors page for status updates. If a sensor is offline, try resetting it or contact technical support.'
    },
    {
      category: 'Account',
      question: 'How can I view my financial reports?',
      answer: 'Go to Financial Reports in the sidebar to access detailed profit and loss statements, expense tracking, and revenue analytics.'
    },
    {
      category: 'Security',
      question: 'Is my data secure?',
      answer: 'Yes, we use enterprise-grade encryption for all your farm data and personal information.'
    },
  ];

  const videos = [
    { title: 'Getting Started with Agrowise', duration: '5:20', thumbnail: 'https://via.placeholder.com/300x160?text=Getting+Started' },
    { title: 'Calibrating Moisture Sensors', duration: '3:45', thumbnail: 'https://via.placeholder.com/300x160?text=Sensor+Calibration' },
    { title: 'Understanding Yield Predictions', duration: '8:10', thumbnail: 'https://via.placeholder.com/300x160?text=Yield+Prediction' },
    { title: 'Optimizing Fertilizer Usage', duration: '6:30', thumbnail: 'https://via.placeholder.com/300x160?text=Fertilizer+Tips' }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user', text: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');

    // Simulate Bot Response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        sender: 'bot',
        text: "I'm processing requested info... This is a demo response from AgroBot."
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Search Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        p: 6,
        borderRadius: 2,
        mb: 4,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            How can we help you?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Search our knowledge base, ask AgroBot, or browse tutorials.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for answers (e.g., 'How to reset password', 'Irrigation tips')..."
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              maxWidth: 700,
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              endAdornment: <Button variant="contained" size="large">Search</Button>
            }}
          />
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Popular:</Typography>
            <Chip label="Sensors" size="small" onClick={() => { }} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Chip label="Billing" size="small" onClick={() => { }} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Chip label="Exports" size="small" onClick={() => { }} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={3}>

        {/* Left Column: AI Chat & Videos */}
        <Grid item xs={12} lg={8}>
          {/* AI Chat Bot Section */}
          <Card sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}><SmartToy /></Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Ask AgroBot AI</Typography>
                    <Typography variant="caption" color="text.secondary">Instant answers powered by advanced AI</Typography>
                  </Box>
                </Box>
              }
              action={<Chip label="Online" color="success" size="small" variant="outlined" />}
            />
            <Divider />
            <CardContent sx={{ bgcolor: 'grey.50', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flexGrow: 1, mb: 2, overflowY: 'auto', maxHeight: 350 }}>
                {chatHistory.map((msg, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}>
                    {msg.sender === 'bot' && <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, mr: 1 }}><SmartToy fontSize="small" /></Avatar>}
                    <Paper sx={{
                      p: 2,
                      maxWidth: '75%',
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'common.white',
                      color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2
                    }}>
                      <Typography variant="body2">{msg.text}</Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your question here..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{ bgcolor: 'white' }}
                />
                <Button variant="contained" endIcon={<Send />} onClick={handleSendMessage}>
                  Send
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Video Library */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>Video Tutorials</Typography>
              <Button endIcon={<VideoLibrary />}>View All Library</Button>
            </Stack>
            <Grid container spacing={2}>
              {videos.map((video, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'black' }}>
                      <Box
                        component="img"
                        src={video.thumbnail}
                        alt={video.title}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      />
                      <Fab color="primary" size="small" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <PlayCircle />
                      </Fab>
                      <Chip label={video.duration} size="small" sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }} />
                    </Box>
                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>{video.title}</Typography>
                      <Typography variant="caption" color="text.secondary">Updated 2 days ago</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Right Column: Support & Socials */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Contact Options */}
            <Card>
              <CardHeader title="Need Human Help?" avatar={<Avatar sx={{ bgcolor: 'warning.main' }}><ContactSupport /></Avatar>} />
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon><Phone color="primary" /></ListItemIcon>
                  <ListItemText primary="Call Support" secondary="+1 (800) 555-0199" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button>
                  <ListItemIcon><Email color="primary" /></ListItemIcon>
                  <ListItemText primary="Email Us" secondary="support@agrowise.com" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button>
                  <ListItemIcon><Forum color="primary" /></ListItemIcon>
                  <ListItemText primary="Live Chat" secondary="Available 24/7" />
                </ListItem>
              </List>
            </Card>

            {/* FAQs */}
            <Card>
              <CardHeader title="Common Questions" avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Help /></Avatar>} />
              <Divider />
              <CardContent>
                {faqs.map((faq, index) => (
                  <Accordion key={index} elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #eee' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="body2" fontWeight={600}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">{faq.answer}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption">Helpful?</Typography>
                        <IconButton size="small"><ThumbUp fontSize="small" /></IconButton>
                        <IconButton size="small"><ThumbDown fontSize="small" /></IconButton>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button fullWidth sx={{ mt: 2 }}>View Knowledge Base</Button>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Join Our Community</Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                  Follow us for the latest farming tips, feature updates, and community stories.
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    <Facebook />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    <Twitter />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    <Instagram />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    <YouTube />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HelpSupport;
