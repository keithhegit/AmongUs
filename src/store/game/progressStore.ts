import { create } from 'zustand';

interface ProgressState {
  coins: number;
  unlockedLevels: number[];
  levelStatuses: Record<number, {
    stars: number;
    bestScore: number;
    bestTime: number;
  }>;
  
  // 动作
  addCoins: (amount: number) => void;
  unlockLevel: (levelNumber: number) => void;
  updateLevelStatus: (levelNumber: number, stars: number, score: number, time: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  coins: 0,
  unlockedLevels: [1],
  levelStatuses: {},

  addCoins: (amount) => set((state) => ({ 
    coins: state.coins + amount 
  })),

  unlockLevel: (levelNumber) => set((state) => ({
    unlockedLevels: [...new Set([...state.unlockedLevels, levelNumber])]
  })),

  updateLevelStatus: (levelNumber, stars, score, time) => set((state) => ({
    levelStatuses: {
      ...state.levelStatuses,
      [levelNumber]: {
        stars,
        bestScore: Math.max(score, state.levelStatuses[levelNumber]?.bestScore || 0),
        bestTime: Math.min(time, state.levelStatuses[levelNumber]?.bestTime || Infinity)
      }
    }
  }))
})); 