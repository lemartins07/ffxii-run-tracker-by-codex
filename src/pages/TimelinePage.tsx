import { useMemo, useState } from 'react';
import { getAllSections } from '../lib/walkthrough-data';
import TimelineFilters from '../components/Timeline/TimelineFilters';
import TimelineItem from '../components/Timeline/TimelineItem';
import styles from './TimelinePage.module.css';

const allSections = getAllSections();
const defaultKinds = Array.from(new Set(allSections.map((item) => item.section.kind)));

const TimelinePage = () => {
  const [selectedKinds, setSelectedKinds] = useState<string[]>(defaultKinds);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return allSections.filter((item) => {
      if (!selectedKinds.includes(item.section.kind)) return false;
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      const title = `${item.section.label?.en ?? ''} ${item.section.label?.jp ?? ''} ${
        item.entry?.titles?.primary?.en ?? ''
      } ${item.entry?.titles?.primary?.jp ?? ''}`;
      return title.toLowerCase().includes(query);
    });
  }, [selectedKinds, searchTerm]);

  const toggleKind = (kind: string) => {
    setSelectedKinds((prev) =>
      prev.includes(kind) ? prev.filter((item) => item !== kind) : [...prev, kind],
    );
  };

  return (
    <section>
      <h1>Timeline</h1>
      <p className={styles.subtitle}>Story beats, Hunts and loot alerts in chronological order.</p>
      <TimelineFilters
        selectedKinds={selectedKinds}
        onToggleKind={toggleKind}
        searchTerm={searchTerm}
        onSearchTerm={setSearchTerm}
      />
      <div className={styles.grid}>
        {filtered.map((section) => (
          <TimelineItem key={section.section.code} section={section} />
        ))}
      </div>
    </section>
  );
};

export default TimelinePage;
