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
    <header className="absolute top-0 left-0 w-full h-[123px] bg-[#499DFF] shadow-[0_4px_0_#2364B6] z-50">
      {/* 齿轮按钮 */}
      <div className="absolute w-[34px] h-[34px] left-[12px] top-[12px]">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="relative w-[31.57px] h-[31.57px]"
        >
          {/* 齿轮按钮内圆 */}
          <div className="absolute inset-0 bg-[#FFFCF6] border-[3.1875px] border-[#FFFCF6] shadow-[0_2.38658px_0_#676453] rounded-full" />
          {/* 齿轮按钮外圈 */}
          <div className="absolute inset-0 border border-[#3A2A03] rounded-full" />
          {/* 齿轮图标 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#6B5F61">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.65.07-.97 0-.32-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65c-.04-.24-.25-.42-.5-.42h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 12c-.04.32-.07.65-.07.97 0 .32.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.63z"/>
            </svg>
          </div>
        </button>

        {showSettings && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-1 min-w-[120px] z-50">
            <button onClick={handleBackToHome} className="w-full px-4 py-2 text-left hover:bg-gray-100">
              返回首页
            </button>
            <button onClick={handleRestartLevel} className="w-full px-4 py-2 text-left hover:bg-gray-100">
              重启关卡
            </button>
          </div>
        )}
      </div>

      {/* 关卡信息 */}
      <div className="absolute top-[38px] left-[152px] w-[72px] h-[27px]">
        {/* 文字层 */}
        <div className="relative w-full h-full flex items-center justify-center">
          <span 
            className="text-[24px] font-black text-white"
            style={{ 
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            关卡{currentLevel.id}
          </span>
        </div>
      </div>

      {/* 伪人计数器 */}
      <div className="absolute bottom-[8px] left-[12px] h-[32px]">
        <div className="flex items-center h-full bg-white rounded-[16px] px-4 border-2 border-black">
          <span className="text-2xl mr-2">😈</span>
          <span className="font-black text-xl">{currentLevel.impostorCount}</span>
        </div>
      </div>

      {/* 失败计数器 */}
      <div className="absolute bottom-[8px] right-[12px] h-[32px]">
        <div className="flex items-center h-full gap-1">
          {Array(maxMistakes).fill(0).map((_, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-center justify-center w-[32px] h-[32px]",
                "text-3xl font-black transition-colors",
                index < mistakeCount ? "text-red-500" : "text-gray-300"
              )}
              style={{ 
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              ✕
            </div>
          ))}
        </div>
      </div>

      {/* 进度条 */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[140px]">
        <div className="relative w-[140px] h-[32px] rounded-[16px] border-2 border-black overflow-hidden">
          {/* 背景 */}
          <div className="absolute inset-0 bg-[#A6A6A6]" />
          
          {/* 进度填充 */}
          <div 
            className="absolute inset-y-0 left-0 bg-[#F7AB17] transition-all duration-300"
            style={{ 
              width: `${(progress.current / progress.total) * 100}%`,
              maxWidth: '100%'
            }}
          >
            {/* 顶部高亮条 */}
            <div className="absolute top-[4px] left-[4px] right-[4px] h-[10px] bg-[#FEDD30] rounded-[8px]" />
          </div>

          {/* 进度文字 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-white text-xl font-black"
              style={{ 
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {progress.current} / {progress.total}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}); 