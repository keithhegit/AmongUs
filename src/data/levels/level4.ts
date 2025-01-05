import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types';

export const level4: LevelConfig = {
  id: 4,
  gridSize: { rows: 3, cols: 3 },
  startPosition: 'C1',
  impostorCount: 2, // A1和B2是坏人
  characters: [
    {
      id: 'char_A1',
      position: 'A1',
      name: '阿雄',
      state: 'initial',
      identity: {
        isImpostor: true, // 坏人
        isRevealed: false
      },
      clue: {
        text: '我举报!我的同伙在B列，能少判我点吗?',
        type: 'direct',
        targetPosition: 'C2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B1',
      position: 'B1',
      name: '小广',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '太牛了!接下来还有很多谜团等着你呢',
        type: 'behavior',
        targetPosition: 'A2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C1',
      position: 'C1',
      name: '小薇',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我邻居中只有一个人是坏蛋',
        type: 'area',
        targetPosition: 'A1',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A2',
      position: 'A2',
      name: '小旭',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '"时刻注意右上角的状态哦"，别放过任何一条线索!',
        type: 'behavior',
        targetPosition: 'B2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B2',
      position: 'B2',
      name: '阿凯',
      state: 'initial',
      identity: {
        isImpostor: true, // 坏人
        isRevealed: false
      },
      clue: {
        text: '偷电瓶',
        type: 'behavior',
        targetPosition: 'B1',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C2',
      position: 'C2',
      name: '小燕',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我这行有1个坏蛋',
        type: 'area',
        targetPosition: 'B2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A3',
      position: 'A3',
      name: '小晴',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我这行的每个人都是好人',
        type: 'area',
        targetPosition: 'B3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B3',
      position: 'B3',
      name: '阿琴',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '其中一个坏蛋是橙色头发的',
        type: 'behavior',
        targetPosition: 'C3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C3',
      position: 'C3',
      name: '阿志',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '戴眼镜的人是好人',
        type: 'direct',
        targetPosition: 'B2',
        highlightNames: [],
        isUsed: false
      }
    }
  ]
}; 