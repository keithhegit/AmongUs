import { useState, useCallback, useEffect } from 'react';
import type { GameStore } from '../stores/gameStore';
import type { GameStatistics, LevelStatistics } from '../types/statistics';
import { supabase } from '../lib/supabase';
import { calculateStatistics } from '../utils/statisticsUtils';

export function useStatistics(gameStore: GameStore) {
  const [currentLevelStats, setCurrentLevelStats] = useState<LevelStatistics>({
    levelId: '',
    startTime: new Date(),
    mistakes: 0,
    cluesUsed: [],
    revealedCharacters: [],
  });

  const [globalStats, setGlobalStats] = useState<GameStatistics>({
    totalGames: 0,
    gamesWon: 0,
    gamesLost: 0,
    totalMistakes: 0,
    cluesUsed: 0,
    averageTimePerLevel: 0,
    fastestLevel: 0,
    charactersRevealed: 0,
  });

  // Update current level statistics
  useEffect(() => {
    if (gameStore.currentLevel?.id !== currentLevelStats.levelId) {
      setCurrentLevelStats({
        levelId: gameStore.currentLevel?.id || '',
        startTime: new Date(),
        mistakes: 0,
        cluesUsed: [],
        revealedCharacters: [],
      });
    }
  }, [gameStore.currentLevel?.id]);

  // Track statistics changes
  useEffect(() => {
    setCurrentLevelStats(prev => ({
      ...prev,
      mistakes: gameStore.mistakes,
      cluesUsed: Array.from(gameStore.usedClues),
      revealedCharacters: gameStore.currentLevel?.characters
        .filter(char => char.identity.isRevealed)
        .map(char => char.position) || [],
    }));
  }, [gameStore.mistakes, gameStore.usedClues.size, gameStore.currentLevel?.characters]);

  // Save level statistics when game ends
  const saveLevelStatistics = useCallback(async () => {
    if (!gameStore.currentLevel) return;

    const endTime = new Date();
    const outcome = gameStore.allEvilRevealed ? 'victory' : 'defeat';
    
    const finalStats: LevelStatistics = {
      ...currentLevelStats,
      endTime,
      outcome,
    };

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('level_statistics')
        .insert({
          user_id: user.id,
          level_id: finalStats.levelId,
          start_time: finalStats.startTime,
          end_time: finalStats.endTime,
          mistakes: finalStats.mistakes,
          clues_used: finalStats.cluesUsed,
          revealed_characters: finalStats.revealedCharacters,
          outcome: finalStats.outcome,
        });

      // Update global statistics
      await updateGlobalStatistics();
    } catch (error) {
      console.error('Failed to save level statistics:', error);
    }
  }, [currentLevelStats, gameStore]);

  // Load global statistics
  const updateGlobalStatistics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: levelStats } = await supabase
        .from('level_statistics')
        .select('*')
        .eq('user_id', user.id);

      if (levelStats) {
        const stats = calculateStatistics(levelStats);
        setGlobalStats(stats);
      }
    } catch (error) {
      console.error('Failed to load global statistics:', error);
    }
  };

  useEffect(() => {
    updateGlobalStatistics();
  }, []);

  return {
    currentLevelStats,
    globalStats,
    saveLevelStatistics,
  };
}