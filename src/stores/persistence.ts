import type { GameState } from '@/types/game';

const STORAGE_KEY = 'among-us-game-state';

interface StoredGameData {
  currentLevel: number;
  coins: number;
  unlockedLevels: number[];
  lastPlayedAt: string;
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    vibrationEnabled: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

export class PersistenceManager {
  private data: StoredGameData;

  constructor() {
    this.data = this.loadFromStorage() || this.getInitialData();
  }

  private getInitialData(): StoredGameData {
    return {
      currentLevel: 1,
      coins: 0,
      unlockedLevels: [1],
      lastPlayedAt: new Date().toISOString(),
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        vibrationEnabled: true,
        theme: 'system'
      }
    };
  }

  private loadFromStorage(): StoredGameData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load game data:', error);
      return null;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save game data:', error);
    }
  }

  // 游戏进度相关方法
  getCurrentLevel(): number {
    return this.data.currentLevel;
  }

  setCurrentLevel(level: number) {
    this.data.currentLevel = level;
    this.saveToStorage();
  }

  getCoins(): number {
    return this.data.coins;
  }

  addCoins(amount: number) {
    this.data.coins += amount;
    this.saveToStorage();
  }

  spendCoins(amount: number): boolean {
    if (this.data.coins >= amount) {
      this.data.coins -= amount;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // 关卡解锁相关方法
  isLevelUnlocked(level: number): boolean {
    return this.data.unlockedLevels.includes(level);
  }

  unlockLevel(level: number) {
    if (!this.isLevelUnlocked(level)) {
      this.data.unlockedLevels.push(level);
      this.data.unlockedLevels.sort((a, b) => a - b);
      this.saveToStorage();
    }
  }

  getUnlockedLevels(): number[] {
    return [...this.data.unlockedLevels];
  }

  // 设置相关方法
  getSettings() {
    return { ...this.data.settings };
  }

  updateSettings(settings: Partial<StoredGameData['settings']>) {
    this.data.settings = {
      ...this.data.settings,
      ...settings
    };
    this.saveToStorage();
  }

  // 重置游戏
  resetGame() {
    this.data = this.getInitialData();
    this.saveToStorage();
  }

  // 导出/导入存档
  exportData(): string {
    return btoa(JSON.stringify(this.data));
  }

  importData(encoded: string): boolean {
    try {
      const decoded = JSON.parse(atob(encoded));
      // 验证数据结构
      if (this.validateGameData(decoded)) {
        this.data = decoded;
        this.saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import game data:', error);
      return false;
    }
  }

  private validateGameData(data: any): data is StoredGameData {
    return (
      typeof data === 'object' &&
      typeof data.currentLevel === 'number' &&
      typeof data.coins === 'number' &&
      Array.isArray(data.unlockedLevels) &&
      typeof data.lastPlayedAt === 'string' &&
      typeof data.settings === 'object'
    );
  }
}

export const persistenceManager = new PersistenceManager(); 