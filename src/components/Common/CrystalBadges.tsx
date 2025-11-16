import type { CrystalInfo } from '../../types/walkthrough';
import styles from './CrystalBadges.module.css';

const CrystalBadges = ({ crystals }: { crystals?: CrystalInfo }) => {
  if (!crystals) return null;
  return (
    <div className={styles.badges}>
      {crystals.teleport && <span className={styles.teleport}>Teleport Crystal</span>}
      {crystals.save && <span className={styles.save}>Save Crystal</span>}
    </div>
  );
};

export default CrystalBadges;
