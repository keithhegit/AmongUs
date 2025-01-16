import { MainMenu } from '@/features/game/components/MainMenu';
import { GameLayout } from '@/features/game/components/GameLayout';
import { GameHeader } from '@/features/game/components/GameHeader';
import { JudgeControls } from '@/features/game/components/JudgeControls';
import { GameResultModal } from '@/features/game/components/GameResultModal';

export const routes = [
  {
    path: '/',
    element: <MainMenu />
  },
  {
    path: '/game',
    element: (
      <div className="min-h-screen bg-gray-100">
        <GameHeader />
        <main className="container mx-auto p-4 pt-20">
          <GameLayout />
        </main>
        <JudgeControls />
        <GameResultModal />
      </div>
    )
  }
]; 