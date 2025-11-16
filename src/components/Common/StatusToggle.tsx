import styles from './StatusToggle.module.css';

interface Props {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const StatusToggle = ({ checked, label, onChange }: Props) => (
  <label className={styles.toggle}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

export default StatusToggle;
