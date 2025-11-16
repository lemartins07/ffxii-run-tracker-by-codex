import { useGamification } from '../context/GamificationContext';
import TrophyCard from '../components/Gamification/TrophyCard';
import styles from './GamificationPage.module.css';

const GamificationPage = () => {
  const { trophies, score } = useGamification();

  return (
    <section>
      <h1>Gamificação &amp; Troféus</h1>
      <p className={styles.summary}>Run score: {score}% completion</p>
      <div className={styles.grid}>
        {trophies.map((trophy) => (
          <TrophyCard key={trophy.id} trophy={trophy} />
        ))}
      </div>
    </section>
  );
};

export default GamificationPage;
