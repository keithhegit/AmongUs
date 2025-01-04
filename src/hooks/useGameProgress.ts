import { useState, useCallback, useEffect } from 'react';
import type { GameStore } from '../stores/gameStore';
import type { GameProgress, ProgressState } from '../types/progress';
import { supabase } from '../lib/supabase';

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function useGameProgress(gameStore: GameStore) {
  const [state, setState] = useState<ProgressState>({
    isSaving: false,
    lastSaved: null,
    error: null,
    maxUnlockedLevel: 1
  });

  const saveProgress = useCallback(async () => {
    if (!gameStore.currentLevel || !supabase.auth.getUser()) {
      return;
    }

    setState(prev => ({ ...prev, isSaving: true, error: null }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const progress: GameProgress = {
        userId: user.id,
        levelId: gameStore.currentLevel.id,
        currentState: {
          selectedCharacterId: gameStore.selectedCharacter?.position || null,
          revealedCharacters: gameStore.currentLevel.characters
            .filter(char => char.identity.isRevealed)
            .map(char => char.position),
          usedClues: Array.from(gameStore.usedClues),
          mistakes: gameStore.mistakes,
          maxUnlockedLevel: state.maxUnlockedLevel
        },
      };

      const { error } = await supabase
        .from('game_sessions')
        .upsert({
          user_id: progress.userId,
          level_id: progress.levelId,
          current_state: progress.currentState,
          mistakes: progress.currentState.mistakes,
        });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date(),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: error instanceof Error ? error : new Error('Failed to save progress'),
      }));
    }
  }, [gameStore, state.maxUnlockedLevel]);

  // Update max unlocked level when completing a level
  useEffect(() => {
    if (gameStore.allImpostorsRevealed && gameStore.currentLevel) {
      const nextLevel = gameStore.currentLevel.level_number + 1;
      setState(prev => ({
        ...prev,
        maxUnlockedLevel: Math.max(prev.maxUnlockedLevel, nextLevel)
      }));
    }
  }, [gameStore.allImpostorsRevealed, gameStore.currentLevel]);

  // Auto-save progress periodically
  useEffect(() => {
    const interval = setInterval(saveProgress, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [saveProgress]);

  return {
    ...state,
    saveProgress,
  };
}