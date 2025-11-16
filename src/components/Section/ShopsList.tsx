import type { Shop } from '../../types/walkthrough';
import { useLanguage } from '../../context/LanguageContext';
import { resolveLocalized, formatPrice } from '../../utils/formatters';
import styles from './ShopsList.module.css';

const ShopsList = ({ shops }: { shops?: Shop[] }) => {
  const { displayLanguage } = useLanguage();
  if (!shops?.length) return null;

  return (
    <div className={styles.wrapper}>
      <h3>Lojas desta área</h3>
      {shops.map((shop, index) => (
        <div key={index} className={styles.shopCard}>
          <div className={styles.shopHeader}>
            <strong>{shop.name ?? shop.type ?? 'Shop'}</strong>
            <span>{shop.type ?? 'shop'}</span>
          </div>
          <ul>
            {shop.items?.map((item, idx) => (
              <li key={idx}>
                <span>{resolveLocalized({ en: item.nameEn, jp: item.nameJp, raw: item.nameRaw }, displayLanguage)}</span>
                <span className={styles.price}>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShopsList;
