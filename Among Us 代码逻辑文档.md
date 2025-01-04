# Among Us 代码逻辑文档

## 1. 项目结构

### 1.1 核心目录
```
src/
  ├── components/     # React组件
  ├── stores/        # MobX状态管理
  ├── hooks/         # 自定义Hooks
  ├── utils/         # 工具函数
  ├── types/         # TypeScript类型定义
  ├── data/          # 游戏数据
  └── lib/           # 第三方库配置
```

## 2. 核心功能模块

### 2.1 游戏状态管理 (stores/gameStore.ts)
- 使用 MobX 管理游戏状态
- 主要功能：
  - 关卡加载
  - 角色选择
  - 判定模式切换
  - 线索使用追踪
  - 游戏进度保存

### 2.2 数据持久化 (services/gameService.ts)
- Supabase 数据库交互
- 功能：
  - 关卡数据获取
  - 游戏进度保存
  - 统计数据记录

### 2.3 游戏界面组件

#### 2.3.1 主菜单 (components/MainMenu.tsx)
- 游戏启动入口
- 关卡选择功能
- 游戏横幅展示

#### 2.3.2 游戏面板 (components/GameBoard.tsx)
- 角色网格展示
- 判定操作处理
- 线索系统集成
- 游戏状态反馈

#### 2.3.3 角色相关组件
- CharacterCard: 角色卡片展示
- CharacterGrid: 角色网格布局
- CharacterDetail: 角色详细信息

#### 2.3.4 游戏机制组件
- CluePanel: 线索面板
- JudgmentFeedback: 判定反馈
- GameStatus: 游戏状态
- StatusBar: 状态栏

### 2.4 自定义 Hooks

#### 2.4.1 useGame
- 游戏核心逻辑
- 关卡加载
- 状态重置

#### 2.4.2 useGameProgress
- 进度保存
- 自动保存
- 解锁状态管理

#### 2.4.3 useClueSystem
- 线索展示
- 线索使用记录

#### 2.4.4 useJudgment
- 判定逻辑
- 反馈展示

#### 2.4.5 useStatistics
- 统计数据收集
- 数据分析展示

## 3. 数据结构

### 3.1 游戏核心类型 (types/game.ts)
```typescript
interface Character {
  position: string;
  name: string;
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: {
    text: string;
    isUsed: boolean;
    isEffective: boolean;
  };
  visual: {
    avatar: string;
    background: string;
    profession?: string;
  };
}

interface Level {
  id: string;
  level_number: number;
  grid_layout: GridLayout;
  impostor_count: number;
  complexity: number;
  characters: Character[];
}
```

### 3.2 统计数据类型 (types/statistics.ts)
```typescript
interface GameStatistics {
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
  totalMistakes: number;
  cluesUsed: number;
  averageTimePerLevel: number;
  fastestLevel: number;
  charactersRevealed: number;
}
```

## 4. 工具函数

### 4.1 网格辅助 (utils/gridHelper.ts)
- 网格生成
- 位置验证
- 相邻位置计算

### 4.2 统计工具 (utils/statisticsUtils.ts)
- 统计数据计算
- 时间格式化

### 4.3 线索工具 (utils/clueUtils.ts)
- 线索类型图标映射
- 线索有效性验证

## 5. 数据库结构

### 5.1 主要表
- clues: 线索信息
- levels: 关卡配置
- game_sessions: 游戏会话
- level_statistics: 关卡统计

### 5.2 安全策略
- 行级安全(RLS)启用
- 用户数据隔离
- 认证用户访问控制

## 6. PWA 支持

### 6.1 配置 (vite.config.ts)
- 自动更新
- 离线支持
- 应用图标配置

## 7. 样式管理

### 7.1 Tailwind CSS
- 响应式设计
- 深色模式支持
- 自定义主题配置