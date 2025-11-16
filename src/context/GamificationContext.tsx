import { createContext, useContext, useMemo } from 'react';
import { useProgress } from './ProgressContext';
import { getAllSections, getCrystalLocations } from '../lib/walkthrough-data';

interface TrophyDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  getValue: () => number;
}

export interface TrophyProgress extends TrophyDefinition {
  value: number;
  progress: number;
  achieved: boolean;
}

const GamificationContext = createContext<{ trophies: TrophyProgress[]; score: number } | null>(null);

export const GamificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { stats, state } = useProgress();

  const trophies = useMemo(() => {
    const totalSections = getAllSections().length;
    const fullyCleared = Object.values(state.sections).filter(
      (section) => section.storyComplete && section.huntsComplete && section.lootComplete,
    ).length;
    const crystalTotal = getCrystalLocations().length;
    const crystalRuns = Object.entries(state.sections).filter(([code]) => {
      const section = getAllSections().find((item) => item.section.code === code);
      return section?.entry?.crystals?.teleport || section?.entry?.crystals?.save;
    }).length;

    const definitions: TrophyDefinition[] = [
      {
        id: 'story-master',
        title: 'Sky Pirate Chronicler',
        description: 'Complete every story milestone in the walkthrough timeline.',
        icon: '📜',
        requirement: stats.totalStory,
        getValue: () => stats.storyCompleted,
      },
      {
        id: 'hunt-slayer',
        title: 'Elite Marksman',
        description: 'Defeat every Hunt / Mark listed in the run order.',
        icon: '🎯',
        requirement: stats.totalHunts,
        getValue: () => stats.huntsCompleted,
      },
      {
        id: 'hunt-payday',
        title: 'Clan Treasurer',
        description: 'Collect all Hunt rewards after defeating the marks.',
        icon: '💰',
        requirement: stats.totalHunts,
        getValue: () => stats.huntsRewarded,
      },
      {
        id: 'loot-hoarder',
        title: 'Loot Savant',
        description: 'Secure every highlighted loot alert in the guide.',
        icon: '🧰',
        requirement: stats.totalLoots,
        getValue: () => stats.lootsObtained,
      },
      {
        id: 'area-legend',
        title: 'Archadian Curator',
        description: 'Clear story, Hunts and Loot checklist for every visited area.',
        icon: '🏆',
        requirement: totalSections,
        getValue: () => fullyCleared,
      },
      {
        id: 'waystone-warden',
        title: 'Waystone Warden',
        description: 'Activate checklists in every section that hosts a Teleport or Save crystal.',
        icon: '💠',
        requirement: crystalTotal,
        getValue: () => crystalRuns,
      },
    ];

    return definitions.map((definition) => {
      const value = definition.getValue();
      const progress = definition.requirement === 0 ? 0 : Math.min(1, value / definition.requirement);
      return { ...definition, value, progress, achieved: progress >= 1 };
    });
  }, [state.sections, stats]);

  const score = useMemo(() => {
    if (!trophies.length) return 0;
    const total = trophies.reduce((sum, trophy) => sum + trophy.progress, 0);
    return Math.round((total / trophies.length) * 100);
  }, [trophies]);

  const value = useMemo(() => ({ trophies, score }), [trophies, score]);

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used inside GamificationProvider');
  }
  return context;
};
