import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type DisplayLanguage = 'en' | 'jp' | 'both';

interface LanguageContextValue {
  displayLanguage: DisplayLanguage;
  setDisplayLanguage: (lang: DisplayLanguage) => void;
  cycleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'ffxii-run-tracker::language';

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayLanguage, setDisplayLanguage] = useLocalStorage<DisplayLanguage>(STORAGE_KEY, 'en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
    };
    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      displayLanguage,
      setDisplayLanguage,
      cycleLanguage: () => {
        const order: DisplayLanguage[] = ['en', 'jp', 'both'];
        const nextIndex = (order.indexOf(displayLanguage) + 1) % order.length;
        setDisplayLanguage(order[nextIndex]);
      },
    }),
    [displayLanguage, setDisplayLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
};

export type { DisplayLanguage };
