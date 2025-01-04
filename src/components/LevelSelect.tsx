import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  levelId: number;
  onClick: () => void;
}

const LevelCard = ({ levelId, onClick }: LevelCardProps) => {
  const { isLevelUnlocked, getLevelStatus } = useProgressStore();
  const status = getLevelStatus(levelId);
  const unlocked = isLevelUnlocked(levelId);

  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.05 : 1 }}
      whileTap={{ scale: unlocked ? 0.95 : 1 }}
      className={cn(
        "relative aspect-square rounded-xl p-4",
        "shadow-lg",
        "transition-all duration-200",
        unlocked 
          ? "bg-white dark:bg-gray-800 cursor-pointer" 
          : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50"
      )}
      onClick={() => unlocked && onClick()}
    >
      {/* 关卡编号 */}
      <div className="text-2xl font-bold text-center mb-2">
        关卡 {levelId}
      </div>

      {/* 锁定状态 */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-8 h-8 text-gray-500" />
        </div>
      )}

      {/* 星级显示 */}
      {status.isCompleted && (
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={cn(
              "text-2xl",
              i < status.stars ? "text-yellow-400" : "text-gray-300"
            )}>
              ⭐
            </span>
          ))}
        </div>
      )}

      {/* 最佳成绩 */}
      {status.bestScore > 0 && (
        <div className="text-sm text-center mt-2 text-gray-500">
          最高分: {status.bestScore}
        </div>
      )}
    </motion.div>
  );
};

export const LevelSelect = () => {
  const totalLevels = 20; // 总关卡数

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {Array.from({ length: totalLevels }).map((_, i) => (
        <LevelCard
          key={i + 1}
          levelId={i + 1}
          onClick={() => {
            // TODO: 跳转到关卡
          }}
        />
      ))}
    </div>
  );
};