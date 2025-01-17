import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types/game';

export const level5: LevelConfig = {
  id: 5,
  gridSize: { rows: 4, cols: 3 },
  startPosition: 'C4',
  impostorCount: 3, // B2, C2, A4是坏人
  characters: [
    {
      id: '120', // 男警察
      position: 'A1',
      name: '小泉',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我和阿玉之间的人没有时间犯罪',
        type: 'area',
        targetPosition: 'B1',
        highlightNames: ['阿玉'],
        isUsed: false
      }
    },
    {
      id: '001', // 随机路人
      position: 'B1',
      name: '阿瑞',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我左边的警察是好人',
        type: 'direct',
        targetPosition: 'A1',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '121', // 女警察
      position: 'C1',
      name: '阿珍',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '警察中有一个是警但我不知道是哪一个',
        type: 'area',
        targetPosition: 'A1',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '002', // 随机路人
      position: 'A2',
      name: '阿强',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '坏警察不是女生',
        type: 'direct',
        targetPosition: 'C2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '003', // 随机路人(坏人)
      position: 'B2',
      name: 'David',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '被抓到在商店零元购',
        type: 'behavior',
        targetPosition: 'C2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '120', // 男警察(坏人)
      position: 'C2',
      name: '阿星',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '偷电瓶',
        type: 'behavior',
        targetPosition: 'A3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '108', // 男医生
      position: 'A3',
      name: '阿明',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '医生是好人，他永远不会伤害任何人',
        type: 'direct',
        targetPosition: 'B3',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '004', // 随机路人
      position: 'B3',
      name: '阿婷',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'David是他那列唯一的坏蛋',
        type: 'area',
        targetPosition: 'B2',
        highlightNames: ['David'],
        isUsed: false
      }
    },
    {
      id: '005', // 随机路人
      position: 'C3',
      name: '小天',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '第四排有一个坏蛋',
        type: 'area',
        targetPosition: 'A4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '006', // 随机路人(坏人)
      position: 'A4',
      name: '小龙',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: {
        text: '打游戏挂机',
        type: 'behavior',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '109', // 女医生
      position: 'B4',
      name: '阿智',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我发现我右边的人是好人，我现在要给他做手术',
        type: 'direct',
        targetPosition: 'C4',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: '012', // 随机路人
      position: 'C4',
      name: '小义',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我的邻居都是好人',
        type: 'area',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    }
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'C4',
        clueType: 'area',
        targetInfo: {
          position: 'B4'
        }
      },
      {
        round: 2,
        fromPosition: 'B4',
        clueType: 'direct',
        targetInfo: {
          position: 'C4'
        }
      },
      {
        round: 3,
        fromPosition: 'A3',
        clueType: 'direct',
        targetInfo: {
          position: 'B3'
        }
      }
    ]
  }
};

export default level5; 