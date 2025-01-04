import React from 'react';

interface GameStatusProps {
  isGameOver: boolean;
  isVictory: boolean;
  onRestart: () => void;
  onNextLevel?: () => void;
}

export function GameStatus({ 
  isGameOver, 
  isVictory, 
  onRestart,
  onNextLevel 
}: GameStatusProps) {
  if (!isGameOver && !isVictory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
        <h2 className={`text-2xl font-bold text-center mb-4 ${
          isVictory ? 'text-green-600' : 'text-red-600'
        }`}>
          {isVictory ? 'Level Complete!' : 'Game Over'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {isVictory 
            ? 'You successfully identified all evil characters!' 
            : 'Too many mistakes. Try again!'}
        </p>

        <div className="space-y-3">
          {isVictory && onNextLevel && (
            <button 
              className="bg-green-500 py-3 px-6 rounded-lg w-full text-white font-semibold"
              onClick={onNextLevel}
            >
              Next Level
            </button>
          )}
          
          <button 
            className={`${isVictory ? 'bg-gray-500' : 'bg-blue-500'} py-3 px-6 rounded-lg w-full text-white font-semibold`}
            onClick={onRestart}
          >
            {isVictory ? 'Replay Level' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}