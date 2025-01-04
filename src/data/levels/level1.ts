import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types';

export const level1: LevelConfig = {
  id: 1,
  gridSize: { rows: 3, cols: 3 },
  startPosition: 'A2',
  impostorCount: 2,
  characters: [
    {
      id: 'char_A2',
      position: 'A2',
      name: '隆基',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C3是好人，他帮过我',
        type: 'direct',
        targetPosition: 'C3',
        isUsed: false
      }
    },
    {
      id: 'char_B1',
      position: 'B1',
      name: '阿强',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: ClueUtils.getRandomBadClue()
    },
    {
      id: 'char_A3',
      position: 'A3',
      name: '阿聪',
      state: 'initial',
      identity: {
        isImpostor: true,
        isRevealed: false
      },
      clue: ClueUtils.getRandomBadClue()
    },
    {
      id: 'char_A1',
      position: 'A1',
      name: '阿明',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我相信B3是好人',
        type: 'direct',
        targetPosition: 'B3',
        isUsed: false
      }
    },
    {
      id: 'char_C1',
      position: 'C1',
      name: '福贵',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'A3行为很可疑',
        type: 'direct',
        targetPosition: 'A3',
        isUsed: false
      }
    },
    {
      id: 'char_B2',
      position: 'B2',
      name: '阿杰',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B1最近很奇怪',
        type: 'direct',
        targetPosition: 'B1',
        isUsed: false
      }
    },
    {
      id: 'char_C2',
      position: 'C2',
      name: '嘉宝',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我看见A3鬼鬼祟祟的',
        type: 'direct',
        targetPosition: 'A3',
        isUsed: false
      }
    },
    {
      id: 'char_B3',
      position: 'B3',
      name: '安娜',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B1的行为很反常',
        type: 'direct',
        targetPosition: 'B1',
        isUsed: false
      }
    },
    {
      id: 'char_C3',
      position: 'C3',
      name: '大明',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我觉得A3有问题',
        type: 'direct',
        targetPosition: 'A3',
        isUsed: false
      }
    }
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'A2',
        clueType: 'direct',
        targetInfo: { position: 'C3' }
      }
    ]
  }
}; 