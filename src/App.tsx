import { useEffect, useState } from 'react';
import { useUserStore, useGameStore } from '@/store';
import { UserNameModal } from '@/features/user/components/UserNameModal';
import { GameLayout } from '@/features/game/components/GameLayout';

export const App = () => {
  const { currentUser, register, login } = useUserStore();
  const { isComplete, levelNumber } = useGameStore();
  const [showNameModal, setShowNameModal] = useState(false);
  const [modalMode, setModalMode] = useState<'register' | 'login'>('register');

  // 检查是否需要显示名字输入
  useEffect(() => {
    if (isComplete && levelNumber === 1 && !currentUser) {
      setModalMode('register');
      setShowNameModal(true);
    }
  }, [isComplete, levelNumber, currentUser]);

  const handleNameSubmit = async (name: string) => {
    try {
      if (modalMode === 'register') {
        await register(name);
      } else {
        const success = await login(name);
        if (!success) {
          // 如果登录失败，切换到注册模式
          setModalMode('register');
          return;
        }
      }
      setShowNameModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 游戏主界面 */}
      <main className="container mx-auto px-4 py-8">
        <GameLayout />
      </main>

      {/* 用户名输入弹窗 */}
      <UserNameModal
        isOpen={showNameModal}
        mode={modalMode}
        onSubmit={handleNameSubmit}
      />
    </div>
  );
};
