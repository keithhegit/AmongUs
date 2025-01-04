import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import { CharacterGrid } from "./CharacterGrid";
import { StatusBar } from "./StatusBar";
import { CluePanel } from "./CluePanel";
import { useGame } from "../hooks/useGame";
import { GameControls } from './GameControls';

export const GameBoard = observer(() => {
  const { gameStore, loading, error, handleJudgment } = useGame();
  const [voteType, setVoteType] = useState<'good' | 'bad'>('good');
  const currentLevel = 2; // 从游戏状态获取

  const handleVoteTypeChange = (isGood: boolean) => {
    setVoteType(isGood ? 'good' : 'bad');
  };

  const handleHintClick = () => {
    // 处理提示逻辑
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative min-h-screen">
      <StatusBar status={gameStore.status} />
      <div className="container mx-auto p-4">
        <CharacterGrid 
          characters={gameStore.currentLevel?.characters || []}
          onCharacterSelect={handleJudgment}
        />
        {gameStore.selectedCharacter && (
          <CluePanel character={gameStore.selectedCharacter} />
        )}
      </div>

      {/* 底部控制栏 */}
      <GameControls
        currentLevel={currentLevel}
        onVoteTypeChange={handleVoteTypeChange}
        onHintClick={handleHintClick}
      />
    </div>
  );
});