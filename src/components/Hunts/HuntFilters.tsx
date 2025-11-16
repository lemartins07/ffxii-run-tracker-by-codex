import styles from './HuntFilters.module.css';

interface Props {
  areas: { code: string; label: string }[];
  selectedArea: string;
  onAreaChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  searchTerm: string;
  onSearchTerm: (value: string) => void;
}

const HuntFilters = ({ areas, selectedArea, onAreaChange, status, onStatusChange, searchTerm, onSearchTerm }: Props) => (
  <div className={styles.filters}>
    <select value={selectedArea} onChange={(event) => onAreaChange(event.target.value)}>
      <option value="all">All areas</option>
      {areas.map((area) => (
        <option key={area.code} value={area.code}>
          {area.label}
        </option>
      ))}
    </select>
    <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
      <option value="all">All status</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
    <input
      value={searchTerm}
      onChange={(event) => onSearchTerm(event.target.value)}
      placeholder="Search hunts"
    />
  </div>
);

export default HuntFilters;
