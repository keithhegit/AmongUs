import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GameHeader = observer(() => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const { gameStore } = useStore();
  const { 
    currentLevel, 
    revealedPositions, 
    characters, 
    mistakeCount, 
    maxMistakes 
  } = gameStore;

  if (!currentLevel) {
    return null;
  }

  // 生成失败指示器
  const mistakeIndicators = Array(maxMistakes).fill(0).map((_, index) => (
    <div 
      key={index}
      className={cn(
        "text-xl font-bold transition-colors",
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

  const handleBackToHome = () => {
    navigate('/');
    setShowSettings(false);
  };

  const handleRestartLevel = () => {
    gameStore.initLevel(currentLevel);
    setShowSettings(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-3 py-2">
        {/* 顶部栏 */}
        <div className="flex justify-between items-center mb-1">
          {/* 左侧设置按钮和下拉菜单 */}
          <div className="relative">
            <button 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙️
            </button>
            
            {/* 设置下拉菜单 */}
            {showSettings && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-1 min-w-[120px]">
                <button
                  onClick={handleBackToHome}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                >
                  返回首页
                </button>
                <button
                  onClick={handleRestartLevel}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                >
                  重启关卡
                </button>
              </div>
            )}
          </div>

          {/* 中间区域 */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">
              关卡 {currentLevel.id}
            </h1>
            {/* 坏人总数计数器 */}
            <div className="flex items-center gap-1 bg-gray-900 rounded-full px-2 py-0.5 text-white">
              <span className="text-xs">总</span>
              <span className="text-base">👿</span>
              <span>{currentLevel.impostorCount}</span>
            </div>
            <div className="flex gap-1">
              {mistakeIndicators}
            </div>
          </div>

          {/* 右侧空白区域，保持布局平衡 */}
          <div className="w-6"></div>
        </div>

        {/* 进度条 */}
        <div className="relative w-full">
          <div className="absolute -top-3 right-0 text-xs text-gray-600">
            {progress.current} / {progress.total}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
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