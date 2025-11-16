import { Link } from 'react-router-dom';
import type { SectionWithEntry } from '../../types/walkthrough';
import { useLanguage } from '../../context/LanguageContext';
import { getSectionTitle } from '../../utils/formatters';
import styles from './RelatedSections.module.css';

const RelatedSections = ({ sections }: { sections: SectionWithEntry[] }) => {
  const { displayLanguage } = useLanguage();
  if (!sections.length) return null;

  return (
    <div className={styles.wrapper}>
      <h3>Related content</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.section.code}>
            <Link to={`/section/${section.section.code}`}>
              {getSectionTitle(section, displayLanguage)} <small>({section.section.kind})</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedSections;
