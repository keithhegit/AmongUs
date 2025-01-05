import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Among Us</h1>
      <div className="space-y-4">
        <button
          className="block w-48 px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => navigate('/game/1')} // 开始游戏从第一关开始
        >
          开始游戏
        </button>
        <button
          className="block w-48 px-4 py-2 text-white bg-green-500 rounded"
          onClick={() => navigate('/level-select')}
        >
          选择关卡
        </button>
      </div>
    </div>
  );
}; 