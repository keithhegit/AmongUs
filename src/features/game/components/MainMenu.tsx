import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { levels } from '@/data/levels';
import { cn } from '@/lib/utils';

export const MainMenu = observer(() => {
  const navigate = useNavigate();
  const { gameStore } = useStore();
  const [showLevels, setShowLevels] = useState(false);

  const handleStartGame = () => {
    gameStore.initLevel(levels[0]); // 初始化第一关
    navigate('/game'); // 导航到游戏页面
  };

  const handleLevelSelect = (levelIndex: number) => {
    gameStore.initLevel(levels[levelIndex]);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between py-8">
      {/* Banner区域 */}
      <div className="w-full max-w-md aspect-[390/256] bg-gray-300 mb-4">
        {/* 这里放置Banner图片 */}
      </div>

      {/* 关卡列表 */}
      {showLevels && (
        <div className="w-full max-w-md px-4 mb-4">
          <div className="grid grid-cols-3 gap-3">
            {levels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => handleLevelSelect(index)}
                className={cn(
                  "p-4 rounded-lg shadow transition-all",
                  "bg-white hover:bg-gray-50 active:bg-gray-100",
                  "flex flex-col items-center justify-center gap-1"
                )}
              >
                <span className="text-lg font-bold">关卡 {level.id}</span>
                <span className="text-sm text-gray-500">
                  {level.impostorCount} 个坏人
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 按钮区域 */}
      <div className="w-full max-w-md px-4 space-y-4">
        <button
          onClick={handleStartGame}
          className="w-full py-4 bg-blue-500 text-white rounded-lg shadow-lg
                   hover:bg-blue-600 active:bg-blue-700 transition-colors
                   text-xl font-bold"
        >
          开始游戏
        </button>
        <button
          onClick={() => setShowLevels(!showLevels)}
          className="w-full py-4 bg-gray-500 text-white rounded-lg shadow-lg
                   hover:bg-gray-600 active:bg-gray-700 transition-colors
                   text-xl font-bold"
        >
          选择关卡
        </button>
      </div>
    </div>
  );
}); 