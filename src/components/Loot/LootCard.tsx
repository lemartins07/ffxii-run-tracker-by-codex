import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import type { SectionWithEntry } from '../../types/walkthrough';
import { getSectionTitle } from '../../utils/formatters';
import StatusToggle from '../Common/StatusToggle';
import styles from './LootCard.module.css';

interface Props {
  loot: SectionWithEntry;
  parentTitle?: string;
}

const LootCard = ({ loot, parentTitle }: Props) => {
  const { displayLanguage } = useLanguage();
  const { state, toggleLoot } = useProgress();
  const progress = state.loots[loot.section.code]?.obtained ?? false;

  return (
    <article className={styles.card}>
      <div>
        <h3>{getSectionTitle(loot, displayLanguage)}</h3>
        {parentTitle && <p className={styles.parent}>{parentTitle}</p>}
      </div>
      <StatusToggle checked={progress} label="Loot obtido" onChange={() => toggleLoot(loot.section.code)} />
      {loot.entry?.itemsReferenced?.length ? (
        <ul>
          {loot.entry.itemsReferenced.map((itemId) => (
            <li key={itemId}>{itemId}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default LootCard;
