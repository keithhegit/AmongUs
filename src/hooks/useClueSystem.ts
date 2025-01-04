import { useState } from 'react';
import type { Clue } from '../types/game';
import type { GameStore } from '../stores/gameStore';

export function useClueSystem(gameStore: GameStore) {
  const [activeClue, setActiveClue] = useState<Clue | null>(null);

  const showClue = (clue: Clue) => {
    setActiveClue(clue);
    gameStore.useClue(clue.clue_id);
  };

  const hideClue = () => {
    setActiveClue(null);
  };

  return {
    activeClue,
    showClue,
    hideClue
  };
}