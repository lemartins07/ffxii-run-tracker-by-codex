import styles from './KindTag.module.css';

const colors: Record<string, string> = {
  story: '#0ea5e9',
  mark: '#f97316',
  loot: '#22c55e',
};

const KindTag = ({ kind }: { kind: string }) => {
  const color = colors[kind] ?? '#a855f7';
  return (
    <span className={styles.tag} style={{ backgroundColor: color }}>
      {kind.toUpperCase()}
    </span>
  );
};

export default KindTag;
