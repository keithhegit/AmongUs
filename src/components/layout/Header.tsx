import React from 'react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isGameScreen = location.pathname.includes('/level/');
  const level = isGameScreen ? location.pathname.split('/')[2] : null;

  if (!isGameScreen) return null;

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Level info and remaining impostors */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">👿</span>
            <span className="font-bold">3</span>
          </div>
        </div>

        {/* Right: Progress and coins */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">🪙</span>
            <span>140</span>
          </div>
        </div>
      </div>
    </header>
  );
}