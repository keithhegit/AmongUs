export interface User {
  id: string;
  name: string;
  createdAt: number;
  lastLoginAt: number;
}

export interface UserProgress {
  userId: string;
  levelStatuses: Record<number, LevelStatus>;
  totalCoins: number;
  achievements: string[];
}

export interface UserSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
} 