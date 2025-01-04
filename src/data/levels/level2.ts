import type { Level } from '../../types/game';

export const LEVEL_2: Level = {
  id: '2',
  level_number: 2,
  grid_layout: {
    columns: ['A', 'B', 'C', 'D'],
    rows: [1, 2],
    maxColumns: 4,
    maxRows: 2
  },
  evil_count: 3,
  complexity: 2,
  characters: [
    {
      position: 'A1',
      name: 'Emma',
      identity: { isEvil: true, isRevealed: false },
      clue: {
        text: 'The market seems busier than usual lately.',
        isUsed: false,
        isEffective: false
      },
      visual: {
        avatar: '/avatars/character5.png',
        background: 'market',
        profession: 'Merchant'
      }
    },
    {
      position: 'B1',
      name: 'Frank',
      identity: { isEvil: false, isRevealed: false },
      clue: {
        text: 'I heard strange noises from the tavern last night.',
        isUsed: false,
        isEffective: true
      },
      visual: {
        avatar: '/avatars/character6.png',
        background: 'house',
        profession: 'Guard'
      }
    },
    {
      position: 'C1',
      name: 'Grace',
      identity: { isEvil: true, isRevealed: false },
      clue: {
        text: 'Nothing unusual to report.',
        isUsed: false,
        isEffective: false
      },
      visual: {
        avatar: '/avatars/character7.png',
        background: 'tavern',
        profession: 'Barmaid'
      }
    },
    {
      position: 'D1',
      name: 'Henry',
      identity: { isEvil: false, isRevealed: false },
      clue: {
        text: 'Emma and Grace were whispering in the corner.',
        isUsed: false,
        isEffective: true
      },
      visual: {
        avatar: '/avatars/character8.png',
        background: 'library',
        profession: 'Scholar'
      }
    },
    {
      position: 'A2',
      name: 'Isabel',
      identity: { isEvil: true, isRevealed: false },
      clue: {
        text: 'The town is perfectly safe.',
        isUsed: false,
        isEffective: false
      },
      visual: {
        avatar: '/avatars/character9.png',
        background: 'house',
        profession: 'Noble'
      }
    }
  ]
};