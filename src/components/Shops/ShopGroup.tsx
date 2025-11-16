import { useLanguage } from '../../context/LanguageContext';
import type { SectionWithEntry } from '../../types/walkthrough';
import { getSectionTitle, resolveLocalized, formatPrice } from '../../utils/formatters';
import styles from './ShopGroup.module.css';

const ShopGroup = ({ section }: { section: SectionWithEntry }) => {
  const { displayLanguage } = useLanguage();
  const title = getSectionTitle(section, displayLanguage);
  const shops = section.entry?.shops ?? [];

  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      {shops.map((shop, index) => (
        <div key={index} className={styles.shop}>
          <header>
            <strong>{shop.name ?? shop.type ?? 'Shop'}</strong>
            <span>{shop.type ?? 'shop'}</span>
          </header>
          <ul>
            {shop.items?.map((item, idx) => (
              <li key={idx}>
                <span>
                  {resolveLocalized({ en: item.nameEn, jp: item.nameJp, raw: item.nameRaw }, displayLanguage)}
                </span>
                <span>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
};

export default ShopGroup;
