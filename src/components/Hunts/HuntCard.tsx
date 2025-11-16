import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import type { SectionWithEntry } from '../../types/walkthrough';
import { getSectionTitle } from '../../utils/formatters';
import styles from './HuntCard.module.css';

interface Props {
  hunt: SectionWithEntry;
  areaName?: string;
  parentCode?: string | null;
}

const HuntCard = ({ hunt, areaName, parentCode }: Props) => {
  const { displayLanguage } = useLanguage();
  const { state, toggleHunt } = useProgress();
  const progress = state.hunts[hunt.section.code] ?? { completed: false, rewardCollected: false };

  return (
    <article className={styles.card}>
      <div>
        <h3>{getSectionTitle(hunt, displayLanguage)}</h3>
        {areaName && parentCode && (
          <Link to={`/section/${parentCode}`} className={styles.areaLink}>
            {areaName}
          </Link>
        )}
      </div>
      <div className={styles.checklist}>
        <label>
          <input
            type="checkbox"
            checked={progress.completed}
            onChange={() => toggleHunt(hunt.section.code, 'completed')}
          />
          Hunt concluída
        </label>
        <label>
          <input
            type="checkbox"
            checked={progress.rewardCollected}
            onChange={() => toggleHunt(hunt.section.code, 'rewardCollected')}
          />
          Recompensa coletada
        </label>
      </div>
    </article>
  );
};

export default HuntCard;
