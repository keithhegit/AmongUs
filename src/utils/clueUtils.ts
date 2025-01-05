import badClues from '@/data/clues/badClues.json';
import type { Clue } from '@/shared/types';

export class ClueUtils {
  static getRandomBadClue(): Clue {
    const { badClues: clues } = badClues;
    const randomIndex = Math.floor(Math.random() * clues.length);
    const clue = clues[randomIndex];
    
    return {
      id: clue.id,
      text: clue.text,
      type: clue.type,
      isUsed: false
    };
  }

  static getClueById(id: string): Clue | undefined {
    const { badClues: clues } = badClues;
    const clue = clues.find(c => c.id === id);
    
    if (!clue) return undefined;
    
    return {
      id: clue.id,
      text: clue.text,
      type: clue.type,
      isUsed: false
    };
  }
} 