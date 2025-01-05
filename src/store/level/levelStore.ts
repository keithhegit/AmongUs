import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LevelStatus } from '@/shared/types';

interface LevelProgressState {
  // 关卡解锁和进度状态
  levelStatuses: Record<number, LevelStatus>;
  // 当前可玩的最高关卡
  highestUnlockedLevel: number;
  
  // 动作
  unlockLevel: (levelNumber: number) => void;
  updateLevelStatus: (levelNumber: number, status: Partial<LevelStatus>) => void;
}

export const useLevelStore = create<LevelProgressState>()(
  persist(
    (set, get) => ({
      levelStatuses: {
        1: { // 第一关默认解锁
          isUnlocked: true,
          isCompleted: false,
          stars: 0,
          bestScore: 0,
          bestTime: 0
        }
      },
      highestUnlockedLevel: 1,

      unlockLevel: (levelNumber) => {
        set(state => ({
          levelStatuses: {
            ...state.levelStatuses,
            [levelNumber]: {
              isUnlocked: true,
              isCompleted: false,
              stars: 0,
              bestScore: 0,
              bestTime: 0
            }
          },
          highestUnlockedLevel: Math.max(state.highestUnlockedLevel, levelNumber)
        }));
      },

      updateLevelStatus: (levelNumber, status) => {
        set(state => ({
          levelStatuses: {
            ...state.levelStatuses,
            [levelNumber]: {
              ...state.levelStatuses[levelNumber],
              ...status
            }
          }
        }));
      }
    }),
    {
      name: 'level-progress'
    }
  )
); 