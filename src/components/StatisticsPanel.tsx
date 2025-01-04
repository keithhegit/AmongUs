import React from 'react';
import { formatTime } from '../utils/timeUtils';
import type { GameStatistics } from '../types/statistics';

interface StatisticsPanelProps {
  statistics: GameStatistics;
  isVisible: boolean;
  onClose: () => void;
}

export function StatisticsPanel({ statistics, isVisible, onClose }: StatisticsPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Game Statistics</h2>
        
        <div className="space-y-3">
          <StatItem 
            label="Games Played" 
            value={statistics.totalGames.toString()} 
          />
          <StatItem 
            label="Win Rate" 
            value={`${Math.round((statistics.gamesWon / statistics.totalGames) * 100)}%`} 
          />
          <StatItem 
            label="Average Mistakes" 
            value={(statistics.totalMistakes / statistics.totalGames).toFixed(1)} 
          />
          <StatItem 
            label="Average Time" 
            value={formatTime(statistics.averageTimePerLevel)} 
          />
          <StatItem 
            label="Fastest Level" 
            value={formatTime(statistics.fastestLevel)} 
          />
          <StatItem 
            label="Clues Used" 
            value={statistics.cluesUsed.toString()} 
          />
        </div>

        <button 
          className="mt-6 bg-blue-500 py-3 px-6 rounded-lg w-full text-white font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}