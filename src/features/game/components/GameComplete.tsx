import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Coins } from 'lucide-react';
import type { Character } from '@/types/game';

interface GameCompleteProps {
  levelNumber: number;
  coinsEarned: number;
  characters: Array<{
    name: string;
    position: string;
    isImpostor: boolean;
    emoji: string;
    clue?: string;
  }>;
  onNext: () => void;
  onReplay: () => void;
  onBack: () => void;
}

export const GameComplete = ({
  levelNumber,
  coinsEarned,
  characters,
  onNext,
  onReplay,
  onBack
}: GameCompleteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* 标题 */}
          <div className="bg-blue-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              关卡完成
            </h2>
          </div>

          {/* 角色列表 */}
          <div className="grid grid-cols-3 gap-4 p-6">
            <AnimatePresence mode="popLayout">
              {characters.map((char, index) => (
                <motion.div
                  key={char.position}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative p-4 rounded-xl",
                    "bg-gray-100 dark:bg-gray-700",
                    char.isImpostor ? "border-2 border-red-500" : "border-2 border-green-500"
                  )}
                >
                  <div className="absolute top-2 left-2 text-sm opacity-50">
                    {char.position}
                  </div>
                  <div className="text-3xl text-center mb-2">
                    {char.emoji}
                  </div>
                  <div className="text-center font-medium">
                    {char.name}
                  </div>
                  {char.clue && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {char.clue}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 奖励展示 */}
          <div className="bg-blue-50 dark:bg-gray-700/50 p-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                <Coins className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold">+{coinsEarned}</span>
              </div>
            </div>

            {/* 按钮组 */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-600"
              >
                返回
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                className="px-6 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30"
              >
                重玩
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-6 py-2 rounded-full bg-blue-500 text-white"
              >
                下一关
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 