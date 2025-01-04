import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainMenu } from './MainMenu';
import { GameLayout } from './GameLayout';
import { LevelSelect } from './LevelSelect';

type Screen = 'menu' | 'game' | 'levelSelect';

export const MainStack = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleLevelSelect = () => {
    setCurrentScreen('levelSelect');
  };

  const handleLevelSelected = (level: number) => {
    setSelectedLevel(level);
    setCurrentScreen('game');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'menu' && (
        <motion.div
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
        >
          <MainMenu
            onStartGame={handleStartGame}
            onLevelSelect={handleLevelSelect}
          />
        </motion.div>
      )}

      {currentScreen === 'game' && (
        <motion.div
          key="game"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          className="fixed inset-0"
        >
          <GameLayout
            currentLevel={selectedLevel}
            totalLevels={21}
            coins={0}
            impostorsLeft={2}
            progress={{ current: 0, total: 8 }}
            onSettingsClick={handleBackToMenu}
          />
        </motion.div>
      )}

      {currentScreen === 'levelSelect' && (
        <motion.div
          key="levelSelect"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          className="fixed inset-0"
        >
          <LevelSelect
            onLevelSelect={handleLevelSelected}
            onBack={handleBackToMenu}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
