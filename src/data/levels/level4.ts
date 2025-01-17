import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types/game';

export const level4: LevelConfig = {
  id: 4,
  gridSize: { rows: 3, cols: 3 },
  startPosition: 'C1',
  impostorCount: 2,
  characters: [
    {
      id: '001',
      position: 'A1',
      name: '阿雄',
      state: 'initial',
      identity: {
        isImpostor: true,
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
      id: '002',
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
      id: '004',
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
      id: '013',
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
      id: '006',
      position: 'B2',
      name: '阿凯',
      state: 'initial',
      identity: {
        isImpostor: true,
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
      id: '017',
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
      id: '014',
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
      id: '024',
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
      id: '027',
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
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'C1',
        clueType: 'area',
        targetInfo: {
          position: 'A1'
        }
      },
      {
        round: 2,
        fromPosition: 'C2',
        clueType: 'area',
        targetInfo: {
          position: 'B2'
        }
      },
      {
        round: 3,
        fromPosition: 'A3',
        clueType: 'area',
        targetInfo: {
          position: 'B3'
        }
      }
    ]
  }
}; 