// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome',
          login: 'Login',
          logout: 'Logout',
          plan: 'Plan',
          role: 'Role',
          email: 'Email',
          home: 'Home',
          genre: 'Genre',
          subscription: 'Subscription Plan',
        }
      },
      hi: {
        translation: {
          welcome: 'स्वागत है',
          login: 'लॉगिन',
          logout: 'लॉगआउट',
          plan: 'प्लान',
          role: 'भूमिका',
          email: 'ईमेल',
          home: 'होम',
          genre: 'शैली',
          subscription: 'सब्सक्रिप्शन प्लान',
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
