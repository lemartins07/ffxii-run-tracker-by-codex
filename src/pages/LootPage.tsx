import { useMemo, useState } from 'react';
import { getSectionsByKind, getSectionByCode } from '../lib/walkthrough-data';
import { useLanguage } from '../context/LanguageContext';
import { getSectionTitle } from '../utils/formatters';
import LootCard from '../components/Loot/LootCard';
import styles from './LootPage.module.css';

const loots = getSectionsByKind('loot');

const LootPage = () => {
  const { displayLanguage } = useLanguage();
  const [area, setArea] = useState('all');
  const [term, setTerm] = useState('');

  const areas = useMemo(() => {
    const map = new Map<string, string>();
    loots.forEach((loot) => {
      if (!loot.section.parentCode) return;
      const parent = getSectionByCode(loot.section.parentCode);
      if (parent) {
        map.set(loot.section.parentCode, getSectionTitle(parent, displayLanguage));
      }
    });
    return Array.from(map.entries()).map(([code, label]) => ({ code, label }));
  }, [displayLanguage]);

  const filtered = loots.filter((loot) => {
    if (area !== 'all' && loot.section.parentCode !== area) return false;
    if (term.trim()) {
      const title = getSectionTitle(loot, displayLanguage).toLowerCase();
      if (!title.includes(term.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <section>
      <h1>Loot Tracker</h1>
      <div className={styles.filters}>
        <select value={area} onChange={(event) => setArea(event.target.value)}>
          <option value="all">All areas</option>
          {areas.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.label}
            </option>
          ))}
        </select>
        <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search" />
      </div>
      <div className={styles.list}>
        {filtered.map((loot) => {
          const parent = loot.section.parentCode ? getSectionByCode(loot.section.parentCode) : undefined;
          const parentTitle = parent ? getSectionTitle(parent, displayLanguage) : undefined;
          return <LootCard key={loot.section.code} loot={loot} parentTitle={parentTitle} />;
        })}
      </div>
    </section>
  );
};

export default LootPage;
