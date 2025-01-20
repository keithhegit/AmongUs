import { motion, AnimatePresence } from 'framer-motion';
// 暂时使用简单符号替代 react-icons
const icons = {
  close: '×',
  restart: '↻',
  next: '→'
};

interface GameOverModalProps {
  isOpen: boolean;
  success: boolean;
  level: number;
  mistakes: number;
  onRestart: () => void;
  onNext: () => void;
  onClose: () => void;
}

export const GameOverModal = ({
  isOpen,
  success,
  level,
  mistakes,
  onRestart,
  onNext,
  onClose
}: GameOverModalProps) => {
  // 计算得分：每个错误扣20分，满分100分
  const score = Math.max(0, 100 - mistakes * 20);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                {icons.close}
              </button>

              {/* 标题 */}
              <h2 className="text-2xl font-bold text-center mb-6">
                {success ? '恭喜通关！' : '游戏结束'}
              </h2>

              {/* 结果信息 */}
              <div className="space-y-4 mb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {success ? '🎉' : '😢'}
                  </div>
                  <p className="text-gray-600">
                    {success 
                      ? '你成功找出了所有的伪人！' 
                      : '很遗憾，错误次数太多了'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>关卡</span>
                    <span>第 {level} 关</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>错误次数</span>
                    <span>{mistakes} / 3</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>得分</span>
                    <span>{score} 分</span>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={onRestart}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {icons.restart} 重新开始
                </button>
                {success && (
                  <button
                    onClick={onNext}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    下一关 {icons.next}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 