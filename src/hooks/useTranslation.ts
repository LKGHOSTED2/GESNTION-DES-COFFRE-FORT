import { translations } from '../i18n/translations';

export function useTranslation() {
  // For now, we'll hardcode French. In a real app, this would be configurable
  const locale = 'fr';
  
  function t(key: string): string {
    return key.split('.').reduce((obj, k) => obj?.[k], translations[locale]) as string || key;
  }
  
  return { t };
}