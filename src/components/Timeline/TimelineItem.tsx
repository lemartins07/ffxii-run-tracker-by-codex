import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import type { SectionWithEntry } from '../../types/walkthrough';
import { getSectionTitle } from '../../utils/formatters';
import KindTag from '../Common/KindTag';
import CrystalBadges from '../Common/CrystalBadges';
import styles from './TimelineItem.module.css';

const TimelineItem = ({ section }: { section: SectionWithEntry }) => {
  const { displayLanguage } = useLanguage();
  const title = getSectionTitle(section, displayLanguage);

  return (
    <Link to={`/section/${section.section.code}`} className={styles.card}>
      <div className={styles.header}>
        <KindTag kind={section.section.kind} />
        <span className={styles.order}>#{section.section.order}</span>
      </div>
      <h3>{title}</h3>
      <p className={styles.region}>{section.section.label?.raw ?? section.entry?.titles?.primary?.raw}</p>
      <CrystalBadges crystals={section.entry?.crystals} />
    </Link>
  );
};

export default TimelineItem;
