import type { LevelConfig } from '@/shared/types';
import pako from 'pako';  // 需要安装: npm install pako @types/pako

interface VersionedLevelData {
  version: string;
  timestamp: number;
  levels: Record<number, LevelConfig>;
}

export class LevelCompression {
  private static readonly CURRENT_VERSION = '1.0.0';

  static compress(data: VersionedLevelData): string {
    try {
      const jsonString = JSON.stringify(data);
      const compressed = pako.deflate(jsonString, { to: 'string' });
      return btoa(compressed);
    } catch (error) {
      console.error('Compression failed:', error);
      throw error;
    }
  }

  static decompress(compressed: string): VersionedLevelData {
    try {
      const decompressed = pako.inflate(atob(compressed), { to: 'string' });
      return JSON.parse(decompressed);
    } catch (error) {
      console.error('Decompression failed:', error);
      throw error;
    }
  }

  static isVersionCompatible(version: string): boolean {
    const [major1, minor1] = version.split('.');
    const [major2, minor2] = this.CURRENT_VERSION.split('.');
    return major1 === major2 && parseInt(minor1) >= parseInt(minor2);
  }
} 