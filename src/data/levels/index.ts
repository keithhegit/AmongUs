import type { LevelConfig } from '@/shared/types/game';
import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';
import { level6 } from './level6';
import { level7 } from './level7';
import { level8 } from './level8';
import { level9 } from './level9';
import { level10 } from './level10';
import { levelSpecial } from './levelSpecial';

const normalLevels: LevelConfig[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10
];

export { level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, levelSpecial };
export { normalLevels as default };

export const levels = {
  // ... existing code ...
  special: levelSpecial
};
