import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types/game';

export const level6: LevelConfig = {
  id: 6,
  gridSize: { rows: 5, cols: 3 },
  startPosition: ['C1', 'C4'],
  impostorCount: 4, // A3, A5, B2, B3是坏人
  characters: [
    {
      id: 'char_A1',
      position: 'A1',
      name: '小智',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '那对双胞胎姐妹是好人问问他们吧',
        type: 'direct',
        targetPosition: 'C2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A2',
      position: 'A2',
      name: '小峰',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'A列中有两个坏蛋',
        type: 'area',
        targetPosition: 'A3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A3',
      position: 'A3',
      name: '小芳',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '闯红灯',
        type: 'behavior',
        targetPosition: 'A4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A4',
      position: 'A4',
      name: '阿强',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '长按一个人以放大',
        type: 'behavior',
        targetPosition: 'A5',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_A5',
      position: 'A5',
      name: '小胡',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '打车不付账款',
        type: 'behavior',
        targetPosition: 'B1',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B1',
      position: 'B1',
      name: '小妍',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '农夫和他的孩子们都是好人问问他们吧',
        type: 'direct',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B2',
      position: 'B2',
      name: '小军',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '随地吐痰',
        type: 'behavior',
        targetPosition: 'B3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B3',
      position: 'B3',
      name: '小贤',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '恶意别车',
        type: 'behavior',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B4',
      position: 'B4',
      name: '小宁(农夫)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '小峰和小雅都是我的好孩子',
        type: 'direct',
        targetPosition: 'A2',
        highlightNames: ['小峰', '小雅'],
        isUsed: false
      }
    },
    {
      id: 'char_B5',
      position: 'B5',
      name: '小雅',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第五行中有一个坏蛋',
        type: 'area',
        targetPosition: 'A5',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C1',
      position: 'C1',
      name: '小梦',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '有3个坏蛋在小峰的周围',
        type: 'area',
        targetPosition: 'A2',
        highlightNames: ['小峰'],
        isUsed: false
      }
    },
    {
      id: 'char_C2',
      position: 'C2',
      name: '阿霞(twins)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '如果你觉得字太小，可以双指捏合',
        type: 'behavior',
        targetPosition: 'C3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C3',
      position: 'C3',
      name: '小月(twins)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '农夫左边的人是好人',
        type: 'direct',
        targetPosition: 'B3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_C4',
      position: 'C4',
      name: '小楠',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '和小梦同一行的人都没犯罪儿',
        type: 'area',
        targetPosition: 'A1',
        highlightNames: ['小梦'],
        isUsed: false
      }
    },
    {
      id: 'char_C5',
      position: 'C5',
      name: '小华',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第二列中有两个坏蛋',
        type: 'area',
        targetPosition: 'B1',
        highlightNames: [],
        isUsed: false
      }
    }
  ]
}; 