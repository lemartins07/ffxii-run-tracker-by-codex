import { getSectionByCode } from '../../lib/walkthrough-data';
import { useLanguage } from '../../context/LanguageContext';
import type { ItemIndexEntry } from '../../types/walkthrough';
import { resolveLocalized } from '../../utils/formatters';
import styles from './ItemRow.module.css';

const ItemRow = ({ item }: { item: ItemIndexEntry }) => {
  const { displayLanguage } = useLanguage();
  const name = resolveLocalized({ en: item.nameEn, jp: item.nameJp }, displayLanguage, item.itemId);

  return (
    <div className={styles.row}>
      <div>
        <strong>{name}</strong>
        <p className={styles.meta}>ID: {item.itemId}</p>
      </div>
      <div>
        <p className={styles.meta}>Available at:</p>
        <ul>
          {item.occurrences.map((occurrence, index) => {
            const section = getSectionByCode(occurrence.sectionCode);
            const sectionName = section ? resolveLocalized(section.section.label, displayLanguage) : occurrence.sectionCode;
            return (
              <li key={`${occurrence.sectionCode}-${index}`}>
                {sectionName} — {occurrence.shopName ?? occurrence.shopType}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ItemRow;
