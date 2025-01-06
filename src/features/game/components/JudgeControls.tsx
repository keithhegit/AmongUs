import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { cn } from '@/utils/cn';

export const JudgeControls = observer(() => {
  const { gameStore } = useStore();
  const { judgeMode, setJudgeMode, currentLevel } = gameStore;

  if (!currentLevel) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="max-w-md mx-auto px-3 py-1">
        <div className="text-center text-[10px] text-gray-500 mb-1">
          点击切换判定模式 · 长按卡片可放大查看
        </div>
        
        <div className="flex gap-2 justify-center mb-1">
          <button
            className={cn(
              "px-3 py-1 rounded-full transition-all flex items-center gap-1",
              judgeMode === 'good' && "bg-blue-100"
            )}
            onClick={() => setJudgeMode('good')}
          >
            <span className="text-lg">😊</span>
            <span className="text-sm">TA好人</span>
          </button>
          <button
            className={cn(
              "px-3 py-1 rounded-full transition-all flex items-center gap-1",
              judgeMode === 'bad' && "bg-red-100"
            )}
            onClick={() => setJudgeMode('bad')}
          >
            <span className="text-lg">😈</span>
            <span className="text-sm">TA坏人</span>
          </button>
        </div>
      </div>
    </div>
  );
}); 