import type { LocalizedText, SectionWithEntry } from '../types/walkthrough';

type DisplayLanguage = 'en' | 'jp' | 'both';

export const resolveLocalized = (
  text: LocalizedText | undefined,
  language: DisplayLanguage,
  fallback?: string,
) => {
  if (!text) {
    return fallback ?? '';
  }

  if (language === 'both') {
    const en = text.en ?? fallback ?? text.raw ?? '';
    const jp = text.jp ?? fallback ?? text.raw ?? '';
    if (en && jp && en !== jp) {
      return `${en} (${jp})`;
    }
    return en || jp || text.raw || fallback || '';
  }

  if (language === 'jp') {
    return text.jp ?? text.en ?? text.raw ?? fallback ?? '';
  }

  return text.en ?? text.jp ?? text.raw ?? fallback ?? '';
};

export const getSectionTitle = (section: SectionWithEntry, language: DisplayLanguage) => {
  const label = section.section.label ?? section.entry?.titles?.primary;
  return (
    resolveLocalized(label, language, section.section.code) ||
    section.entry?.titles?.primary?.raw ||
    section.section.code
  );
};

export const formatPrice = (price?: number) => {
  if (price === undefined || price === null) return '';
  return `${price.toLocaleString()} gil`;
};
