import type { LevelConfig } from '@/shared/types/game';

export const level7: LevelConfig = {
  id: 7,
  gridSize: {
    rows: 4,
    cols: 3
  },
  startPosition: ['B1', 'A4'],
  impostorCount: 3,
  characters: [
    {
      id: '110',
      position: 'A1',
      name: '小森',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '坏人们分布在每一列中',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '001',
      position: 'B1',
      name: '小杰',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '我的四个邻居中，我已能确定工程师是好人',
        type: 'direct',
        targetPosition: 'A1',
        highlightNames: ['小森'],
        isUsed: false
      }
    },
    {
      id: '002',
      position: 'C1',
      name: '阿莱',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '列C的坏人和列B的坏人藏在不同的行',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '004',
      position: 'A2',
      name: '小琳',
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
      id: '200',
      position: 'B2',
      name: '空位',
      state: 'completed',
      identity: {
        isImpostor: false,
        isRevealed: true,
        isBlank: true
      },
      clue: {
        text: '',
        type: 'none',
        targetPosition: '',
        highlightNames: [],
        isUsed: true
      }
    },
    {
      id: '006',
      position: 'C2',
      name: '阿婷',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '偷看别人手机',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '008',
      position: 'A3',
      name: '小亮',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '列C的坏人在消防员的周围',
        type: 'area',
        targetPosition: 'C3',
        highlightNames: ['小影'],
        isUsed: false
      }
    },
    {
      id: '200',
      position: 'B3',
      name: '空位',
      state: 'completed',
      identity: {
        isImpostor: false,
        isRevealed: true,
        isBlank: true
      },
      clue: {
        text: '',
        type: 'none',
        targetPosition: '',
        highlightNames: [],
        isUsed: true
      }
    },
    {
      id: '114',
      position: 'C3',
      name: '小影',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我注意到C2最近行为很可疑',
        type: 'direct',
        targetPosition: 'C2',
        highlightNames: ['阿婷'],
        isUsed: false
      }
    },
    {
      id: '009',
      position: 'A4',
      name: '阿茜',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '在我的两个邻居中，有一个坏蛋他和我同行',
        type: 'relation',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '010',
      position: 'B4',
      name: '阿冬',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '骗老太太买保健品',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '003',
      position: 'C4',
      name: '阿雄',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '中间的人呢...',
        type: 'area',
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
        fromPosition: 'B1',
        clueType: 'direct',
        targetInfo: {
          position: 'A1'
        }
      },
      {
        round: 2,
        fromPosition: 'A1',
        clueType: 'area',
        targetInfo: {
          area: 'all'
        }
      },
      {
        round: 3,
        fromPosition: 'C1',
        clueType: 'area',
        targetInfo: {
          area: 'BC'
        }
      },
      {
        round: 4,
        fromPosition: 'A3',
        clueType: 'area',
        targetInfo: {
          position: 'C3'
        }
      },
      {
        round: 5,
        fromPosition: 'C3',
        clueType: 'direct',
        targetInfo: {
          position: 'C2'
        }
      }
    ]
  }
}; 