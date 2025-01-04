import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, HelpCircle } from 'lucide-react';

interface GameControlsProps {
  currentLevel: number;
  totalLevels: number;
  onVoteTypeChange: (isGood: boolean) => void;
  onHintClick: () => void;
}

export const GameControls = ({
  currentLevel,
  totalLevels,
  onVoteTypeChange,
  onHintClick
}: GameControlsProps) => {
  const [isGoodVote, setIsGoodVote] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVoteTypeToggle = () => {
    setIsGoodVote(!isGoodVote);
    onVoteTypeChange(!isGoodVote);
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 p-4",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur-sm border-t border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 投票类型切换 */}
        <motion.button
          onClick={handleVoteTypeToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-14 h-14 rounded-full",
            "flex items-center justify-center text-2xl",
            isGoodVote ? "bg-green-100" : "bg-red-100"
          )}
        >
          {isGoodVote ? "😊" : "😈"}
        </motion.button>

        {/* 右侧控制区 */}
        <div className="flex items-center gap-3">
          {/* 主题切换 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* 提示按钮 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHintClick}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          {/* 关卡指示器 */}
          <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {currentLevel}/{totalLevels}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 