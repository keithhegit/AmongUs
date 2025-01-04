# Among Us PWA - 谁是大卧底

一个基于 React + TypeScript + Vite 构建的 PWA 游戏。

## 游戏介绍

《谁是大卧底》是一个推理类游戏，玩家需要通过收集线索，分析角色行为，找出隐藏在人群中的卧底。

### 核心玩法
- 每个关卡包含多个角色，其中隐藏着若干卧底
- 玩家通过收集和分析线索来推理卧底身份
- 线索系统包含：位置信息、行为特征、人际关系等
- 玩家需要在限定时间内完成推理
- 错误的指认会降低评分

### 难度系统
- Easy: 9个角色，1个卧底，简单线索
- Medium: 12个角色，2个卧底，复杂线索
- Hard: 16个角色，3个卧底，混淆线索

## 项目结构

```
src/
├── features/           # 功能模块
│   ├── game/          # 游戏核心功能
│   │   ├── components/    # 游戏相关组件
│   │   │   ├── CharacterGrid.tsx  # 角色网格
│   │   │   ├── CharacterCard.tsx  # 角色卡片
│   │   │   └── GameLayout.tsx     # 游戏布局
│   │   ├── utils/         # 游戏工具函数
│   │   │   ├── generators/    # 生成器
│   │   │   │   ├── levelGenerator.ts
│   │   │   │   └── clueGenerator.ts
│   │   │   └── gameUtils.ts   # 游戏核心工具
│   ├── user/          # 用户相关功能
│   │   └── components/
│   │       └── UserNameModal.tsx  # 用户名输入弹窗
├── shared/            # 共享资源
│   ├── utils/        # 通用工具
│   │   ├── gridHelper.ts  # 网格助手
│   │   └── clueUtils.ts   # 线索工具
│   └── types/        # 类型定义
│       ├── game.ts   # 游戏相关类型
│       ├── user.ts   # 用户相关类型
│       └── level.ts  # 关卡相关类型
└── store/            # 状态管理
    ├── game/         # 游戏状态
    │   ├── gameStore.ts
    │   └── progressStore.ts
    ├── user/         # 用户状态
    │   └── userStore.ts
    └── index.ts      # 状态统一导出
```

## 最新功能更新

### 1. 用户系统
- 新增用户注册/登录功能
- 添加进度保存系统
- 实现多用户数据隔离

### 2. 关卡系统
- 实现关卡解锁机制
- 添加星级评价系统
- 关卡进度持久化

### 3. 游戏核心优化
- 改进角色生成算法
- 优化线索系统
- 添加动画效果

## 核心功能说明

### 用户系统
```typescript
interface UserProfile {
  id: string;
  name: string;
  createdAt: number;
  lastLoginAt: number;
}

interface UserProgress {
  userId: string;
  levelStatuses: Record<number, LevelStatus>;
  totalCoins: number;
  achievements: string[];
}
```

### 关卡系统
```typescript
interface LevelStatus {
  id: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: number;        // 星级评价 0-3
  bestScore: number;    // 最高分
  bestTime: number;     // 最佳时间
}
```

### 状态管理
- 使用 Zustand 进行状态管理
- 实现数据持久化
- 支持多状态协同

### 线索系统
```typescript
enum ClueType {
  LOCATION = 'location',     // 位置线索
  BEHAVIOR = 'behavior',     // 行为线索
  RELATION = 'relation',     // 关系线索
  PROFESSION = 'profession', // 职业线索
  TESTIMONY = 'testimony',   // 证词线索
  REACTION = 'reaction',     // 反应线索
  SYSTEM = 'system'         // 系统线索
}

interface Clue {
  id: string;
  clue_id: string;
  main_type: ClueType;
  sub_type: string;
  clue_text: string;
  reliability: number;      // 可信度
  complexity: number;       // 复杂度
  is_template: boolean;
  variables: string[];
}
```

### 角色系统
```typescript
interface Character {
  id: string;
  position: string;
  name: string;
  gender: 'male' | 'female';
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
    emoji: string;
    profession?: string;
    background: string;
  };
}
```

### 评分系统
```typescript
interface ScoreSystem {
  baseScore: number;        // 基础分数
  timeBonus: number;        // 时间奖励
  accuracyBonus: number;    // 准确率奖励
  mistakePenalty: number;   // 错误惩罚
  
  calculateFinalScore(): number;
  calculateStars(): number; // 0-3星评价
}
```

## 开发指南

### 环境要求
- Node.js >= 16
- npm >= 8

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```

### 构建
```bash
npm run build
```

## 游戏逻辑

### 角色系统
- 角色生成与属性分配
- 身份系统（好人/坏人）
- 线索系统

### 游戏流程
1. 选择关卡
2. 查看角色信息
3. 收集线索
4. 进行投票
5. 结算得分

### 分数系统
- 基础分数计算
- 时间奖励
- 错误惩罚

## 技术栈

- React 18
- TypeScript 5
- Vite 5
- TailwindCSS
- Framer Motion
- Zustand

### 状态管理架构
```
Store/
├── gameStore      # 游戏核心状态
│   ├── 角色状态
│   ├── 线索状态
│   └── 游戏进度
├── userStore      # 用户状态
│   ├── 用户信息
│   ├── 游戏存档
│   └── 成就记录
└── progressStore  # 进度状态
     ├── 关卡解锁
     ├── 星级评价
     └── 最佳记录
```

### 数据持久化
- 使用 localStorage 存储用户数据
- 使用 zustand/persist 中间件
- 支持多用户数据隔离

### 动画系统
- 使用 Framer Motion
- 支持关卡切换动画
- 支持角色翻转动画
- 支持线索显示动画

## 项目规范

### 代码风格
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化

### 命名规范
- 组件：PascalCase
- 函数：camelCase
- 类型：PascalCase
- 文件：组件用 PascalCase，其他用 camelCase

### 提交规范
- feat: 新功能
- fix: 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

## 后续计划

1. 功能增强
- [ ] 添加更多关卡类型
- [ ] 实现成就系统
- [ ] 添加社交功能

2. 性能优化
- [ ] 实现组件懒加载
- [ ] 优化状态管理
- [ ] 改进动画性能

3. 用户体验
- [ ] 添加新手引导
- [ ] 优化移动端适配
- [ ] 增加音效系统 

## 开发路线图

### 第一阶段 - 基础功能
- [x] 角色生成系统
- [x] 基础线索系统
- [x] 关卡进度系统
- [x] 用户数据持久化

### 第二阶段 - 功能完善
- [x] 高级线索系统
- [x] 评分系统
- [x] 动画效果
- [ ] 成就系统

### 第三阶段 - 体验优化
- [ ] 新手引导
- [ ] 音效系统
- [ ] 社交功能
- [ ] PWA 支持 