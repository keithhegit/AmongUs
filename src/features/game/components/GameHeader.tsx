import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { cn } from '@/lib/utils';

export const GameHeader = observer(() => {
  const { gameStore } = useStore();
  const { 
    currentLevel, 
    revealedPositions, 
    characters, 
    mistakeCount, 
    maxMistakes 
  } = gameStore;

  // 生成失败指示器
  const mistakeIndicators = Array(maxMistakes).fill(0).map((_, index) => (
    <div 
      key={index}
      className={cn(
        "text-2xl font-bold transition-colors",
        index < mistakeCount ? "text-red-500" : "text-gray-300"
      )}
    >
      ✕
    </div>
  ));

  const progress = {
    current: revealedPositions.size,
    total: characters.length
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        {/* 顶部栏 */}
        <div className="flex justify-between items-center mb-2">
          {/* 左侧设置按钮 */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            ⚙️
          </button>

          {/* 中间区域 */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              关卡 {currentLevel?.id || 1}
            </h1>
            {/* 坏人总数计数器 */}
            <div className="flex items-center gap-1 bg-gray-900 rounded-full px-3 py-1 text-white">
              <span className="text-sm">总</span>
              <span className="text-xl">👿</span>
              <span>{currentLevel?.impostorCount || 0}</span>
            </div>
            <div className="flex gap-2">
              {mistakeIndicators}
            </div>
          </div>

          {/* 右侧空白区域，保持布局平衡 */}
          <div className="w-8"></div>
        </div>

        {/* 进度条 */}
        <div className="relative w-full">
          <div className="absolute -top-4 right-0 text-sm text-gray-600">
            {progress.current} / {progress.total}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(progress.current / progress.total) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}); 