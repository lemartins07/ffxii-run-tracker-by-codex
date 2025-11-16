import type { NarrativeEntry } from '../../types/walkthrough';
import styles from './NarrativeBlock.module.css';

const normalizeText = (entry: NarrativeEntry) => (typeof entry === 'string' ? entry : entry.text);

const NarrativeBlock = ({ narrative }: { narrative?: NarrativeEntry[] }) => {
  if (!narrative?.length) return null;
  return (
    <div className={styles.wrapper}>
      <h3>Narrative</h3>
      {narrative.map((paragraph, index) => (
        <p key={index}>{normalizeText(paragraph)}</p>
      ))}
    </div>
  );
};

export default NarrativeBlock;
