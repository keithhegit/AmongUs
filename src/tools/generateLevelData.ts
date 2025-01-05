import fs from 'fs';
import path from 'path';
import { characterGenerator } from '../features/game/utils/generators/characterGenerator';
import { clueGenerator } from '../features/game/utils/generators/clueGenerator';
import type { Character, LevelConfig, ClueChain } from '@/shared/types';

const LEVELS_COUNT = 20;
const OUTPUT_DIR = path.join(__dirname, '../data/levels');

function generateLevelConfig(levelNumber: number): LevelConfig {
  // 根据关卡计算参数
  const gridSize = {
    rows: Math.min(3 + Math.floor(levelNumber / 5), 5),
    cols: Math.min(3 + Math.floor(levelNumber / 5), 5)
  };
  const impostorCount = Math.min(1 + Math.floor(levelNumber / 3), 4);
  
  // 生成角色
  const characters = characterGenerator.generateCharacters(
    gridSize.rows * gridSize.cols,
    impostorCount,
    gridSize
  );

  // 生成线索链
  const clueChains = generateClueChains(characters, impostorCount);

  return {
    id: levelNumber,
    gridSize,
    impostorCount,
    timeLimit: 300 - (levelNumber * 10),
    requiredScore: levelNumber * 100,
    characters,
    clueChains
  };
}

function generateClueChains(characters: Character[], impostorCount: number): ClueChain[] {
  const chains: ClueChain[] = [];
  const impostors = characters.filter(c => c.identity.isImpostor);
  
  impostors.forEach(impostor => {
    const chain = generateClueChainForImpostor(impostor, characters);
    chains.push(chain);
  });

  return chains;
}

function generateClueChainForImpostor(impostor: Character, allCharacters: Character[]): ClueChain {
  const goodCharacters = allCharacters.filter(c => !c.identity.isImpostor);
  const chainLength = Math.floor(Math.random() * 2) + 2; // 2-3 步线索
  
  // 随机选择线索链中的角色
  const chainCharacters = shuffleArray(goodCharacters).slice(0, chainLength);
  
  const steps = chainCharacters.map((character, index) => ({
    fromCharacterId: character.id,
    toCharacterId: index < chainCharacters.length - 1 
      ? chainCharacters[index + 1].id 
      : impostor.id,
    clueText: clueGenerator.generateClue('relation', {
      name: character.name,
      target: index < chainCharacters.length - 1 
        ? chainCharacters[index + 1].name 
        : impostor.name,
      profession: character.visual.profession!,
      position: character.position
    }).clue_text
  }));

  return {
    startCharacterId: chainCharacters[0].id,
    steps
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 生成所有关卡数据
for (let i = 1; i <= LEVELS_COUNT; i++) {
  const levelConfig = generateLevelConfig(i);
  const filePath = path.join(OUTPUT_DIR, `level${i}.json`);
  fs.writeFileSync(filePath, JSON.stringify(levelConfig, null, 2));
  console.log(`Generated level ${i}`);
}

// 生成索引文件
const indexContent = `
// 自动生成的关卡数据索引
${Array.from({ length: LEVELS_COUNT }, (_, i) => i + 1)
  .map(i => `import level${i} from './level${i}.json';`)
  .join('\n')}

export const levels = {
  ${Array.from({ length: LEVELS_COUNT }, (_, i) => i + 1)
    .map(i => `${i}: level${i}`)
    .join(',\n  ')}
};
`;

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'index.ts'),
  indexContent
);

console.log(`Generated ${LEVELS_COUNT} level data files in ${OUTPUT_DIR}`); 