import { observer } from 'mobx-react-lite';
import { CharacterCard } from './CharacterCard';
import { useStore } from '@/providers/StoreProvider';

export const GameLayout = observer(() => {
  const { gameStore } = useStore();
  const { characters, handleCharacterClick } = gameStore;

  if (!characters || characters.length === 0) {
    console.log('No characters loaded');
    return null;
  }

  // 重新排序角色
  const sortedCharacters = [...characters].sort((a, b) => {
    // 先按行号排序
    const rowA = parseInt(a.position[1]);
    const rowB = parseInt(b.position[1]);
    if (rowA !== rowB) return rowA - rowB;
    
    // 再按列名排序
    return a.position[0].localeCompare(b.position[0]);
  });

  return (
    <div className="p-4">
      {/* 游戏状态 */}
      <div className="mb-6 text-center">
        <div className="text-lg font-medium text-gray-700">
          当前回合: {gameStore.currentRound + 1}
        </div>
      </div>

      {/* 角色网格 */}
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {sortedCharacters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={character.state !== 'initial'}
            onClick={() => handleCharacterClick(character.position)}
          />
        ))}
      </div>
    </div>
  );
});