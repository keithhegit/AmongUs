import type { LevelConfig } from '@/shared/types';

export const level2: LevelConfig = {
  id: 2,
  gridSize: { rows: 3, cols: 3 },
  startPosition: 'A1',
  impostorCount: 1,
  characters: [
    {
      id: 'A1',
      position: 'A1',
      name: '小明',
      state: 'revealed',
      identity: {
        isImpostor: false,
        isRevealed: true
      },
      clue: {
        text: 'C3位置的一定是好人，他是我同事给我买过咖啡',
        type: 'direct',
        targetPosition: 'C3',
        isUsed: false
      }
    },
    {
      id: 'A2',
      position: 'A2',
      name: '阿华',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B2的邻居里一定有坏人',
        type: 'neighbor',
        targetPosition: 'B2',
        isUsed: false
      }
    },
    {
      id: 'A3',
      position: 'A3',
      name: '小薇',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C1和我一起工作，他很老实',
        type: 'relation',
        targetPosition: 'C1',
        isUsed: false
      }
    },
    {
      id: 'B1',
      position: 'B1',
      name: '建国',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'A排的人都是好人',
        type: 'area',
        targetArea: 'A',
        isUsed: false
      }
    },
    {
      id: 'B2',
      position: 'B2',
      name: '丽丽',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'C2最近表现很奇怪',
        type: 'direct',
        targetPosition: 'C2',
        isUsed: false
      }
    },
    {
      id: 'B3',
      position: 'B3',
      name: '阿强',
      state: 'initial',
      identity: {
        isImpostor: true,  // 坏人
        isRevealed: false
      },
      clue: {
        text: '我觉得C1有问题',
        type: 'deception',
        targetPosition: 'C1',
        isUsed: false
      }
    },
    {
      id: 'C1',
      position: 'C1',
      name: '小云',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'A3说得对，我们经常一起工作',
        type: 'relation',
        targetPosition: 'A3',
        isUsed: false
      }
    },
    {
      id: 'C2',
      position: 'C2',
      name: '阿美',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: 'B3最近总是鬼鬼祟祟的',
        type: 'direct',
        targetPosition: 'B3',
        isUsed: false
      }
    },
    {
      id: 'C3',
      position: 'C3',
      name: '大壮',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我和A1经常一起喝咖啡',
        type: 'relation',
        targetPosition: 'A1',
        isUsed: false
      }
    }
  ],
  clueFlow: {
    steps: [
      {
        round: 1,
        fromPosition: 'A1',
        clueType: 'direct',
        targetInfo: { position: 'C3' }
      }
    ]
  }
}; 