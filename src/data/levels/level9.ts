import type { LevelConfig } from '@/shared/types/game';

export const level9: LevelConfig = {
  id: 9,
  gridSize: {
    rows: 4,
    cols: 3
  },
  startPosition: ['A1', 'B1', 'A2'],
  impostorCount: 3,
  characters: [
    // A列
    {
      id: '007',  // 男性角色
      position: 'A1',
      name: '阿东',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '我的邻居中有一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '052',  // 女性角色
      position: 'A2',
      name: '小玲',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '第3和第4行一共有1个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '015',  // 长胡子男性角色
      position: 'A3',
      name: '小广',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B列的伪人少于2个',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '053',  // 女性角色
      position: 'A4',
      name: '阿慧',
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

    // B列
    {
      id: '054',  // 女性角色
      position: 'B1',
      name: '阿兰',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '所有留着长胡子的人都不是伪人',
        type: 'relation',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '008',  // 男性角色
      position: 'B2',
      name: '小瑞',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '抢车位',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '057',  // 修正：女性角色
      position: 'B3',
      name: '小青',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '继续加油，你能解开这个谜题！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '010',  // 男性角色
      position: 'B4',
      name: '阿翔',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C列有1个伪人，但是没在第3行',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // C列
    {
      id: '011',  // 男性角色
      position: 'C1',
      name: '阿成',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '加油大侦探，马上就能破案了呦！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '058',  // 修正：女性角色
      position: 'C2',
      name: '阿蕾',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '抢车位',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '012',  // 男性角色
      position: 'C3',
      name: '小晨',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿成不可能是伪人，他天就在那骂抢他那个车位的人',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿成'],
        isUsed: false
      }
    },
    {
      id: '039',  // 长胡子男性角色
      position: 'C4',
      name: '小凡',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '这些金币送给你',
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
        fromPosition: 'A1',
        clueType: 'area',
        targetInfo: {
          area: 'neighbors'
        }
      },
      {
        round: 2,
        fromPosition: 'B1',
        clueType: 'relation',
        targetInfo: {
          position: 'A3'
        }
      },
      {
        round: 3,
        fromPosition: 'A2',
        clueType: 'area',
        targetInfo: {
          area: 'rows'
        }
      }
    ]
  }
}; 