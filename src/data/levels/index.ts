import { level1 } from './level1';
import { level2 } from './level2';

if (!level1 || !level2) {
  console.error('关卡数据加载失败');
}

export const levels = [level1, level2];

// 用于调试
console.log('关卡数据:', levels);

export { level1, level2 };
