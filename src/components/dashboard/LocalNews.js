import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Chip, Box, Avatar } from '@mui/material';
import { Newspaper, Public } from '@mui/icons-material';
import { useLocalization } from '../../context/LocalizationContext';

const LocalNews = () => {
    const { countryCode, city, country } = useLocalization();

    // Mock news database keyed by country code or region
    const newsDatabase = {
        'US': [
            { title: 'Midwest Corn Yields Exceed Expectations', source: 'USDA Report', time: '2 hours ago', tag: 'Market' },
            { title: 'New Irrigation Subsidies Announced for California', source: 'AgriNews', time: '5 hours ago', tag: 'Policy' },
            { title: 'Doughnut Prices Stabilize in New York Markets', source: 'City Daily', time: '1 day ago', tag: 'Consumer' }
        ],
        'KE': [
            { title: 'Tea Export Prices Rally in Mombasa Auction', source: 'Daily Nation', time: '4 hours ago', tag: 'Export' },
            { title: 'Rains in Rift Valley Boost Maize Planting', source: 'The Standard', time: '6 hours ago', tag: 'Weather' },
            { title: 'New Fertilizer Subsidy Program Launched', source: 'Ministry of Agriculture', time: '1 day ago', tag: 'Policy' }
        ],
        'GB': [
            { title: 'Wheat Quality High Despite Wet Spring', source: 'Farmers Weekly', time: '3 hours ago', tag: 'Harvest' },
            { title: 'Post-Brexit Trade Deals Impact Lamb Prices', source: 'BBC Rural', time: '7 hours ago', tag: 'Trade' },
            { title: 'Vertical Farming Startups Surge in London', source: 'TechCrunch', time: '2 days ago', tag: 'Tech' }
        ],
        // Default/Global news
        'Global': [
            { title: 'Global Grain Prices Steady Amidst Supply Concerns', source: 'Reuters', time: '1 hour ago', tag: 'Global Market' },
            { title: 'Sustainable Farming Practices Gain Momentum', source: 'UN FAO', time: '12 hours ago', tag: 'Sustainability' },
            { title: 'New Satellite Tech Improves soil Monitoring', source: 'AgTech World', time: '1 day ago', tag: 'Technology' }
        ]
    };

    // Select news based on country or fallback to Global
    const selectedNews = newsDatabase[countryCode] || newsDatabase['Global']; // Note: ensure country matches code or name in Context. 
    // Context returns 'country' as name usually, and 'countryCode' as code. 
    // Let's use a simpler heuristic for now or rely on the fact that Context might update to return code properly if I check it.

    // Actually, checking context file: it returns `country` (name) and `countryCode` (code).
    // I should update the component to use `countryCode` if available, or name.

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={`Agri-News: ${city || country || 'Global'}`}
                subheader="Latest updates relevant to your region"
                avatar={<Avatar sx={{ bgcolor: 'info.main' }}><Public /></Avatar>}
            />
            <CardContent sx={{ p: 0 }}>
                <List>
                    {selectedNews.map((news, index) => (
                        <ListItem key={index} divider={index !== selectedNews.length - 1}>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {news.title}
                                    </Typography>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {news.source} • {news.time}
                                        </Typography>
                                        <Chip label={news.tag} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default LocalNews;
