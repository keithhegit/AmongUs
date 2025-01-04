import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Settings, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameControls } from './GameControls';
import { StatusBar } from './StatusBar';
import { CharacterGrid } from './CharacterGrid';
import { GameComplete } from './GameComplete';
import { useGameStore, useProgressStore } from '@/store';
import { CluePanel } from './CluePanel';
import { LevelSelect } from './LevelSelect';
import { Character } from '@/shared/types';

interface GameLayoutProps {
  currentLevel: number;
  totalLevels: number;
  coins: number;
  impostorsLeft: number;
  progress: {
    current: number;
    total: number;
  };
  onSettingsClick: () => void;
}

export const GameLayout = ({
  currentLevel,
  totalLevels,
  coins,
  impostorsLeft,
  progress,
  onSettingsClick
}: GameLayoutProps) => {
  const [voteType, setVoteType] = useState<'good' | 'bad'>('good');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const { initLevel, submitVote } = useGameStore();
  const { addCoins: addProgressCoins } = useProgressStore();

  // 初始化关卡
  useEffect(() => {
    initLevel(currentLevel);
  }, [currentLevel]);

  const handleCharacterClick = (character: Character) => {
    submitVote(character.id);
    
    // 如果猜对了，奖励金币
    if (
      (voteType === 'good' && !character.identity.isImpostor) ||
      (voteType === 'bad' && character.identity.isImpostor)
    ) {
      addProgressCoins(10);
      setEarnedCoins(prev => prev + 10);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800">
      {/* 顶部状态栏 */}
      <StatusBar
        className="sticky top-0 z-50"
        left={
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="设置"
          >
            <Settings className="w-6 h-6" />
          </button>
        }
        center={
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold">关卡 {currentLevel}</h1>
            <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        }
        right={
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{coins}</span>
          </div>
        }
      />

      {/* 游戏状态指示器 */}
      <div className="fixed top-16 left-4 right-4 flex justify-between z-40">
        <div className="flex items-center gap-2 bg-red-500/10 dark:bg-red-500/20 px-3 py-1 rounded-full">
          <span className="text-xl">😈</span>
          <span className="font-bold">{impostorsLeft}</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 dark:bg-yellow-500/20 px-3 py-1 rounded-full">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">{coins}</span>
        </div>
      </div>

      {/* 主游戏区域 */}
      <main className="container mx-auto px-4 pt-24 pb-24">
        <CharacterGrid
          level={currentLevel}
          voteType={voteType}
          onCharacterClick={handleCharacterClick}
        />
      </main>

      {/* 底部控制栏 */}
      <GameControls
        currentLevel={currentLevel}
        totalLevels={totalLevels}
        onVoteTypeChange={(isGood) => setVoteType(isGood ? 'good' : 'bad')}
        onHintClick={() => {
          // TODO: 处理提示点击
          console.log('Hint requested');
        }}
      />

      {/* 结算界面 */}
      <AnimatePresence>
        {isGameComplete && (
          <GameComplete
            levelNumber={currentLevel}
            coinsEarned={earnedCoins}
            characters={[]} // TODO: 添加角色数据
            onNext={() => {
              // TODO: 实现下一关逻辑
            }}
            onReplay={() => {
              // TODO: 实现重玩逻辑
            }}
            onBack={() => {
              // TODO: 实现返回菜单逻辑
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};