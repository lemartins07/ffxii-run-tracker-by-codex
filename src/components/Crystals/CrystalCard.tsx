import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import type { SectionWithEntry } from '../../types/walkthrough';
import { getSectionTitle } from '../../utils/formatters';
import CrystalBadges from '../Common/CrystalBadges';
import styles from './CrystalCard.module.css';

const CrystalCard = ({ section }: { section: SectionWithEntry }) => {
  const { displayLanguage } = useLanguage();
  return (
    <Link to={`/section/${section.section.code}`} className={styles.card}>
      <h3>{getSectionTitle(section, displayLanguage)}</h3>
      <CrystalBadges crystals={section.entry?.crystals} />
    </Link>
  );
};

export default CrystalCard;
