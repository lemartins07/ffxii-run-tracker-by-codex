import { NavLink } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import NavLinks from './NavLinks';
import LanguageToggle from './LanguageToggle';
import GlobalSearch from '../Search/GlobalSearch';
import styles from './Header.module.css';

const Header = () => {
  const { stats } = useProgress();
  const storyPct = stats.totalStory ? Math.round((stats.storyCompleted / stats.totalStory) * 100) : 0;
  const huntPct = stats.totalHunts ? Math.round((stats.huntsCompleted / stats.totalHunts) * 100) : 0;

  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <NavLink to="/" className={styles.logo}>
          FFXII Run Tracker
        </NavLink>
        <div className={styles.progress}>
          <span>Story {storyPct}%</span>
          <span>Hunts {huntPct}%</span>
        </div>
      </div>
      <div className={styles.toolbar}>
        <GlobalSearch />
        <LanguageToggle />
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
