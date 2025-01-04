import React from 'react';

interface StatisticsButtonProps {
  onPress: () => void;
}

export function StatisticsButton({ onPress }: StatisticsButtonProps) {
  return (
    <button
      className="fixed top-4 right-4 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl"
      onClick={onPress}
    >
      📊
    </button>
  );
}