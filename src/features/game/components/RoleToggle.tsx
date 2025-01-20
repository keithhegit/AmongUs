import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { cn } from '@/lib/utils';

export const RoleToggle = observer(() => {
  const { gameStore } = useStore();
  const isGood = gameStore.judgeMode === 'good';

  return (
    <div className="flex gap-[20px]">
      <button 
        className={cn(
          "w-[140px] h-[70px] rounded-[35px]",
          "border-2 border-dashed",
          "flex items-center justify-center gap-2 transition-all",
          isGood ? "bg-blue-100 border-blue-300" : "bg-white/80 border-gray-300"
        )}
        onClick={() => gameStore.setJudgeMode('good')}
      >
        <span className="text-2xl">😊</span>
        <span className="text-base">TA是人类</span>
      </button>
      <button 
        className={cn(
          "w-[140px] h-[70px] rounded-[35px]",
          "border-2 border-dashed",
          "flex items-center justify-center gap-2 transition-all",
          !isGood ? "bg-red-100 border-red-300" : "bg-white/80 border-gray-300"
        )}
        onClick={() => gameStore.setJudgeMode('bad')}
      >
        <span className="text-2xl">😈</span>
        <span className="text-base">TA是伪人</span>
      </button>
    </div>
  );
}); 