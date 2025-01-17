# Among Us PWA

## 部署步骤
### 下载依赖：git clone之后首先在项目根目录运行 yarn install
### 调试代码：项目根目录运行 npm run dev
### 构建代码：项目根目录运行 npm run build

## 更新日志

### 2024-01-xx 更新
- 优化主菜单界面布局
  - 调整"开始游戏"和"选择关卡"按钮位置
  - 移除底部黑色指示条
- 重构关卡选择界面
  - 添加蓝色背景和圆角设计
  - 优化关卡卡片布局和间距
  - 修正关卡卡片显示顺序
  - 添加右上角返回按钮
  - 支持点击空白区域返回主菜单
- 新增空位卡片系统
  - 使用特定图片资源 (200-blank-no.png)
  - 默认处于已完成状态
  - 不计入进度统计
  - 不可点击交互
- 优化关卡完成提示
  - 最后一关显示特殊提示文本
  - 移除最后一关的"下一关"按钮

## 游戏规则

### 基础规则
- 每局游戏包含多个角色，其中有少数内鬼和多数船员
- 玩家需要通过收集线索，正确找出所有内鬼
- 每局游戏有3次判断错误的机会
- 需要找出所有内鬼且翻开所有卡片才能获胜

### 关卡系统
1. **关卡数量**
   - 目前共有7个关卡（0-6）
   - 每关难度递增
   - 最后一关完成后显示特殊结束文本

2. **关卡解锁**
   - 完成当前关卡后自动解锁下一关
   - 支持重新挑战已解锁关卡

3. **关卡进度**
   - 进度计算：已翻开卡片数/总卡片数
   - 空位卡片不计入进度统计
   - 自动保存已解锁的关卡进度

### 卡片系统

#### 1. 卡片类型
1. **普通角色卡片**
   - 可点击交互
   - 有对应的线索文本
   - 计入进度统计
   - 需要进行好人/坏人判定

2. **空位卡片**
   - 使用特定图片 (200-blank-no.png)
   - 默认完成状态
   - 不可点击
   - 不计入进度
   - 不需要判定

#### 2. 卡片状态
```typescript
type CharacterState = 'initial' | 'revealed' | 'completed';

interface Character {
  id: string;
  position: string;
  name: string;
  state: CharacterState;
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
    isBlank?: boolean;    // 新增：标识空位卡片
  };
  clue: {
    text: string;
    type: ClueType;
    targetPosition?: string;
    highlightNames: string[];
    isUsed: boolean;
  };
}

type ClueType = 'direct' | 'area' | 'behavior' | 'relation' | 'none';  // 新增：none 类型用于空位
```

#### 3. 卡片显示样式

##### 3.1 未翻开状态
- 大图显示：占满整个卡片空间
- 底部名字栏：半透明黑色背景
```tsx
<div className="absolute inset-0 flex items-center justify-center p-2">
  <img className="w-full h-full object-contain" />
</div>
<div className="absolute bottom-0 w-full bg-black/70 py-1">
  <div className="text-white text-center text-[min(3vw,14px)]">{name}</div>
</div>
```

##### 3.2 已翻开状态
- 图片区域：30% 高度，浅色背景
- 文本区域：70% 高度，深色背景
```tsx
<div className="h-full flex flex-col p-2">
  <div className="w-full h-[30%] flex items-center justify-center bg-white/50 rounded-t">
    <div className="w-[85%] h-[85%]">
      <img className="w-full h-full object-contain" />
    </div>
  </div>
  <div className="w-full h-[70%] rounded-b overflow-hidden bg-black/90">
    <div className="text-center text-[min(3vw,14px)] text-white py-1 font-medium">
      {name}
    </div>
    <div className="w-full h-[1px] bg-white/30" />
    <div className="px-2 py-1.5">
      <div className="text-white text-[min(3vw,14px)] leading-tight text-center">
        {clue.text}
      </div>
    </div>
  </div>
</div>
```

##### 3.3 空位卡片样式
- 使用特定图片 (200-blank-no.png)
- 灰色背景
- 不显示名字和线索
- 默认完成状态

### 图片资源规则

#### 1. 角色图片
1. **普通市民** (`/src/assets/images/citizens/`)
   - 命名格式: `[id]-[gender]-citizen-[feature]-[clothing].png`
   - ID范围: 001-100
   - 示例: `001-boy-citizen-beard-orangets.png`

2. **职业角色** (`/src/assets/images/professions/`)
   - 命名格式: `[id]-[profession]-[gender]-[feature].png`
   - ID范围: 101-199
   - 示例: `120-police-boy-hat.png`

3. **特殊图片**
   - 空位图片: `200-blank-no.png`
   - 位置: `/src/assets/images/professions/`

### 项目结构
```
src/
├── assets/
│   └── images/
│       ├── citizens/      # 普通市民图片
│       └── professions/   # 职业角色和特殊图片
├── components/
│   ├── CharacterCard/    # 角色卡片组件
│   └── GameResultModal/  # 游戏结果弹窗
├── data/
│   └── levels/          # 关卡配置
├── features/
│   └── game/           # 游戏相关功能
├── shared/
│   └── types/         # 类型定义
└── stores/           # 状态管理
```

### 关卡完成逻辑
```typescript
get isVictory() {
  // 获取非空位卡片
  const nonBlankCharacters = this.characters.filter(char => !char.identity.isBlank);
  const revealedNonBlankPositions = Array.from(this.revealedPositions).filter(pos => {
    const char = this.characters.find(c => c.position === pos);
    return char && !char.identity.isBlank;
  });

  return (
    // 所有非空位卡片都被翻开
    revealedNonBlankPositions.length === nonBlankCharacters.length &&
    // 且找出了所有坏人
    this.remainingImpostors === 0 &&
    // 且失败次数未达上限
    this.mistakeCount < this.maxMistakes
  );
}
```

### 进度计算逻辑
```typescript
get progress() {
  const nonBlankCharacters = this.characters.filter(char => !char.identity.isBlank);
  const revealedNonBlankPositions = Array.from(this.revealedPositions).filter(pos => {
    const char = this.characters.find(c => c.position === pos);
    return char && !char.identity.isBlank;
  });
  
  return {
    revealed: revealedNonBlankPositions.length,  // 已翻开的非空位卡片数
    total: nonBlankCharacters.length             // 总非空位卡片数
  };
}
```
