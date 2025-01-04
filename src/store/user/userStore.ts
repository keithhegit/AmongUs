import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, UserProgress } from '@/types/user';

interface UserState {
  currentUser?: UserProfile;
  userProgress?: UserProgress;
  
  // 动作
  register: (name: string) => Promise<void>;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

// 模拟本地存储
const USER_STORAGE_KEY = 'game_users';
const getStoredUsers = (): Record<string, UserProfile> => {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const getStoredProgress = (userId: string): UserProgress | undefined => {
  try {
    return JSON.parse(localStorage.getItem(`progress_${userId}`) || 'null');
  } catch {
    return undefined;
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: undefined,
      userProgress: undefined,

      register: async (name: string) => {
        const users = getStoredUsers();
        const existingUser = Object.values(users).find(u => u.name === name);
        
        if (existingUser) {
          throw new Error('该名字已被使用');
        }

        const newUser: UserProfile = {
          id: Date.now().toString(),
          name,
          createdAt: Date.now(),
          lastLoginAt: Date.now()
        };

        const newProgress: UserProgress = {
          userId: newUser.id,
          levelStatuses: {
            1: { id: 1, isUnlocked: true, isCompleted: false, stars: 0, bestScore: 0, bestTime: 0 }
          },
          totalCoins: 0,
          achievements: []
        };

        // 保存用户信息
        localStorage.setItem(
          USER_STORAGE_KEY, 
          JSON.stringify({ ...users, [newUser.id]: newUser })
        );

        // 保存进度
        localStorage.setItem(
          `progress_${newUser.id}`,
          JSON.stringify(newProgress)
        );

        set({ currentUser: newUser, userProgress: newProgress });
      },

      login: async (name: string) => {
        const users = getStoredUsers();
        const user = Object.values(users).find(u => u.name === name);
        
        if (!user) {
          return false;
        }

        const progress = getStoredProgress(user.id);
        
        // 更新最后登录时间
        const updatedUser = { ...user, lastLoginAt: Date.now() };
        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify({ ...users, [user.id]: updatedUser })
        );

        set({ currentUser: updatedUser, userProgress: progress });
        return true;
      },

      logout: () => {
        set({ currentUser: undefined, userProgress: undefined });
      },

      updateProgress: (progress) => {
        const state = get();
        if (!state.currentUser || !state.userProgress) return;

        const updatedProgress = {
          ...state.userProgress,
          ...progress
        };

        localStorage.setItem(
          `progress_${state.currentUser.id}`,
          JSON.stringify(updatedProgress)
        );

        set({ userProgress: updatedProgress });
      }
    }),
    {
      name: 'user-state'
    }
  )
); 