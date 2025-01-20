import type { LevelConfig } from '@/shared/types/game';

export const level6: LevelConfig = {
  id: 6,
  gridSize: {
    rows: 5,
    cols: 3
  },
  startPosition: ['C1', 'C4'],
  impostorCount: 4,
  characters: [
    {
      id: '001',
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
        highlightNames: ['阿霞', '小月'],
        isUsed: false
      }
    },
    {
      id: '004',
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
        highlightNames: ['小宁', '小峰', '小雅'],
        isUsed: false
      }
    },
    {
      id: '006',
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
      id: '002',
      position: 'A2',
      name: '小峰',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'A列中有两个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '005',
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
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '009',
      position: 'C2',
      name: '阿霞',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '如果你觉得字太小，可以双指捏合',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '013',
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
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '007',
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
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '009',
      position: 'C3',
      name: '小月',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '农夫左边的人是好人',
        type: 'direct',
        targetPosition: 'B3',
        highlightNames: ['小贤'],
        isUsed: false
      }
    },
    {
      id: '010',
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
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '112',
      position: 'B4',
      name: '小宁-农夫',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '小峰和小雅都是我的好孩子',
        type: 'direct',
        targetPosition: '',
        highlightNames: ['小峰', '小雅'],
        isUsed: false
      }
    },
    {
      id: '011',
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
        targetPosition: '',
        highlightNames: ['小梦'],
        isUsed: false
      }
    },
    {
      id: '012',
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
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '014',
      position: 'B5',
      name: '小雅',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第五行中有一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '016',
      position: 'C5',
      name: '小天',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '任务完成准备迎接下一个挑战吧',
        type: 'behavior',
        targetPosition: '',
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
          position: 'A2'
        }
      },
      {
        round: 2,
        fromPosition: 'C4',
        clueType: 'area',
        targetInfo: {
          area: 'row1'
        }
      },
      {
        round: 3,
        fromPosition: 'A1',
        clueType: 'direct',
        targetInfo: {
          position: 'C2'
        }
      },
      {
        round: 4,
        fromPosition: 'C3',
        clueType: 'direct',
        targetInfo: {
          position: 'B3'
        }
      },
      {
        round: 5,
        fromPosition: 'B4',
        clueType: 'direct',
        targetInfo: {
          position: 'A2'
        }
      }
    ]
  }
}; 