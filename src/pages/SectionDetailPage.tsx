import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSectionByCode,
  getChildrenSections,
  getRelatedSections,
} from '../lib/walkthrough-data';
import { useLanguage } from '../context/LanguageContext';
import { getSectionTitle } from '../utils/formatters';
import KindTag from '../components/Common/KindTag';
import CrystalBadges from '../components/Common/CrystalBadges';
import SectionChecklist from '../components/Section/SectionChecklist';
import NarrativeBlock from '../components/Section/NarrativeBlock';
import MediaGallery from '../components/Section/MediaGallery';
import ShopsList from '../components/Section/ShopsList';
import RelatedSections from '../components/Section/RelatedSections';
import styles from './SectionDetailPage.module.css';

const SectionDetailPage = () => {
  const { code } = useParams();
  const { displayLanguage } = useLanguage();
  const section = code ? getSectionByCode(code) : undefined;

  const children = useMemo(() => (code ? getChildrenSections(code) : []), [code]);
  const related = useMemo(() => (code ? getRelatedSections(code) : []), [code]);

  if (!section) {
    return (
      <section>
        <p>Section not found.</p>
      </section>
    );
  }

  const hunts = children.filter((child) => child.section.kind === 'mark');
  const loots = children.filter((child) => child.section.kind === 'loot');

  return (
    <section>
      <div className={styles.header}>
        <div>
          <KindTag kind={section.section.kind} />
          <h1>{getSectionTitle(section, displayLanguage)}</h1>
          <CrystalBadges crystals={section.entry?.crystals} />
        </div>
        <SectionChecklist code={section.section.code} />
      </div>

      <NarrativeBlock narrative={section.entry?.narrative} />
      <MediaGallery media={section.entry?.media} />
      <ShopsList shops={section.entry?.shops} />

      {section.entry?.itemsReferenced?.length ? (
        <div className={styles.itemsReferenced}>
          <h3>Items referenced</h3>
          <ul>
            {section.entry.itemsReferenced.map((itemId) => (
              <li key={itemId}>{itemId}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {hunts.length > 0 && (
        <div className={styles.relatedGroup}>
          <h3>Hunts in this area</h3>
          <RelatedSections sections={hunts} />
        </div>
      )}

      {loots.length > 0 && (
        <div className={styles.relatedGroup}>
          <h3>Loot alerts</h3>
          <RelatedSections sections={loots} />
        </div>
      )}

      {related.length > 0 && (
        <div className={styles.relatedGroup}>
          <h3>Additional links</h3>
          <RelatedSections sections={related} />
        </div>
      )}
    </section>
  );
};

export default SectionDetailPage;
