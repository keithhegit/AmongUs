import { useNavigate } from 'react-router-dom';
import { useLevelStore } from '@/store/level/levelStore';
import { useGameStore } from '@/store/game/gameStore';

export const LevelSelect = () => {
  const navigate = useNavigate();
  const initLevel = useGameStore(state => state.initLevel);
  const { levelStatuses, highestUnlockedLevel } = useLevelStore();

  const handleLevelSelect = (levelNumber: number) => {
    if (levelNumber <= highestUnlockedLevel) {
      initLevel(levelNumber);
      navigate('/game');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(levelNumber => (
        <button
          key={levelNumber}
          onClick={() => handleLevelSelect(levelNumber)}
          disabled={levelNumber > highestUnlockedLevel}
          className={`p-4 rounded ${
            levelNumber <= highestUnlockedLevel
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div>关卡 {levelNumber}</div>
          {levelStatuses[levelNumber]?.isCompleted && (
            <div className="text-yellow-300">
              {'★'.repeat(levelStatuses[levelNumber].stars)}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}; 