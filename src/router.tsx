import { createBrowserRouter } from 'react-router-dom';
import { MainMenu } from '@/features/game/components/MainMenu';
import { GameLayout } from '@/features/game/components/GameLayout';
import { GameHeader } from '@/features/game/components/GameHeader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />
  },
  {
    path: '/game',
    element: (
      <>
        <GameHeader />
        <GameLayout />
      </>
    )
  }
]);

export default router; 