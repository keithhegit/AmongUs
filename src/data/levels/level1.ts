import { ClueUtils } from '@/utils/clueUtils';
import type { LevelConfig } from '@/shared/types';

export const level1: LevelConfig = {
  id: 1,
  gridSize: { rows: 3, cols: 3 },
  startPosition: 'A2',
  impostorCount: 2,
  characters: [
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
        text: '监控显示B1和A3昨晚在仓库鬼鬼祟祟',
        type: 'direct',
        targetPosition: 'B1',
        highlightNames: ['B1', 'A3'],
        isUsed: false
      }
    },
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
        text: 'B区昨晚有可疑活动，[大明]负责那片区域',
        type: 'area',
        targetPosition: 'C3',
        highlightNames: ['大明'],
        isUsed: false
      }
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
      id: 'char_B2',
      position: 'B2',
      name: '阿杰',
      state: 'initial',
      identity: {
        isImpostor: false,
        isRevealed: false
      },
      clue: {
        text: '我和[福贵]负责仓库，他发现了异常',
        type: 'relation',
        targetPosition: 'C1',
        highlightNames: ['福贵'],
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
        text: '我看见有人深夜在值班室翻找记录，[嘉宝]当时也在',
        type: 'behavior',
        targetPosition: 'C2',
        highlightNames: ['嘉宝'],
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
        text: '仓库钥匙被人动过，[安娜]看见了可疑人员',
        type: 'behavior',
        targetPosition: 'B3',
        highlightNames: ['安娜'],
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
        text: '值班记录显示异常，让[阿明]调监控查查',
        type: 'behavior',
        targetPosition: 'A1',
        highlightNames: ['阿明'],
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
        text: '我在B区巡逻，发现[阿杰]在查监控室',
        type: 'relation',
        targetPosition: 'B2',
        highlightNames: ['阿杰'],
        isUsed: false
      }
    }
  ]
}; 