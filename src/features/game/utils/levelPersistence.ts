import type { LevelConfig } from '@/shared/types';
import { LevelCompression } from './levelCompression';

const STORAGE_KEY = 'among-us-levels';

export class LevelPersistence {
  static saveLevels(levels: Record<number, LevelConfig>): void {
    try {
      const versionedData = {
        version: LevelCompression.CURRENT_VERSION,
        timestamp: Date.now(),
        levels
      };

      const compressed = LevelCompression.compress(versionedData);
      localStorage.setItem(STORAGE_KEY, compressed);
      console.log('Levels saved successfully');
    } catch (error) {
      console.error('Failed to save levels:', error);
    }
  }

  static loadLevels(): Record<number, LevelConfig> | null {
    try {
      const compressed = localStorage.getItem(STORAGE_KEY);
      if (!compressed) return null;

      const versionedData = LevelCompression.decompress(compressed);
      
      // 版本检查
      if (!LevelCompression.isVersionCompatible(versionedData.version)) {
        console.warn('Incompatible level data version, regenerating...');
        return null;
      }

      // 检查数据时效性（可选：7天后重新生成）
      const isExpired = Date.now() - versionedData.timestamp > 7 * 24 * 60 * 60 * 1000;
      if (isExpired) {
        console.warn('Level data expired, regenerating...');
        return null;
      }

      console.log('Levels loaded successfully');
      return versionedData.levels;
    } catch (error) {
      console.error('Failed to load levels:', error);
      return null;
    }
  }

  static clearLevels(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Levels cleared successfully');
    } catch (error) {
      console.error('Failed to clear levels:', error);
    }
  }

  // 导出当前关卡数据（用于调试）
  static exportLevels(): string | null {
    try {
      const compressed = localStorage.getItem(STORAGE_KEY);
      if (!compressed) return null;
      return compressed;
    } catch (error) {
      console.error('Failed to export levels:', error);
      return null;
    }
  }

  // 导入关卡数据（用于调试）
  static importLevels(compressed: string): boolean {
    try {
      const versionedData = LevelCompression.decompress(compressed);
      if (!LevelCompression.isVersionCompatible(versionedData.version)) {
        console.error('Incompatible level data version');
        return false;
      }
      localStorage.setItem(STORAGE_KEY, compressed);
      return true;
    } catch (error) {
      console.error('Failed to import levels:', error);
      return false;
    }
  }
} 