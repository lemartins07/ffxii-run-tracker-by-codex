import styles from './CrystalFilters.module.css';

interface Props {
  teleportOnly: boolean;
  saveOnly: boolean;
  onTeleportToggle: () => void;
  onSaveToggle: () => void;
}

const CrystalFilters = ({ teleportOnly, saveOnly, onTeleportToggle, onSaveToggle }: Props) => (
  <div className={styles.filters}>
    <label>
      <input type="checkbox" checked={teleportOnly} onChange={onTeleportToggle} />
      Teleport only
    </label>
    <label>
      <input type="checkbox" checked={saveOnly} onChange={onSaveToggle} />
      Save only
    </label>
  </div>
);

export default CrystalFilters;
