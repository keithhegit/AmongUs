import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUIStore } from '@/store';
import { gameStore } from '@/stores';
import { levels } from '@/data/levels';
import type { LevelConfig } from '@/shared/types/game';
import clsx from 'clsx';
import mainBg from '../../../assets/images/main.png';
import level1 from '../../../assets/images/levelcard/level1.png';
import level2 from '../../../assets/images/levelcard/level2.png';
import level3 from '../../../assets/images/levelcard/level3.png';
import level4 from '../../../assets/images/levelcard/level4.png';
import level5 from '../../../assets/images/levelcard/level5.png';
import level6 from '../../../assets/images/levelcard/level6.png';
import level7 from '../../../assets/images/levelcard/level7.png';
import level8 from '../../../assets/images/levelcard/level8.png';
import level9 from '../../../assets/images/levelcard/level9.png';
import level10 from '../../../assets/images/levelcard/level10.png';
import levelBottom from '../../../assets/images/levelbottom.png';
import backBtn from '@/assets/images/Triangle-Arrow-Turn-Backward.png';
import { audioService } from '@/shared/services/AudioService';
import startGameBtn from '@/assets/images/ui/start-game-btn.png';
import selectLevelBtn from '@/assets/images/ui/select-level-btn.png';

const levelCards = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10
];

export const MainMenu = observer(() => {
  const navigate = useNavigate();
  const uiStore = useUIStore();
  const [showLevels, setShowLevels] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    // 播放主菜单BGM
    audioService.playMenuBGM();
    
    // 组件卸载时停止BGM
    return () => {
      audioService.stopMenuBGM();
    };
  }, []);

  const handleStartGame = () => {
    // 使用第一关配置初始化游戏
    const levelConfig = levels[0];
    if (!levelConfig) {
      console.error('关卡配置不存在');
      return;
    }

    try {
      gameStore.initLevel(levelConfig);
      console.log('游戏初始化成功，正在跳转...');
      navigate('/game');
    } catch (error) {
      console.error('游戏初始化失败:', error);
    }
  };

  const handleSelectLevel = () => {
    setShowLevels(true);
  };

  const handleLevelSelect = (levelIndex: number) => {
    const levelConfig = levels[levelIndex];
    if (!levelConfig) {
      console.error('关卡配置不存在');
      return;
    }

    try {
      gameStore.initLevel(levelConfig);
      console.log('游戏初始化成功，正在跳转...');
      navigate('/game');
    } catch (error) {
      console.error('游戏初始化失败:', error);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowLevels(false);
    }
  };

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Safe Area Container */}
      <div className="relative w-full h-full max-w-[430px] mx-auto">
        {/* Main Menu Buttons */}
        {!showLevels && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[140px] flex flex-col gap-[20px]">
            {/* Start Game Button Area */}
            <button 
              onClick={handleStartGame}
              className="relative w-[266px] h-[58px] cursor-pointer flex items-center justify-center"
            >
              <img 
                src={startGameBtn} 
                alt="开始游戏"
                className="w-full h-full object-contain"
              />
            </button>
            
            {/* Select Level Button Area */}
            <button 
              onClick={handleSelectLevel}
              className="relative w-[266px] h-[58px] cursor-pointer flex items-center justify-center"
            >
              <img 
                src={selectLevelBtn} 
                alt="选择关卡"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        )}

        {/* Levels Grid (Conditional) */}
        {showLevels && (
          <div 
            className="absolute inset-0"
            onClick={handleBackgroundClick}
          >
            {/* Level Selection Background */}
            <div 
              className="absolute inset-x-0 top-0 bottom-0"
              style={{
                backgroundImage: `url(${levelBottom})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Back Button */}
              <button
                onClick={() => setShowLevels(false)}
                className="absolute top-[40px] right-[20px] w-[60px] h-[40px] cursor-pointer"
              >
                <img 
                  src={backBtn} 
                  alt="Back"
                  className="w-full h-full object-contain"
                />
              </button>

              {/* Level Buttons Container */}
              <div className="pt-[180px] px-[20px]">
                {/* First Row */}
                <div className="flex gap-[10px] mb-[15px]">
                  {levelCards.slice(0, 3).map((cardImage, index) => (
                    <button
                      key={index}
                      onClick={() => handleLevelSelect(index)}
                      className="w-[110px] h-[85px] cursor-pointer"
                    >
                      <img 
                        src={cardImage} 
                        alt={`Level ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
                
                {/* Second Row */}
                <div className="flex gap-[10px] mb-[15px]">
                  {levelCards.slice(3, 6).map((cardImage, index) => (
                    <button
                      key={index + 3}
                      onClick={() => handleLevelSelect(index + 3)}
                      className="w-[110px] h-[85px] cursor-pointer"
                    >
                      <img 
                        src={cardImage} 
                        alt={`Level ${index + 4}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                {/* Third Row */}
                <div className="flex gap-[10px] mb-[15px]">
                  {levelCards.slice(6, 9).map((cardImage, index) => (
                    <button
                      key={index + 6}
                      onClick={() => handleLevelSelect(index + 6)}
                      className="w-[110px] h-[85px] cursor-pointer"
                    >
                      <img 
                        src={cardImage} 
                        alt={`Level ${index + 7}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                {/* Fourth Row */}
                <div className="flex gap-[10px]">
                  {levelCards.slice(9).map((cardImage, index) => (
                    <button
                      key={index + 9}
                      onClick={() => handleLevelSelect(index + 9)}
                      className="w-[110px] h-[85px] cursor-pointer"
                    >
                      <img 
                        src={cardImage} 
                        alt={`Level ${index + 10}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MainMenu; 