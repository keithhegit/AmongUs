import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MainMenuProps {
  onStartGame: () => void;
  onLevelSelect: () => void;
}

export const MainMenu = ({
  onStartGame,
  onLevelSelect
}: MainMenuProps) => {
  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">谁是大卧底</h1>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="w-48 h-12 bg-blue-500 text-white rounded-lg"
          >
            开始游戏
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLevelSelect}
            className="w-48 h-12 bg-gray-500 text-white rounded-lg"
          >
            关卡选择
          </motion.button>
        </div>
      </div>
    </div>
  );
};