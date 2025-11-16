import { useMemo, useState } from 'react';
import { getAllSections } from '../lib/walkthrough-data';
import ShopGroup from '../components/Shops/ShopGroup';
import styles from './ShopsPage.module.css';

const sectionsWithShops = getAllSections().filter((section) => section.entry?.shops?.length);

const ShopsPage = () => {
  const [shopType, setShopType] = useState('all');
  const [term, setTerm] = useState('');

  const types = useMemo(() => {
    const set = new Set<string>();
    sectionsWithShops.forEach((section) => {
      section.entry?.shops?.forEach((shop) => {
        if (shop.type) {
          set.add(shop.type);
        }
      });
    });
    return Array.from(set);
  }, []);

  const filtered = sectionsWithShops.filter((section) => {
    const matchesType =
      shopType === 'all' || section.entry?.shops?.some((shop) => shop.type === shopType);
    if (!matchesType) return false;
    if (term.trim()) {
      const normalized = term.toLowerCase();
      const matchesTitle = section.section.label?.en?.toLowerCase().includes(normalized);
      return matchesTitle ?? false;
    }
    return true;
  });

  return (
    <section>
      <h1>Shops by area</h1>
      <div className={styles.filters}>
        <select value={shopType} onChange={(event) => setShopType(event.target.value)}>
          <option value="all">All shop types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search area" />
      </div>
      <div className={styles.list}>
        {filtered.map((section) => (
          <ShopGroup key={section.section.code} section={section} />
        ))}
      </div>
    </section>
  );
};

export default ShopsPage;
