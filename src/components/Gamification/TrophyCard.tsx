import type { TrophyProgress } from '../../context/GamificationContext';
import styles from './TrophyCard.module.css';

const TrophyCard = ({ trophy }: { trophy: TrophyProgress }) => (
  <div className={styles.card} data-achieved={trophy.achieved}>
    <div className={styles.header}>
      <span className={styles.icon}>{trophy.icon}</span>
      <div>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
      </div>
    </div>
    <div className={styles.progressBar}>
      <div style={{ width: `${trophy.progress * 100}%` }} />
    </div>
    <p className={styles.meta}>
      {trophy.value}/{trophy.requirement} milestones
    </p>
  </div>
);

export default TrophyCard;
