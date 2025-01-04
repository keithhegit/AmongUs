import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Character } from '@/types/game';

interface CluePanelProps {
  character?: Character;
  onClose: () => void;
}

export const CluePanel = ({ character, onClose }: CluePanelProps) => {
  if (!character) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-x-0 bottom-0 p-4 pb-24"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-md mx-auto">
          {/* 角色信息 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-700 rounded-full">
              {character.visual.emoji}
            </div>
            <div>
              <h3 className="font-bold">{character.name}</h3>
              <p className="text-sm text-gray-500">{character.visual.profession}</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              {character.position}
            </div>
          </div>

          {/* 线索内容 */}
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="w-5 h-5 mt-1 text-blue-500" />
            <div className="flex-1 text-gray-700 dark:text-gray-300">
              {character.clue.text}
            </div>
          </div>

          {/* 关闭按钮 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            关闭
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};