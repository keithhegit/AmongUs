import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';

export const GameResultModal = observer(() => {
  const { gameStore } = useStore();
  const { showResultModal, isVictory, nextLevel, restartLevel, currentLevelIndex } = gameStore;

  if (!showResultModal) return null;

  const isLastLevel = currentLevelIndex === 9;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">
          {isVictory ? '恭喜通关！' : '游戏结束'}
        </h2>
        <p className="whitespace-pre-line mb-6">
          {isVictory 
            ? isLastLevel 
              ? '所有关卡完成！\n你耗光了基夫的脑力，\n请期待新关卡更新！'
              : '你成功找出了所有伪人！'
            : '很遗憾，你失败了。再试一次吧！'}
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={restartLevel}
          >
            重新开始
          </button>
          {isVictory && !isLastLevel && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={nextLevel}
            >
              下一关
            </button>
          )}
        </div>
      </div>
    </div>
  );
}); 