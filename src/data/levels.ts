import type { Level } from '../types/game';

export const LEVEL_1: Level = {
  id: '1',
  level_number: 1,
  grid_layout: {
    columns: ['A', 'B', 'C'],
    rows: [1, 2],
    maxColumns: 3,
    maxRows: 2
  },
  evil_count: 2,
  complexity: 1,
  characters: [
    {
      position: 'A1',
      name: 'Alice',
      identity: { isEvil: false, isRevealed: false },
      clue: {
        text: 'I saw someone suspicious near the library last night.',
        isUsed: false,
        isEffective: true
      },
      visual: {
        avatar: '/avatars/character1.png',
        background: 'library',
        profession: 'Librarian'
      }
    },
    {
      position: 'B1',
      name: 'Bob',
      identity: { isEvil: true, isRevealed: false },
      clue: {
        text: 'Everything has been normal lately.',
        isUsed: false,
        isEffective: false
      },
      visual: {
        avatar: '/avatars/character2.png',
        background: 'market',
        profession: 'Merchant'
      }
    },
    {
      position: 'C1',
      name: 'Carol',
      identity: { isEvil: false, isRevealed: false },
      clue: {
        text: 'Bob was acting strange yesterday.',
        isUsed: false,
        isEffective: true
      },
      visual: {
        avatar: '/avatars/character3.png',
        background: 'house',
        profession: 'Teacher'
      }
    },
    {
      position: 'A2',
      name: 'David',
      identity: { isEvil: true, isRevealed: false },
      clue: {
        text: 'I keep to myself mostly.',
        isUsed: false,
        isEffective: false
      },
      visual: {
        avatar: '/avatars/character4.png',
        background: 'tavern',
        profession: 'Innkeeper'
      }
    }
  ]
};