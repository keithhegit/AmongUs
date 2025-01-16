import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';
import { levels } from '@/data/levels';
import clsx from 'clsx';
import mainBg from '../../../assets/images/main.png';
import level1 from '../../../assets/images/levelcard/level1.png';
import level2 from '../../../assets/images/levelcard/level2.png';
import level3 from '../../../assets/images/levelcard/level3.png';
import level4 from '../../../assets/images/levelcard/level4.png';
import level5 from '../../../assets/images/levelcard/level5.png';
import level6 from '../../../assets/images/levelcard/level6.png';
import level7 from '../../../assets/images/levelcard/level7.png';
import levelBottom from '../../../assets/images/levelbottom.png';
import backBtn from '../../../assets/images/Triangle-Arrow-Turn-Backward.png';

const levelCards = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
];

export const MainMenu = observer(() => {
  const navigate = useNavigate();
  const { gameStore } = useStore();
  const [showLevels, setShowLevels] = React.useState(false);

  const handleStartGame = () => {
    gameStore.initLevel(levels[0]);
    navigate('/game');
  };

  const handleSelectLevel = () => {
    setShowLevels(true);
  };

  const handleLevelSelect = (levelIndex: number) => {
    gameStore.initLevel(levels[levelIndex]);
    navigate('/game');
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
              className="w-[222px] h-[48px] cursor-pointer"
            />
            
            {/* Select Level Button Area */}
            <button 
              onClick={handleSelectLevel}
              className="w-[222px] h-[48px] cursor-pointer"
            />
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
                  <button
                    onClick={() => handleLevelSelect(3)}
                    className="w-[110px] h-[85px] cursor-pointer"
                  >
                    <img 
                      src={level4} 
                      alt="Level 4"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => handleLevelSelect(4)}
                    className="w-[110px] h-[85px] cursor-pointer"
                  >
                    <img 
                      src={level5} 
                      alt="Level 5"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => handleLevelSelect(5)}
                    className="w-[110px] h-[85px] cursor-pointer"
                  >
                    <img 
                      src={level6} 
                      alt="Level 6"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>

                {/* Third Row */}
                <div>
                  <button
                    onClick={() => handleLevelSelect(6)}
                    className="w-[110px] h-[85px] cursor-pointer"
                  >
                    <img 
                      src={level7} 
                      alt="Level 7"
                      className="w-full h-full object-contain"
                    />
                  </button>
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