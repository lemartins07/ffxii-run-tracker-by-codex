import { useMemo, useState } from 'react';
import { getItemsIndex } from '../lib/walkthrough-data';
import ItemFilters from '../components/Items/ItemFilters';
import ItemRow from '../components/Items/ItemRow';
import styles from './ItemsPage.module.css';

const items = getItemsIndex();

const ItemsPage = () => {
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    if (!term.trim()) return items;
    const normalized = term.toLowerCase();
    return items.filter((item) => {
      return (
        item.itemId.toLowerCase().includes(normalized) ||
        item.nameEn?.toLowerCase().includes(normalized) ||
        item.nameJp?.toLowerCase().includes(normalized)
      );
    });
  }, [term]);

  return (
    <section>
      <h1>Item index</h1>
      <ItemFilters searchTerm={term} onSearchTerm={setTerm} />
      <div className={styles.list}>
        {filtered.map((item) => (
          <ItemRow key={item.itemId} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemsPage;
