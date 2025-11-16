import Header from './Header';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="app-shell">
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

export default AppLayout;
