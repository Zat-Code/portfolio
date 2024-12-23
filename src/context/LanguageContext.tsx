import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, LanguageContextType } from '../types/language';
import { translations } from '../locales/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  // Récupérer les langues préférées du navigateur
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Chercher la première langue qui correspond à 'fr' ou commence par 'fr-'
  const hasFrench = browserLanguages.some(lang => 
    lang.toLowerCase() === 'fr' || lang.toLowerCase().startsWith('fr-')
  );

  // Retourner 'fr' si le français est trouvé, sinon 'en' par défaut
  return hasFrench ? 'fr' : 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Optionnel : Sauvegarder la préférence de langue dans le localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 