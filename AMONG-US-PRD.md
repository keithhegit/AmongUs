# Among Us - 项目需求与开发文档

## 1. 项目概述

### 1.1 项目简介
Among Us 是一个社交推理游戏，玩家需要在游戏中找出隐藏的冒充者。游戏采用现代Web技术栈开发，支持多平台运行。

### 1.2 技术栈
- 前端框架：React + TypeScript
- 状态管理：MobX
- 样式方案：Tailwind CSS
- 构建工具：Vite
- 数据库：Supabase
- PWA支持：vite-plugin-pwa

## 2. 功能需求

### 2.1 核心游戏机制
- 角色系统：玩家和冒充者
- 判定系统：正确/错误判断机制
- 线索系统：可收集和使用的线索
- 关卡进度：多级别解锁机制

### 2.2 具体功能模块

#### 2.2.1 主菜单
- 开始游戏按钮
- 关卡选择
- 当前可用关卡显示

#### 2.2.2 游戏面板
- 角色卡片展示
- 状态栏显示
- 判定模式切换
- 线索面板
- 统计信息显示

#### 2.2.3 进度系统
- 自动保存功能
- 游戏统计
- 成就系统

## 3. 数据结构

### 3.1 游戏核心数据
```typescript
interface Character {
  position: string;
  name: string;
  identity: {
    isEvil: boolean;
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
  evil_count: number;
  complexity: number;
  characters: Character[];
}
```

### 3.2 统计数据
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

## 4. 数据库设计

### 4.1 主要表结构
- clues: 线索信息表
- levels: 关卡配置表
- game_sessions: 游戏会话表
- level_statistics: 关卡统计表

### 4.2 安全策略
- 启用行级安全(RLS)
- 用户只能访问自己的游戏数据
- 公共数据（如关卡信息）允许所有认证用户读取

## 5. 开发规范

### 5.1 代码组织
- 组件拆分原则：单一职责
- 状态管理：使用MobX存储
- 工具函数：独立的utils目录

### 5.2 命名规范
- 组件：PascalCase
- 文件名：kebab-case
- 变量/函数：camelCase

### 5.3 文件结构
```
src/
  ├── components/     # React组件
  ├── stores/        # MobX存储
  ├── hooks/         # 自定义Hooks
  ├── utils/         # 工具函数
  ├── types/         # TypeScript类型
  ├── data/          # 静态数据
  └── lib/           # 第三方库配置
```

## 6. 部署说明

### 6.1 环境要求
- Node.js >= 14
- Supabase项目配置
- 环境变量配置

### 6.2 部署步骤
1. 安装依赖：`npm install`
2. 构建项目：`npm run build`
3. 部署到Netlify（自动）

## 7. 迭代计划

### 7.1 当前版本 (v1.0.0)
- [x] 基础游戏机制
- [x] 关卡系统
- [x] 数据持久化
- [x] PWA支持

### 7.2 计划功能
- [ ] 多人模式
- [ ] 自定义关卡
- [ ] 排行榜系统
- [ ] 成就系统

## 8. 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 完成基础游戏功能
- 实现数据持久化
- 添加PWA支持

## 9. 维护说明

### 9.1 日常维护
- 定期更新依赖
- 监控错误报告
- 数据库备份

### 9.2 问题处理
- 提供错误追踪
- 用户反馈渠道
- 性能监控

## 10. 附录

### 10.1 相关资源
- 项目仓库
- 设计资源
- API文档

### 10.2 参考文档
- React文档
- Supabase文档
- MobX文档