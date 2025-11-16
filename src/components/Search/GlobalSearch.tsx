import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useLanguage } from '../../context/LanguageContext';
import { getSectionTitle } from '../../utils/formatters';
import styles from './GlobalSearch.module.css';

const GlobalSearch = () => {
  const { query, results, search, clear } = useSearch();
  const { displayLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const hasResults = useMemo(
    () => results.sections.length + results.items.length + results.shops.length > 0,
    [results],
  );

  const onNavigate = (path: string) => {
    navigate(path);
    clear();
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Search sections, hunts, items... (/ to focus)"
        value={query}
        onChange={(event) => {
          const value = event.target.value;
          search(value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && hasResults && (
        <div className={styles.popover}>
          {results.sections.length > 0 && (
            <div>
              <p className={styles.category}>Sections</p>
              <ul>
                {results.sections.slice(0, 6).map((item) => (
                  <li key={item.section.code}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/section/${item.section.code}`)}
                      className={styles.resultButton}
                    >
                      <span>{getSectionTitle(item, displayLanguage)}</span>
                      <small>{item.section.kind}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {results.items.length > 0 && (
            <div>
              <p className={styles.category}>Items</p>
              <ul>
                {results.items.slice(0, 6).map((item) => (
                  <li key={item.itemId}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/items?focus=${item.itemId}`)}
                      className={styles.resultButton}
                    >
                      <span>{item.nameEn ?? item.nameJp ?? item.itemId}</span>
                      <small>{item.occurrences.length} shops</small>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {results.shops.length > 0 && (
            <div>
              <p className={styles.category}>Shops</p>
              <ul>
                {results.shops.slice(0, 6).map((shop, index) => (
                  <li key={`${shop.sectionCode}-${shop.shopType}-${index}`}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/section/${shop.sectionCode}`)}
                      className={styles.resultButton}
                    >
                      <span>{shop.shopName ?? shop.shopType}</span>
                      <small>{shop.shopType}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
