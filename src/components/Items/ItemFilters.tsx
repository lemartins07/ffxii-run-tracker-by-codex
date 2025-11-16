import styles from './ItemFilters.module.css';

interface Props {
  searchTerm: string;
  onSearchTerm: (value: string) => void;
}

const ItemFilters = ({ searchTerm, onSearchTerm }: Props) => (
  <div className={styles.wrapper}>
    <input value={searchTerm} onChange={(event) => onSearchTerm(event.target.value)} placeholder="Search items" />
  </div>
);

export default ItemFilters;
