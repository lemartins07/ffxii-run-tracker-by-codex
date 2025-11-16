import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { displayLanguage, cycleLanguage } = useLanguage();

  return (
    <button type="button" className={styles.button} onClick={cycleLanguage} title="Toggle EN/JP">
      {displayLanguage === 'both' ? 'EN · JP' : displayLanguage.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
