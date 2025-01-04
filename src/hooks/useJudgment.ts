import { useState } from 'react';
import type { Character } from '../types/game';
import type { GameStore } from '../stores/gameStore';

export function useJudgment(gameStore: GameStore) {
  const [feedback, setFeedback] = useState<{
    isVisible: boolean;
    isCorrect: boolean;
  }>({ isVisible: false, isCorrect: false });

  const handleJudgment = (character: Character) => {
    const isCorrect = gameStore.makeJudgment(character, true);
    setFeedback({ isVisible: true, isCorrect });
  };

  const dismissFeedback = () => {
    setFeedback({ isVisible: false, isCorrect: false });
  };

  return {
    feedback,
    handleJudgment,
    dismissFeedback
  };
}