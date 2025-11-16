import { useState } from 'react';
import { getCrystalLocations } from '../lib/walkthrough-data';
import CrystalFilters from '../components/Crystals/CrystalFilters';
import CrystalCard from '../components/Crystals/CrystalCard';
import styles from './CrystalsPage.module.css';

const allCrystals = getCrystalLocations();

const CrystalsPage = () => {
  const [teleportOnly, setTeleportOnly] = useState(false);
  const [saveOnly, setSaveOnly] = useState(false);

  const filtered = allCrystals.filter((section) => {
    if (teleportOnly && !section.entry?.crystals?.teleport) return false;
    if (saveOnly && !section.entry?.crystals?.save) return false;
    return true;
  });

  return (
    <section>
      <h1>Crystals / Travel</h1>
      <CrystalFilters
        teleportOnly={teleportOnly}
        saveOnly={saveOnly}
        onTeleportToggle={() => setTeleportOnly((prev) => !prev)}
        onSaveToggle={() => setSaveOnly((prev) => !prev)}
      />
      <div className={styles.grid}>
        {filtered.map((section) => (
          <CrystalCard key={section.section.code} section={section} />
        ))}
      </div>
    </section>
  );
};

export default CrystalsPage;
