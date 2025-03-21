import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Import all translation files
import en_GB from '../locales/en-GB.json';
import en_US from '../locales/en-US.json';
import en_ZA from '../locales/en-ZA.json';
import es from '../locales/es.json';

// Define available locales
export const locales = {
  'en-GB': 'English (UK)',
  'en-US': 'English (US)',
  'en-ZA': 'English (South Africa)',
  'es': 'Español',
};

// Type for translation function
type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

// Interface for the hook return value
interface UseTranslationReturn {
  t: TranslationFunction;
  locale: string;
  setLocale: (locale: string) => void;
}

/**
 * Custom hook for translations
 */
export const useTranslation = (): UseTranslationReturn => {
  const router = useRouter();
  const { locale: routerLocale, pathname, asPath, query } = router;
  
  // Default to en-GB if no locale is set
  const [locale, setLocaleState] = useState(routerLocale || 'en-GB');
  
  // Update locale when router locale changes
  useEffect(() => {
    if (routerLocale && routerLocale !== locale) {
      setLocaleState(routerLocale);
    }
  }, [routerLocale, locale]);
  
  // Get translations for the current locale
  const getTranslations = () => {
    switch (locale) {
      case 'en-GB':
        return en_GB;
      case 'en-US':
        return en_US;
      case 'en-ZA':
        return en_ZA;
      case 'es':
        return es;
      default:
        return en_GB; // Fallback to en-GB
    }
  };
  
  // Set locale and update the URL
  const setLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setLocaleState(newLocale);
    
    // Store the user's language preference
    try {
      localStorage.setItem('locale', newLocale);
    } catch (error) {
      console.error('Failed to save locale preference:', error);
    }
  };
  
  // Translation function
  const t: TranslationFunction = (key, params = {}) => {
    const translations = getTranslations();
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value = translations;
    
    // Traverse the translations object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key as fallback
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string for key: ${key}`);
      return key;
    }
    
    // Replace parameters in the translation string
    let result = value as string;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
    });
    
    return result;
  };
  
  return { t, locale, setLocale };
};

export default useTranslation; 