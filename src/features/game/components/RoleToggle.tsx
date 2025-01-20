import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { cn } from '@/lib/utils';

export const RoleToggle = observer(() => {
  const { gameStore } = useStore();
  const isGood = gameStore.judgeMode === 'good';

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[120px] bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="absolute top-[24px] left-[40px] flex gap-[17px]">
        <button 
          className={cn(
            "w-[139px] h-[60px] rounded-[77.68px]",
            "border-2 border-dashed",
            "flex items-center justify-center gap-2 transition-all",
            isGood ? "bg-blue-100 border-blue-300" : "bg-white/80 border-gray-300"
          )}
          onClick={() => gameStore.setJudgeMode('good')}
        >
          <span className="text-2xl">😊</span>
          <span className="text-base">TA好人</span>
        </button>
        <button 
          className={cn(
            "w-[139px] h-[60px] rounded-[77.68px]",
            "border-2 border-dashed",
            "flex items-center justify-center gap-2 transition-all",
            !isGood ? "bg-red-100 border-red-300" : "bg-white/80 border-gray-300"
          )}
          onClick={() => gameStore.setJudgeMode('bad')}
        >
          <span className="text-2xl">😈</span>
          <span className="text-base">TA坏人</span>
        </button>
      </div>
    </div>
  );
}); 