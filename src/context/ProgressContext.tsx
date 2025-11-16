import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getSectionsByKind } from '../lib/walkthrough-data';

type SectionChecklistKey = 'storyComplete' | 'huntsComplete' | 'lootComplete';

interface SectionProgressState {
  storyComplete: boolean;
  huntsComplete: boolean;
  lootComplete: boolean;
}

interface HuntProgressState {
  completed: boolean;
  rewardCollected: boolean;
}

interface LootProgressState {
  obtained: boolean;
}

interface ProgressState {
  sections: Record<string, SectionProgressState>;
  hunts: Record<string, HuntProgressState>;
  loots: Record<string, LootProgressState>;
}

const ProgressContext = createContext<{
  runId: string;
  state: ProgressState;
  toggleSection: (code: string, key: SectionChecklistKey) => void;
  toggleHunt: (code: string, key: keyof HuntProgressState) => void;
  toggleLoot: (code: string) => void;
  stats: {
    storyCompleted: number;
    huntsCompleted: number;
    huntsRewarded: number;
    lootsObtained: number;
    totalStory: number;
    totalHunts: number;
    totalLoots: number;
  };
} | null>(null);

const DEFAULT_STATE: ProgressState = {
  sections: {},
  hunts: {},
  loots: {},
};

const STORAGE_KEY = 'ffxii-run-tracker::progress';
const DEFAULT_RUN = 'default-run';

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useLocalStorage<Record<string, ProgressState>>(STORAGE_KEY, {
    [DEFAULT_RUN]: DEFAULT_STATE,
  });

  const runId = DEFAULT_RUN;
  const runState = state[runId] ?? DEFAULT_STATE;

  const toggleSection = (code: string, key: SectionChecklistKey) => {
    setState((prev) => {
      const next = { ...prev };
      const currentRun = next[runId] ?? DEFAULT_STATE;
      const currentSection = currentRun.sections[code] ?? {
        storyComplete: false,
        huntsComplete: false,
        lootComplete: false,
      };
      next[runId] = {
        ...currentRun,
        sections: {
          ...currentRun.sections,
          [code]: {
            ...currentSection,
            [key]: !currentSection[key],
          },
        },
      };
      return next;
    });
  };

  const toggleHunt = (code: string, key: keyof HuntProgressState) => {
    setState((prev) => {
      const next = { ...prev };
      const currentRun = next[runId] ?? DEFAULT_STATE;
      const currentHunt = currentRun.hunts[code] ?? {
        completed: false,
        rewardCollected: false,
      };
      next[runId] = {
        ...currentRun,
        hunts: {
          ...currentRun.hunts,
          [code]: {
            ...currentHunt,
            [key]: !currentHunt[key],
          },
        },
      };
      return next;
    });
  };

  const toggleLoot = (code: string) => {
    setState((prev) => {
      const next = { ...prev };
      const currentRun = next[runId] ?? DEFAULT_STATE;
      next[runId] = {
        ...currentRun,
        loots: {
          ...currentRun.loots,
          [code]: {
            obtained: !currentRun.loots[code]?.obtained,
          },
        },
      };
      return next;
    });
  };

  const stats = useMemo(() => {
    const totalStory = getSectionsByKind('story').length;
    const totalHunts = getSectionsByKind('mark').length;
    const totalLoots = getSectionsByKind('loot').length;
    const storyCompleted = Object.values(runState.sections).filter((section) => section.storyComplete).length;
    const huntsCompleted = Object.values(runState.hunts).filter((hunt) => hunt.completed).length;
    const huntsRewarded = Object.values(runState.hunts).filter((hunt) => hunt.rewardCollected).length;
    const lootsObtained = Object.values(runState.loots).filter((loot) => loot.obtained).length;
    return { storyCompleted, huntsCompleted, huntsRewarded, lootsObtained, totalStory, totalHunts, totalLoots };
  }, [runState.sections, runState.hunts, runState.loots]);

  const value = useMemo(
    () => ({ runId, state: runState, toggleSection, toggleHunt, toggleLoot, stats }),
    [runId, runState, stats],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used inside ProgressProvider');
  }
  return context;
};
