import { useProgress } from '../../context/ProgressContext';
import styles from './SectionChecklist.module.css';

const SectionChecklist = ({ code }: { code: string }) => {
  const { state, toggleSection } = useProgress();
  const checklist = state.sections[code] ?? {
    storyComplete: false,
    huntsComplete: false,
    lootComplete: false,
  };

  return (
    <div className={styles.wrapper}>
      <h3>Progress checklist</h3>
      <label>
        <input
          type="checkbox"
          checked={checklist.storyComplete}
          onChange={() => toggleSection(code, 'storyComplete')}
        />
        História concluída
      </label>
      <label>
        <input
          type="checkbox"
          checked={checklist.huntsComplete}
          onChange={() => toggleSection(code, 'huntsComplete')}
        />
        Hunts desta área concluídas
      </label>
      <label>
        <input
          type="checkbox"
          checked={checklist.lootComplete}
          onChange={() => toggleSection(code, 'lootComplete')}
        />
        Loots importantes coletados
      </label>
    </div>
  );
};

export default SectionChecklist;
