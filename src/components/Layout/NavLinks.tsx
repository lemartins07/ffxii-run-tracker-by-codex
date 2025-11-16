import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.css';

const navItems = [
  { to: '/', label: 'Timeline' },
  { to: '/hunts', label: 'Hunts' },
  { to: '/loot', label: 'Loot' },
  { to: '/shops', label: 'Shops' },
  { to: '/items', label: 'Items' },
  { to: '/crystals', label: 'Crystals' },
  { to: '/gamification', label: 'Trophies' },
];

const NavLinks = () => (
  <nav className={styles.nav}>
    {navItems.map((item) => (
      <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? styles.active : styles.link)}>
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default NavLinks;
