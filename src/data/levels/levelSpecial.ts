import type { LevelConfig } from '@/shared/types/game';

export const levelSpecial: LevelConfig = {
  id: 999,  // 特殊ID用于彩蛋关
  gridSize: {
    rows: 6,
    cols: 6
  },
  startPosition: 'D5',  // 初始揭示位置
  impostorCount: 17,   // 伪人数量
  characters: [
    // A列
    {
      id: '051',  // 女性ID范围
      position: 'A1',
      name: '林颖聪',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: 'Og第一大乔',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '003',  // Changed to '003' for bearded male
      position: 'A2',
      name: '黄家明',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '所有有胡子的男中有6个是人类',
        type: 'relation',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '002',
      position: 'A3',
      name: '王维良',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工位摆满零食打游戏',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '005',  // Changed to '005' for bearded male
      position: 'A4',
      name: '邓万城',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'F列的所有人类正下方都有一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '052',
      position: 'A5',
      name: '吴伟涛',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '上班网购不干活',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '039',  // Changed from '004'
      position: 'A6',
      name: '李跃龙',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '装病请假去旅游',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // B列
    {
      id: '007',  // Changed from '005' to avoid conflict
      position: 'B1',
      name: '吴凯',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '有空位的行伪人数相等',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '006',
      position: 'B2',
      name: '田恩泽',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '牛！黄家明最牛逼！',
        type: 'relation',
        targetPosition: '',
        highlightNames: ['黄家明'],
        isUsed: false
      }
    },
    {
      id: '029',  // Changed from '053'
      position: 'B3',
      name: '梁洁滢',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工作群只发表情包',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '200',  // 空位ID
      position: 'B4',
      name: '',
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
      id: '054',
      position: 'B5',
      name: '卢宏玮',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '开会玩手机不记笔记',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '007',
      position: 'B6',
      name: '基哥',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我是基哥，我给全员发金水',
        type: 'relation',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // C列
    {
      id: '008',
      position: 'C1',
      name: '李特',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '3个角落有2个坏邻居',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '055',
      position: 'C2',
      name: '张雅璐',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '上班追剧被老板抓',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '009',
      position: 'C3',
      name: '于涵',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '左边的空位比另一个空位多一个伪人领居',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '056',
      position: 'C4',
      name: '陈浩静',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我的列和一个相邻列两端都是好人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '010',
      position: 'C5',
      name: '陈佑铭',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工位睡觉装在思考',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '011',
      position: 'C6',
      name: '马一棣',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我的行和列有2个好人在2个伪人之间',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // D列
    {
      id: '012',
      position: 'D1',
      name: '张秉元',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '摸鱼被抓装系统卡',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '057',
      position: 'D2',
      name: '陈晓仪',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '右半部分的列比左半部分多一个伪人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '013',
      position: 'D3',
      name: '柯鸿盛',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我的列的伪人数量等于第2行的',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '030',  // Changed from '058'
      position: 'D4',
      name: '万兰兰',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工作群只有收到两字',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '015',  // Restore original ID
      position: 'D5',
      name: '李岩松',
      state: 'revealed',  // 初始揭示位置
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: '两个空位都有左右两边的人类领居',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '059',
      position: 'D6',
      name: '蔡嘉怡',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '上班炒股亏了工资',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // E列
    {
      id: '015',  // Restore original ID
      position: 'E1',
      name: '曾培钒',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '距离我两个方格远的人是好人',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '016',
      position: 'E2',
      name: '梁嘉恩',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '拼命吃零食',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '200',  // 空位ID
      position: 'E3',
      name: '',
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
      id: '019',  // Restore original ID
      position: 'E4',
      name: '韦万扬',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我在第5行的对角领居都是人类',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '060',
      position: 'E5',
      name: '陈浩鹏',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工作日约人逛商场',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '018',
      position: 'E6',
      name: '周一苇',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '迟到早退装加班狗',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },

    // F列
    {
      id: '061',
      position: 'F1',
      name: '黄莹',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '你再试着问问别人？',
        type: 'relation',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '019',  // Restore original ID
      position: 'F2',
      name: '吴伟涛',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '工位摆枕头睡大觉',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '062',
      position: 'F3',
      name: '黄咏茵',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '家明吴凯培钒仨都像人类',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '020',  // Restore original ID
      position: 'F4',
      name: '梁天时',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '上班看小说不干活',
        type: 'behavior',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '021',  // Use specified ID
      position: 'F5',
      name: '喻钰仁',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第4行和第5行的人类和伪人不在相同列',
        type: 'area',
        targetPosition: '',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '063',
      position: 'F6',
      name: '陈静文',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '会议室偷吃零食',
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
        fromPosition: 'D5',
        clueType: 'area',
        targetInfo: {
          area: 'neighbors'
        }
      },
      {
        round: 2,
        fromPosition: 'A2',
        clueType: 'relation',
        targetInfo: {
          area: 'all'
        }
      },
      {
        round: 3,
        fromPosition: 'A4',
        clueType: 'area',
        targetInfo: {
          area: 'column'
        }
      }
    ]
  }
}; 