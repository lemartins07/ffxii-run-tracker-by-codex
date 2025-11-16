import { useMemo } from 'react';
import { getSectionKinds } from '../../lib/walkthrough-data';
import styles from './TimelineFilters.module.css';

interface Props {
  selectedKinds: string[];
  onToggleKind: (kind: string) => void;
  searchTerm: string;
  onSearchTerm: (term: string) => void;
}

const TimelineFilters = ({ selectedKinds, onToggleKind, searchTerm, onSearchTerm }: Props) => {
  const kinds = useMemo(() => getSectionKinds().sort(), []);

  return (
    <div className={styles.filters}>
      <div className={styles.kinds}>
        {kinds.map((kind) => (
          <label key={kind} className={styles.kindChip}>
            <input
              type="checkbox"
              checked={selectedKinds.includes(kind)}
              onChange={() => onToggleKind(kind)}
            />
            <span>{kind}</span>
          </label>
        ))}
      </div>
      <input
        value={searchTerm}
        onChange={(event) => onSearchTerm(event.target.value)}
        className={styles.search}
        placeholder="Filter by title"
      />
    </div>
  );
};

export default TimelineFilters;
