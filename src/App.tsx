import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { GameLayout } from '@/features/game/components/GameLayout';
import { GameHeader } from '@/features/game/components/GameHeader';
import { JudgeControls } from '@/features/game/components/JudgeControls';
import { GameResultModal } from '@/features/game/components/GameResultModal';
import { useStore } from '@/providers/StoreProvider';
import { levels } from '@/data/levels/index';

export const App = observer(() => {
  const { gameStore } = useStore();

  useEffect(() => {
    if (!gameStore.currentLevel) {
      gameStore.initLevel(levels[0]);
    }
  }, [gameStore]);

  if (!gameStore.currentLevel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <GameHeader />
      <main className="container mx-auto p-4 pt-20">
        <GameLayout />
      </main>
      <JudgeControls />
      <GameResultModal />
    </div>
  );
});
