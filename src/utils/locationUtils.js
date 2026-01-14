/**
 * Global Intelligence Locale Map
 * Maps country codes to their default localization profile.
 * Built for comprehensive global coverage.
 */
export const LOCALE_MAP = {
  // North America
  'US': { currency: 'USD', units: 'imperial', locale: 'en-US', continent: 'North America' },
  'CA': { currency: 'CAD', units: 'metric', locale: 'en-CA', continent: 'North America' },
  'MX': { currency: 'MXN', units: 'metric', locale: 'es-MX', continent: 'North America' },
  // Europe
  'GB': { currency: 'GBP', units: 'metric', locale: 'en-GB', continent: 'Europe' },
  'DE': { currency: 'EUR', units: 'metric', locale: 'de-DE', continent: 'Europe' },
  'FR': { currency: 'EUR', units: 'metric', locale: 'fr-FR', continent: 'Europe' },
  'IT': { currency: 'EUR', units: 'metric', locale: 'it-IT', continent: 'Europe' },
  'ES': { currency: 'EUR', units: 'metric', locale: 'es-ES', continent: 'Europe' },
  // Africa
  'KE': { currency: 'KES', units: 'metric', locale: 'en-KE', continent: 'Africa' },
  'NG': { currency: 'NGN', units: 'metric', locale: 'en-NG', continent: 'Africa' },
  'ZA': { currency: 'ZAR', units: 'metric', locale: 'en-ZA', continent: 'Africa' },
  'EG': { currency: 'EGP', units: 'metric', locale: 'ar-EG', continent: 'Africa' },
  'ET': { currency: 'ETB', units: 'metric', locale: 'am-ET', continent: 'Africa' },
  // Asia
  'IN': { currency: 'INR', units: 'metric', locale: 'en-IN', continent: 'Asia' },
  'CN': { currency: 'CNY', units: 'metric', locale: 'zh-CN', continent: 'Asia' },
  'JP': { currency: 'JPY', units: 'metric', locale: 'ja-JP', continent: 'Asia' },
  'ID': { currency: 'IDR', units: 'metric', locale: 'id-ID', continent: 'Asia' },
  // South America
  'BR': { currency: 'BRL', units: 'metric', locale: 'pt-BR', continent: 'South America' },
  'AR': { currency: 'ARS', units: 'metric', locale: 'es-AR', continent: 'South America' },
  // Oceania
  'AU': { currency: 'AUD', units: 'metric', locale: 'en-AU', continent: 'Oceania' },
  'NZ': { currency: 'NZD', units: 'metric', locale: 'en-NZ', continent: 'Oceania' },
};

export const DEFAULT_LOCALE = { currency: 'USD', units: 'metric', locale: 'en-US', continent: 'Unknown' };

export async function getIPLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Failed to get IP location');
    const data = await response.json();

    const countryCode = data.country_code;
    const localeProfile = LOCALE_MAP[countryCode] || DEFAULT_LOCALE;

    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: countryCode,
      latitude: data.latitude,
      longitude: data.longitude,
      ...localeProfile
    };
  } catch (error) {
    console.error('Error fetching IP location:', error);
    return { ...DEFAULT_LOCALE, country: 'Unknown' };
  }
}

export function getPreferredLocation(userLocation, ipLocation) {
  if (userLocation && userLocation.trim() !== '') {
    return userLocation;
  }
  if (ipLocation && ipLocation.city) {
    return `${ipLocation.city}, ${ipLocation.country}`;
  }
  return 'Global';
}
