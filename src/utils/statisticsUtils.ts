import type { GameStatistics } from '../types/statistics';

interface RawLevelStatistics {
  start_time: string;
  end_time: string;
  mistakes: number;
  clues_used: string[];
  revealed_characters: string[];
  outcome: 'victory' | 'defeat';
}

export function calculateStatistics(levelStats: RawLevelStatistics[]): GameStatistics {
  const stats: GameStatistics = {
    totalGames: levelStats.length,
    gamesWon: 0,
    gamesLost: 0,
    totalMistakes: 0,
    cluesUsed: 0,
    averageTimePerLevel: 0,
    fastestLevel: Infinity,
    charactersRevealed: 0,
  };

  let totalTime = 0;

  levelStats.forEach(level => {
    // Count wins and losses
    if (level.outcome === 'victory') {
      stats.gamesWon++;
    } else {
      stats.gamesLost++;
    }

    // Sum up mistakes and clues
    stats.totalMistakes += level.mistakes;
    stats.cluesUsed += level.clues_used.length;
    stats.charactersRevealed += level.revealed_characters.length;

    // Calculate time statistics
    const startTime = new Date(level.start_time).getTime();
    const endTime = new Date(level.end_time).getTime();
    const levelTime = (endTime - startTime) / 1000; // Convert to seconds

    totalTime += levelTime;
    stats.fastestLevel = Math.min(stats.fastestLevel, levelTime);
  });

  // Calculate average time
  stats.averageTimePerLevel = totalTime / stats.totalGames;

  // If no levels completed yet, set fastestLevel to 0
  if (stats.fastestLevel === Infinity) {
    stats.fastestLevel = 0;
  }

  return stats;
}