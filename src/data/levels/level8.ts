import type { LevelConfig } from '@/shared/types/game';

export const level8: LevelConfig = {
  id: 8,
  gridSize: {
    rows: 4,
    cols: 4
  },
  startPosition: 'C2',
  impostorCount: 5,
  characters: [
    // A列
    {
      id: '051',  // 女性角色
      position: 'A1',
      name: '小莹',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '开挂打游戏',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '052',  // 女性角色
      position: 'A2',
      name: '小瑶',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我参加过阿成和阿娟的婚礼',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿成', '阿娟'],
        isUsed: false
      }
    },
    {
      id: '001',  // 男性角色
      position: 'A3',
      name: '小枫',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C列中只有一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '053',  // 女性角色
      position: 'A4',
      name: '阿芳',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '在我和阿翔之间有一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: ['阿翔'],
        isUsed: false
      }
    },

    // B列
    {
      id: '057',  // 修正：小雨是女生
      position: 'B1',
      name: '小雨',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '任务完成准备迎接下一个难题吧',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '002',  // 男性角色
      position: 'B2',
      name: '小海',
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
      id: '003',  // 男性角色
      position: 'B3',
      name: '阿成',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '我的妻子和我一起犯的事，你们怎么不抓她？',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿娟'],
        isUsed: false
      }
    },
    {
      id: '015',  // 修正：小楠 - 使用男性ID
      position: 'B4',
      name: '小楠',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿成是被小海教唆的，小海才是老手',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿成', '小海'],
        isUsed: false
      }
    },

    // C列
    {
      id: '005',  // 男性角色
      position: 'C1',
      name: '小亮',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿雄那里有重要情报！',
        type: 'direct',
        targetPosition: 'D3',
        highlightNames: ['阿雄'],
        isUsed: false
      }
    },
    {
      id: '058',  // 修正：小莹是女生
      position: 'C2',
      name: '小莹',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '四个角落中，只有小莹是伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: ['小莹'],
        isUsed: false
      }
    },
    {
      id: '018',  // 修正：小军 - 使用男性ID
      position: 'C3',
      name: '小军',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿成和他的妻子都是伪人',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿成', '阿娟'],
        isUsed: false
      }
    },
    {
      id: '007',  // 男性角色
      position: 'C4',
      name: '小江',
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

    // D列
    {
      id: '019',  // 修正：阿宇 - 使用男性ID
      position: 'D1',
      name: '阿宇',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '长按卡片可以放大查看哦！',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '059',  // 修正：阿娟是女生
      position: 'D2',
      name: '阿娟',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '故意送人头',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '012',  // 男性角色
      position: 'D3',
      name: '小军',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '每个伪人左右两边都是人类',
        type: 'relation',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '010',  // 男性角色
      position: 'D4',
      name: '阿翔',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '阿娟的邻居全是好人',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['阿娟'],
        isUsed: false
      }
    }
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'C2',
        clueType: 'area',
        targetInfo: {
          area: 'corners'
        }
      },
      {
        round: 2,
        fromPosition: 'B3',
        clueType: 'relation',
        targetInfo: {
          position: 'D2'
        }
      },
      {
        round: 3,
        fromPosition: 'B4',
        clueType: 'relation',
        targetInfo: {
          position: 'B2'
        }
      },
      {
        round: 4,
        fromPosition: 'D3',
        clueType: 'relation',
        targetInfo: {
          area: 'neighbors'
        }
      }
    ]
  }
}; 