import React, { createContext, useContext, useState, useEffect } from 'react';
import { getIPLocation } from '../utils/locationUtils';

const LocalizationContext = createContext();

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};

// Mock Exchange Rates (Base: USD)
const EXCHANGE_RATES = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    KES: 155.50,
    INR: 83.12,
    CAD: 1.35,
    AUD: 1.52,
    JPY: 148.50,
    CNY: 7.19,
    BRL: 4.97,
    NGN: 1450.00,
    ZAR: 19.10
};

export const LocalizationProvider = ({ children }) => {
    const [localization, setLocalization] = useState({
        city: '',
        country: '',
        continent: '',
        currency: 'USD',
        units: 'metric',
        locale: 'en-US',
        isSmartDetect: true,
        loading: true
    });

    useEffect(() => {
        const fetchLocalization = async () => {
            const saved = localStorage.getItem('localization_prefs');
            let prefs = saved ? JSON.parse(saved) : null;

            if (!prefs || prefs.isSmartDetect) {
                const ipLoc = await getIPLocation();
                const merged = { ...localization, ...ipLoc, isSmartDetect: prefs ? prefs.isSmartDetect : true, loading: false };
                setLocalization(merged);
                if (prefs?.isSmartDetect) localStorage.setItem('localization_prefs', JSON.stringify(merged));
            } else {
                setLocalization({ ...localization, ...prefs, loading: false });
            }
        };

        fetchLocalization();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updatePreference = (newPrefs) => {
        const updated = { ...localization, ...newPrefs };
        setLocalization(updated);
        localStorage.setItem('localization_prefs', JSON.stringify(updated));
    };

    // --- Intelligence Engine Helpers ---

    const convertCurrency = (amount, from = 'USD') => {
        const baseAmount = amount / (EXCHANGE_RATES[from] || 1);
        const targetAmount = baseAmount * (EXCHANGE_RATES[localization.currency] || 1);
        return targetAmount;
    };

    const formatCurrency = (amount, from = 'USD') => {
        const converted = convertCurrency(amount, from);
        return new Intl.NumberFormat(localization.locale, {
            style: 'currency',
            currency: localization.currency
        }).format(converted);
    };

    const convertUnit = (value, type) => {
        if (localization.units === 'metric') return value; // Base is metric

        switch (type) {
            case 'temp': return (value * 9 / 5) + 32; // C to F
            case 'weight': return value * 1.10231; // Tonne to Ton (US)
            case 'area': return value * 2.47105; // Hectare to Acre
            case 'speed': return value * 0.621371; // km/h to mph
            case 'len': return value * 0.393701; // cm to inch
            default: return value;
        }
    };

    const getUnitLabel = (type) => {
        const isMetric = localization.units === 'metric';
        switch (type) {
            case 'temp': return '°' + (isMetric ? 'C' : 'F');
            case 'weight': return isMetric ? 'tonnes' : 'tons';
            case 'area': return isMetric ? 'ha' : 'acres';
            case 'speed': return isMetric ? 'km/h' : 'mph';
            default: return '';
        }
    };

    const value = {
        ...localization,
        updatePreference,
        convertCurrency,
        formatCurrency,
        convertUnit,
        getUnitLabel
    };

    return (
        <LocalizationContext.Provider value={value}>
            {children}
        </LocalizationContext.Provider>
    );
};
