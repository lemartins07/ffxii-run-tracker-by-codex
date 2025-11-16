import AppLayout from './components/Layout/AppLayout';
import TimelinePage from './pages/TimelinePage';
import SectionDetailPage from './pages/SectionDetailPage';
import HuntsPage from './pages/HuntsPage';
import LootPage from './pages/LootPage';
import ShopsPage from './pages/ShopsPage';
import ItemsPage from './pages/ItemsPage';
import CrystalsPage from './pages/CrystalsPage';
import GamificationPage from './pages/GamificationPage';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import { SearchProvider } from './context/SearchContext';
import { GamificationProvider } from './context/GamificationContext';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <LanguageProvider>
    <ProgressProvider>
      <GamificationProvider>
        <SearchProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<TimelinePage />} />
              <Route path="/section/:code" element={<SectionDetailPage />} />
              <Route path="/hunts" element={<HuntsPage />} />
              <Route path="/loot" element={<LootPage />} />
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/crystals" element={<CrystalsPage />} />
              <Route path="/gamification" element={<GamificationPage />} />
            </Routes>
          </AppLayout>
        </SearchProvider>
      </GamificationProvider>
    </ProgressProvider>
  </LanguageProvider>
);

export default App;
