import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store';

interface UserNameModalProps {
  isOpen: boolean;
  mode: 'register' | 'login';
  onSubmit: (name: string) => void;
}

export const UserNameModal = ({ isOpen, mode, onSubmit }: UserNameModalProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('请输入名字');
      return;
    }
    onSubmit(name.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* 弹窗 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-2xl font-bold mb-4">
                {mode === 'register' ? '欢迎来到游戏！' : '欢迎回来！'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {mode === 'register' 
                  ? '请输入你的名字以保存游戏进度' 
                  : '请输入你的名字以继续游戏'}
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入你的名字"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 mb-4"
                  autoFocus
                />
                
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  {mode === 'register' ? '开始游戏' : '继续游戏'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 