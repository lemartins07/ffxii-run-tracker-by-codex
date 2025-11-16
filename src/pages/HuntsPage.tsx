import { useMemo, useState } from 'react';
import { getSectionsByKind, getSectionByCode } from '../lib/walkthrough-data';
import { useProgress } from '../context/ProgressContext';
import HuntFilters from '../components/Hunts/HuntFilters';
import HuntCard from '../components/Hunts/HuntCard';
import { useLanguage } from '../context/LanguageContext';
import { getSectionTitle } from '../utils/formatters';
import styles from './HuntsPage.module.css';

const hunts = getSectionsByKind('mark');

const HuntsPage = () => {
  const { state } = useProgress();
  const { displayLanguage } = useLanguage();
  const [area, setArea] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const areas = useMemo(() => {
    const set = new Map<string, string>();
    hunts.forEach((hunt) => {
      if (!hunt.section.parentCode) return;
      const parent = getSectionByCode(hunt.section.parentCode);
      if (parent) {
        set.set(hunt.section.parentCode, getSectionTitle(parent, displayLanguage));
      }
    });
    return Array.from(set.entries()).map(([code, label]) => ({ code, label }));
  }, [displayLanguage]);

  const filtered = hunts.filter((hunt) => {
    if (area !== 'all' && hunt.section.parentCode !== area) return false;
    if (searchTerm.trim()) {
      const title = getSectionTitle(hunt, displayLanguage).toLowerCase();
      if (!title.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }
    if (status !== 'all') {
      const progress = state.hunts[hunt.section.code];
      const completed = !!progress?.completed;
      if (status === 'completed' && !completed) return false;
      if (status === 'pending' && completed) return false;
    }
    return true;
  });

  return (
    <section>
      <h1>Hunts / Marks</h1>
      <HuntFilters
        areas={areas}
        selectedArea={area}
        onAreaChange={setArea}
        status={status}
        onStatusChange={setStatus}
        searchTerm={searchTerm}
        onSearchTerm={setSearchTerm}
      />
      <div className={styles.list}>
        {filtered.map((hunt) => {
          const parent = hunt.section.parentCode ? getSectionByCode(hunt.section.parentCode) : undefined;
          const parentTitle = parent ? getSectionTitle(parent, displayLanguage) : undefined;
          return (
            <HuntCard
              key={hunt.section.code}
              hunt={hunt}
              areaName={parentTitle}
              parentCode={parent?.section.code}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HuntsPage;
