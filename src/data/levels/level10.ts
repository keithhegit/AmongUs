import type { LevelConfig } from '@/shared/types/game';

export const level10: LevelConfig = {
  id: 10,
  gridSize: {
    rows: 5,
    cols: 4
  },
  startPosition: ['C1', 'D3', 'B5'],
  impostorCount: 4,
  characters: [
    // A列
    {
      id: '001',  // 男性角色
      position: 'A1',
      name: '小楠',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我是来打酱油的，过！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '200',  // 空位
      position: 'A2',
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
      id: '002',  // 男性角色
      position: 'A3',
      name: '阿震',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '加油破案！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '051',  // 女性角色
      position: 'A4',
      name: '阿洁',
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
      id: '052',  // 女性角色
      position: 'A5',
      name: '小雨',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B列唯一的伪人不在阿伟那行',
        type: 'area',
        targetPosition: '',
        highlightNames: ['阿伟'],
        isUsed: false
      }
    },

    // B列
    {
      id: '200',  // 空位
      position: 'B1',
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
      id: '053',  // 女性角色
      position: 'B2',
      name: '阿雪',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '继续加油！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '003',  // 男性角色
      position: 'B3',
      name: '小瑞',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '你已经很接近真相了',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '004',  // 男性角色
      position: 'B4',
      name: '小才',
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
      id: '005',  // 男性角色
      position: 'B5',
      name: '阿凯',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '只有一个邻居那人是好人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // C列
    {
      id: '006',  // 男性角色
      position: 'C1',
      name: '阿航',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: 'A列唯一的伪人有5个邻居',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '007',  // 男性角色
      position: 'C2',
      name: '小刚',
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
      id: '008',  // 男性角色
      position: 'C3',
      name: '小航',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第2行的伪人夹在两个好人之间',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '054',  // 女性角色
      position: 'C4',
      name: '小洁',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '你再试着问问别人？',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '055',  // 女性角色
      position: 'C5',
      name: '小青',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第1和第2行加起来有2个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // D列
    {
      id: '056',  // 女性角色
      position: 'D1',
      name: '小瑞',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '顺手牵羊',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '057',  // 女性角色
      position: 'D2',
      name: '小婉',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿震，阿洁或小雨其中之一是伪人',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿震', '阿洁', '小雨'],
        isUsed: false
      }
    },
    {
      id: '009',  // 男性角色
      position: 'D3',
      name: '阿伟',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '我所在列的唯一伪人不在我下面',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '058',  // 女性角色
      position: 'D4',
      name: '阿静',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C列位于小刚以下的所有人都是无辜的',
        type: 'area',
        targetPosition: '',
        highlightNames: ['小刚'],
        isUsed: false
      }
    },
    {
      id: '200',  // 空位
      position: 'D5',
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
    }
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'C1',
        clueType: 'area',
        targetInfo: {
          area: 'neighbors'
        }
      },
      {
        round: 2,
        fromPosition: 'D3',
        clueType: 'area',
        targetInfo: {
          area: 'column'
        }
      },
      {
        round: 3,
        fromPosition: 'B5',
        clueType: 'area',
        targetInfo: {
          area: 'neighbors'
        }
      }
    ]
  }
}; 