import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types';

export const level5: LevelConfig = {
  id: 5,
  gridSize: { rows: 4, cols: 3 },
  startPosition: 'C4',
  impostorCount: 3, // B2, C2, A4是坏人
  characters: [
    {
      id: 'char_A1',
      position: 'A1',
      name: '小泉(警察)',
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
      id: 'char_B1',
      position: 'B1',
      name: '阿瑞(路人)',
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
      id: 'char_C1',
      position: 'C1',
      name: '阿魔(警察)',
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
      id: 'char_A2',
      position: 'A2',
      name: '小莲(路人)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '请收下我的感谢之意!',
        type: 'behavior',
        targetPosition: 'B2',
        highlightNames: [],
        isUsed: false
      }
    },
    {
      id: 'char_B2',
      position: 'B2',
      name: '小妍(路人)',
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
      id: 'char_C2',
      position: 'C2',
      name: '阿星(警察)',
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
      id: 'char_A3',
      position: 'A3',
      name: '阿玉(医生)',
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
      id: 'char_B3',
      position: 'B3',
      name: '阿婷(路人)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '小妍是她那列唯一的坏蛋',
        type: 'area',
        targetPosition: 'B2',
        highlightNames: ['小妍'],
        isUsed: false
      }
    },
    {
      id: 'char_C3',
      position: 'C3',
      name: '小天(路人)',
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
      id: 'char_A4',
      position: 'A4',
      name: '阿凯(路人)',
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
      id: 'char_B4',
      position: 'B4',
      name: '阿智(医生)',
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
      id: 'char_C4',
      position: 'C4',
      name: '小义(路人)',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我的同团都是好人',
        type: 'area',
        targetPosition: 'B4',
        highlightNames: [],
        isUsed: false
      }
    }
  ]
};

export default level5; 