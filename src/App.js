import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from './theme';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CropAnalytics from './components/CropAnalytics';
import SoilManagement from './components/SoilManagement';
import IrrigationControl from './components/IrrigationControl';
import FertilizerPlanner from './components/FertilizerPlanner';
import YieldPrediction from './components/YieldPrediction';
import WeatherInsights from './components/WeatherInsights';
import PestControl from './components/PestControl';
import MarketPrices from './components/MarketPrices';
import FarmEquipment from './components/FarmEquipment';
import LaborManagement from './components/LaborManagement';
import FinancialReports from './components/FinancialReports';
import IoTSensors from './components/IoTSensors';
import FieldMapping from './components/FieldMapping';
import Sustainability from './components/Sustainability';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';

import { getIPLocation, getPreferredLocation } from './utils/locationUtils';

function App() {
  const [userLocation, setUserLocation] = useState('');
  const [locationDetails, setLocationDetails] = useState(null);
  const [cropType, setCropType] = useState('corn');
  const [themeMode, setThemeMode] = useState(() => {
    // Load theme preference from localStorage or default to 'light'
    return localStorage.getItem('themeMode') || 'light';
  });

  // Create theme based on current mode
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode]);

  // Handle theme toggle
  const handleThemeModeChange = (newMode) => {
    setThemeMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  useEffect(() => {
    async function fetchLocation() {
      const ipLoc = await getIPLocation();
      const preferredLoc = getPreferredLocation(userLocation, ipLoc);
      setLocationDetails(preferredLoc);
    }
    fetchLocation();
  }, [userLocation]);

  const handleSetUserLocation = (location) => {
    setUserLocation(location);
  };

  const handleSetCropType = (type) => {
    setCropType(type);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout activeItem="Dashboard">
                <Dashboard
                  location={locationDetails}
                  onSetLocation={handleSetUserLocation}
                  cropType={cropType}
                  onSetCropType={handleSetCropType}
                />
              </Layout>
            }
          />
          <Route path="/crop-analytics" element={<Layout activeItem="Crop Analytics"><CropAnalytics location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/soil-management" element={<Layout activeItem="Soil Management"><SoilManagement location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/irrigation-control" element={<Layout activeItem="Irrigation Control"><IrrigationControl location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/fertilizer-planner" element={<Layout activeItem="Fertilizer Planner"><FertilizerPlanner location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/yield-prediction" element={<Layout activeItem="Yield Prediction"><YieldPrediction location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/weather-insights" element={<Layout activeItem="Weather Insights"><WeatherInsights location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/pest-control" element={<Layout activeItem="Pest Control"><PestControl location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/market-prices" element={<Layout activeItem="Market Prices"><MarketPrices location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/farm-equipment" element={<Layout activeItem="Farm Equipment"><FarmEquipment location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/labor-management" element={<Layout activeItem="Labor Management"><LaborManagement location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/financial-reports" element={<Layout activeItem="Financial Reports"><FinancialReports location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/iot-sensors" element={<Layout activeItem="IoT Sensors"><IoTSensors location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/field-mapping" element={<Layout activeItem="Field Mapping"><FieldMapping location={locationDetails} cropType={cropType} /></Layout>} />
          <Route path="/sustainability" element={<Layout activeItem="Sustainability"><Sustainability location={locationDetails} cropType={cropType} /></Layout>} />
          <Route
            path="/settings"
            element={
              <Layout activeItem="Settings">
                <Settings
                  location={locationDetails}
                  onSetLocation={handleSetUserLocation}
                  cropType={cropType}
                  onSetCropType={handleSetCropType}
                  themeMode={themeMode}
                  onThemeModeChange={handleThemeModeChange}
                />
              </Layout>
            }
          />
          <Route path="/help-support" element={<Layout activeItem="Help & Support"><HelpSupport location={locationDetails} cropType={cropType} /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
