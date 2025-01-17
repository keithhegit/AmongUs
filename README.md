# Among Us PWA

## 更新日志

### UI优化 (2024-01-xx)
- 优化主菜单界面布局
  - 调整"开始游戏"和"选择关卡"按钮位置
  - 移除底部黑色指示条
- 重构关卡选择界面
  - 添加蓝色背景和圆角设计
  - 优化关卡卡片布局和间距
  - 修正关卡卡片显示顺序
  - 添加右上角返回按钮
  - 支持点击空白区域返回主菜单

## 游戏规则

### 基础规则
- 每局游戏包含多个角色，其中有少数内鬼和多数船员
- 玩家需要通过收集线索，正确找出所有内鬼
- 每局游戏有3次判断错误的机会
- 需要找出所有内鬼且翻开所有卡片才能获胜

### 关卡系统
1. **关卡解锁条件**
   - 目前所有关卡完成上一关后自动解锁
   - 【未上线功能】后续版本将加入金币解锁机制：
     - 第11关起：需要满足金币要求
     - 第11关：需要100金币
     - 第12关：需要200金币
     - 第13关：需要300金币
     - 以此类推...

2. **关卡奖励**
   - 【未上线功能】后续版本将加入金币奖励：
     - 每次正确判断：+10金币
     - 完美通关(无失误)：额外+20金币
     - 观看广告：双倍金币奖励

3. **关卡进度**
   - 进度保存：自动保存已解锁的关卡
   - 【未上线功能】后续版本将加入：
     - 金币累计系统
     - 进度显示：顶部显示当前关卡进度(X/Y)和累计金币数
   - 重玩机制：已解锁的关卡可以随时重玩

### 网格布局
- 游戏使用 3x3 的网格布局
- 网格按照以下方式排序:
  ```
  A1 B1 C1  (第1行)
  A2 B2 C2  (第2行)
  A3 B3 C3  (第3行)
  ```
- 位置编码规则：
  - 列名使用英文字母（A、B、C）
  - 行号使用数字（1、2、3）
  - 例如：A1 表示第一行第一列，B2 表示第二行第二列

### 角色排序逻辑
```typescript
characters.sort((a, b) => {
  const posA = a.position;
  const posB = b.position;
  return posA.localeCompare(posB);
});
```

### 游戏流程
1. 游戏开始时，随机一个好人角色被揭示
2. 玩家可以通过点击角色查看其线索
3. 根据线索判断角色身份（好人/坏人）
4. 正确判断可以继续游戏，错误判断会增加失误计数
5. 找出所有坏人即可通关

## 开发说明

### 位置系统
- 使用字母+数字的组合表示位置（如 A1、B2、C3）
- 字母表示列（从左到右：A、B、C）
- 数字表示行（从上到下：1、2、3）
- 位置编码在角色数据和线索系统中广泛使用

### 注意事项
- 确保角色数据的 position 属性符合编码规则
- 网格渲染时需要按照行列顺序排序
- 线索系统中的位置引用需要与网格位置对应

## 游戏核心机制

### 1. 线索推进机制

每局游戏（以9人为例）的线索推进：

1. 开局状态：
   - A2位置角色处于好人状态（已开启）
   - 其他8个位置都是未开启状态
   - 只有1个坏人，位置未知

2. 线索类型：
   ```typescript
   type ClueType = 
     | '直接信任' // "C3是好人，他帮过我"
     | '邻居提示' // "B2的邻居里有坏人"
     | '区域排除' // "A区的都是好人"
     | '关系证明' // "我和C1共事多年"
   ```

3. 线索推进示例：
   ```
   第1轮：A2(开局好人) → "C3是好人，他帮过我"
   第2轮：C3(被点开) → "B2的邻居里有坏人"
   第3轮：B1(被点开) → "A排没有坏人"
   第4轮：B2(被点开) → "C1和我一起工作"
   第5轮：C1(被点开) → "A3很老实"
   第6轮：A3(被点开) → "C2不可能是坏人"
   第7轮：C2(被点开) → "只有B3很可疑"
   最终：B3被确认是坏人
   ```

### 2. 游戏循环

1. 阅读当前线索
2. 分析可能性：
   - 直接信任：确认好人
   - 邻居提示：缩小范围
   - 区域排除：排除选项
   - 关系证明：建立联系
3. 选择下一个要点开的角色
4. 获取新线索
5. 重复步骤1-4直到：
   - 收集足够线索
   - 排除所有其他可能
   - 确定坏人位置

### 3. 线索生成规则

```typescript
interface ClueConfig {
  round: number;        // 第几轮线索
  fromPosition: string; // 从哪个位置给出
  clueType: ClueType;   // 线索类型
  targetInfo: {
    position?: string;  // 指向位置
    area?: string;      // 指向区域
    neighbors?: string; // 邻居范围
  };
}

// 示例：生成第一轮线索
function generateFirstClue(): ClueConfig {
  return {
    round: 1,
    fromPosition: 'A2',
    clueType: '直接信任',
    targetInfo: {
      position: 'C3'
    }
  };
}

// 示例：生成中间轮线索
function generateMiddleClue(round: number): ClueConfig {
  return {
    round: round,
    fromPosition: 'B2',
    clueType: '邻居提示',
    targetInfo: {
      neighbors: 'B2'
    }
  };
}
```

### 4. 状态转换系统

```typescript
type CharacterState = 'initial' | 'revealed' | 'completed';

interface StateTransition {
  from: CharacterState;
  to: CharacterState;
  trigger: 'click' | 'reveal' | 'complete';
  condition: {
    isImpostor: boolean;
    hasBeenRevealed: boolean;
  };
}

const stateTransitions: StateTransition[] = [
  {
    from: 'initial',
    to: 'revealed',
    trigger: 'click',
    condition: { isImpostor: false, hasBeenRevealed: false }
  },
  {
    from: 'revealed',
    to: 'completed',
    trigger: 'complete',
    condition: { isImpostor: true, hasBeenRevealed: true }
  }
];
```

## 关卡设计

### 关卡概览
- 每个关卡使用`LevelConfig`类型定义配置
- 关卡难度通过以下方式递进：
  - 增加网格大小
  - 增加坏人数量
  - 引入职业系统
  - 复杂化线索链

### 关卡数据结构
```typescript
interface LevelConfig {
  id: number;
  gridSize: {
    rows: number;
    cols: number;
  };
  startPosition: string;
  impostorCount: number;
  characters: Character[];
}

interface Character {
  id: string;
  position: string;
  name: string;
  state: 'initial' | 'revealed' | 'completed';
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: {
    text: string;
    type: 'direct' | 'area' | 'behavior' | 'relation';
    targetPosition?: string;
    highlightNames: string[];
    isUsed: boolean;
  };
}
```

### 第一关
- 网格大小：3x3
- 起始位置：A2
- 坏人数量：2 (A3和B1)
- 线索链：
  1. A1 -> B1：监控线索，指出B1和A3可疑
  2. A2 -> C3：区域线索，提示大明负责的区域
  3. A3(坏人) -> 随机线索
  4. B1(坏人) -> 随机线索
  5. B2 -> C1：关系线索，提到和福贵的关系
  6. B3 -> C2：行为线索，提到值班室事件
  7. C1 -> B3：行为线索，关于仓库钥匙
  8. C2 -> A1：行为线索，要求查看监控
  9. C3 -> B2：关系线索，提到阿杰查监控室

### 第二关
- 网格大小：2x3
- 起始位置：A1
- 坏人数量：1 (B2)
- 线索链：
  1. A1 -> B1：邻居规则说明
  2. B1 -> C1：斜角邻居提示
  3. C1 -> A2：通关条件提示
  4. A2 -> B2(坏人)：直接举报
  5. B2(坏人) -> C2：随机线索
  6. C2 -> A1：结束提示

### 第三关
- 网格大小：3x3
- 起始位置：A1
- 坏人数量：4 (B1, C2, A2, B3)
- 线索链：
  1. A1 -> B1：绑架事件线索
  2. B1(坏人) -> C1：随机线索
  3. C1 -> C2：区域线索
  4. A2(坏人) -> A3：关于妻子的线索
  5. B2 -> A2：钱包事件线索
  6. C2(坏人) -> B2：随机线索
  7. A3 -> B3：关于丈夫的线索
  8. B3(坏人) -> C3：随机线索
  9. C3 -> B2：邻居确认线索

### 第四关
- 网格大小：3x3
- 起始位置：C1
- 坏人数量：2 (A1和B2)
- 线索链：
  1. C1 -> A1：邻居数量线索
  2. A1(坏人) -> C2：自首线索
  3. B1 -> A2：游戏提示
  4. A2 -> B2：状态提示
  5. B2(坏人) -> B1：随机线索
  6. C2 -> B2：区域线索
  7. A3 -> B3：区域确认
  8. B3 -> C3：外貌线索
  9. C3 -> B2：特征线索

### 第五关
- 网格大小：4x3
- 起始位置：C4
- 坏人数量：3 (B2, C2, A4)
- 特色：首次引入职业系统
- 职业分布：
  - 警察：小泉(A1)、阿魔(C1)、阿星(C2)
  - 医生：阿玉(A3)、阿智(B4)
  - 路人：其他角色
- 线索链：
  1. A1(警察) -> B1：区域安全线索
  2. B1 -> A1：警察确认
  3. C1(警察) -> A1：警察身份线索
  4. A2 -> B2：感谢线索
  5. B2(坏人) -> C2：随机线索
  6. C2(坏人) -> A3：随机线索
  7. A3(医生) -> B3：医生身份线索
  8. B3 -> B2：坏人确认
  9. C3 -> A4：区域线索
  10. A4(坏人) -> B4：随机线索
  11. B4(医生) -> C4：邻居确认
  12. C4 -> B4：团队确认

### 第六关
- 网格大小：3x5
- 起始位置：C1和C4 (首次双起始点)
- 坏人数量：4 (A3, A5, B2, B3)
- 特殊角色：
  - B4：农夫
  - C2和C3：双胞胎
- 线索链：
  1. C1 -> A2：区域线索，指出小峰周围有3个坏人
  2. C4 -> C1：区域线索，指出第一行都是好人
  3. A1 -> C2/C3：直接线索，确认双胞胎身份
  4. C3 -> B3：直接线索，指出农夫左边的人
  5. B4 -> A2/B5：直接线索，农夫确认两个好孩子
  6. A2 -> A列：区域线索，指出A列有两个坏人
  7. B5 -> 第五行：区域线索，指出最后一行有坏人

### 第七关
- 网格大小：3x4
- 起始位置：B1和A4 (双起始点)
- 坏人数量：3 (A2, C2, B4)
- 特殊位置：B2和B3为空位
- 特殊角色：
  - A1：宇航员
  - C3：消防员
- 线索链：
  1. B1 -> A1：直接线索，确认宇航员身份
  2. A1 -> 全局：区域线索，坏人分布在每列
  3. C1 -> BC列：区域线索，B列和C列坏人在不同行
  4. A3 -> C3：区域线索，C列坏人在消防员周围
  5. C3 -> C2：直接线索，指出C2可疑行为
  6. A4 -> B4：关系线索，指出邻居中有坏人

### 线索系统说明
1. 线索类型：
   - `direct`: 直接指出某个角色的身份
   - `area`: 描述某个区域或行列的情况
   - `behavior`: 描述可疑行为
   - `relation`: 描述角色间的关系

2. 线索生成规则：
   - 好人只提供真实线索
   - 坏人提供随机线索
   - 每个角色的线索都经过精心设计，确保玩家可以通过逻辑推理找出坏人

3. 线索链设计原则：
   - 确保每条线索都有其作用
   - 线索之间存在关联性
   - 避免出现死胡同
   - 保证有足够信息找出所有坏人

### 关卡通关条件
1. 找出所有坏人
2. 翻开所有卡片
3. 错误次数不超过3次
4. 正确完成所有判定

### 2. 游戏界面功能

#### 2.1 主菜单界面
- 游戏启动后显示主菜单界面
- 中央显示游戏Banner图片
- "开始游戏"按钮：直接进入第一关
- "选择关卡"按钮：显示已解锁的关卡列表（目前共6关）

#### 2.2 游戏设置
游戏界面左上角的设置按钮(⚙️)提供以下功能：
- 返回首页：返回主菜单界面
- 重启关卡：重新开始当前关卡

## 项目技术栈

### 核心依赖
```json
{
  "dependencies": {
    "clsx": "2.1.1",
    "framer-motion": "11.15.0",
    "mobx": "^6.12.0",
    "mobx-react-lite": "^4.0.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "7.1.1",
    "tailwind-merge": "2.6.0"
  }
}
```

### 项目结构
```
src/
├── data/               # 游戏数据
│   └── levels/         # 关卡配置
├── features/           # 功能模块
│   └── game/          
│       └── components/ # 游戏组件
├── hooks/             # 自定义Hook
├── lib/               # 工具函数
├── providers/         # Context提供者
├── shared/            # 共享资源
│   └── types/         # 类型定义
└── stores/            # 状态管理

```

### 构建工具
- Vite 5.1.0
- TypeScript 5.2.2
- Tailwind CSS 3.4.1
- ESLint 8.56.0
- Jest 29.7.0

### 开发命令
```bash
# 开发环境
npm run dev

# 生产构建
npm run build

# 运行测试
npm run test

# 代码检查
npm run lint
```

### 类型定义
```typescript
// 关卡配置类型
interface LevelConfig {
  id: number;
  gridSize: {
    rows: number;
    cols: number;
  };
  startPosition: string | string[];  // 支持多起始点
  impostorCount: number;
  characters: Character[];
  clueFlow: {
    steps: ClueFlowStep[];
  };
}

// 角色类型
interface Character {
  id: string;
  position: string;
  name: string;
  state: CharacterState;
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: Clue;
}

// 线索类型
interface Clue {
  text: string;
  type: ClueType;
  targetPosition?: string;
  highlightNames: string[];
  isUsed: boolean;
}

type ClueType = 'direct' | 'area' | 'behavior' | 'relation';
type CharacterState = 'initial' | 'revealed' | 'completed';
```

### 编译配置
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## UI 布局规范

### 1. 卡片布局规范

#### 1.1 卡片基础结构
```tsx
<div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md">
  {/* 位置标识 */}
  {/* 身份标识 */}
  {/* 内容区域 */}
</div>
```

#### 1.2 卡片尺寸与间距
- 宽高比：3:4
- 圆角：rounded-lg (8px)
- 阴影：默认 shadow-md，悬浮时 shadow-lg
- 网格间距：gap-2 (8px)
- 容器内边距：p-2 (8px)

#### 1.3 性别区分样式
- 男性角色：bg-blue-100
- 女性角色：bg-pink-100

#### 1.4 位置标识
```tsx
<div className="absolute top-0 left-0 bg-black/80 text-white px-1.5 py-0.5 text-[min(3vw,14px)] rounded-br">
  {position}
</div>
```

#### 1.5 身份标识
```tsx
<div className="absolute top-0 right-0 text-[min(8vw,40px)] leading-none">
  {identity.isImpostor ? '😈' : '😊'}
</div>
```

#### 1.6 卡片状态

##### 1.6.1 未翻开状态
- 大图显示：占满整个卡片空间
- 底部名字栏：半透明黑色背景 (bg-black/70)
```tsx
<div className="absolute inset-0 flex items-center justify-center p-2">
  <img className="w-full h-full object-contain" />
</div>
<div className="absolute bottom-0 w-full bg-black/70 py-1">
  <div className="text-white text-center text-[min(3vw,14px)]">{name}</div>
</div>
```

##### 1.6.2 已翻开状态
- 图片区域：30% 高度，浅色背景
- 文本区域：70% 高度，深色背景
```tsx
<div className="h-full flex flex-col p-2">
  {/* 图片区域 */}
  <div className="w-full h-[30%] flex items-center justify-center bg-white/50 rounded-t">
    <div className="w-[85%] h-[85%]">
      <img className="w-full h-full object-contain" />
    </div>
  </div>
  
  {/* 文本区域 */}
  <div className="w-full h-[70%] rounded-b overflow-hidden bg-black/90">
    {/* 名字 */}
    <div className="text-center text-[min(3vw,14px)] text-white py-1 font-medium">
      {name}
    </div>
    {/* 分隔线 */}
    <div className="w-full h-[1px] bg-white/30" />
    {/* 线索文本 */}
    <div className="px-2 py-1.5">
      <div className="text-white text-[min(3vw,14px)] leading-tight text-center">
        {clue.text}
      </div>
    </div>
  </div>
</div>
```

#### 1.7 响应式设计
- 字体大小：使用 min(vw, px) 确保在不同屏幕尺寸下的可读性
  - 位置标识：text-[min(3vw,14px)]
  - 身份标识：text-[min(8vw,40px)]
  - 名字和线索：text-[min(3vw,14px)]
- 图片尺寸：使用相对单位确保自适应

#### 1.8 交互效果
- 悬浮缩放：hover:scale-105
- 选中状态：ring-2 ring-blue-500
- 长按放大：500ms 延时触发

### 2. 布局网格规范

#### 2.1 网格容器
```tsx
<div className="grid grid-cols-3 gap-2 p-2">
  {/* 卡片内容 */}
</div>
```

#### 2.2 网格配置
- 3x3 布局：grid-cols-3
- 间距：gap-2 (8px)
- 内边距：p-2 (8px)

### 3. 颜色规范

#### 3.1 背景色
- 男性角色卡片：bg-blue-100
- 女性角色卡片：bg-pink-100
- 文本容器（好人）：bg-black/90
- 文本容器（坏人）：bg-red-600/90
- 半透明遮罩：bg-black/70, bg-white/50

#### 3.2 文本颜色
- 主要文本：text-white
- 分隔线：bg-white/30

### 4. 开发规范

#### 4.1 组件结构
- 使用 TypeScript 确保类型安全
- 使用 MobX 进行状态管理
- 使用 observer 包装组件实现响应式更新

#### 4.2 图片处理
- 使用 object-contain 确保图片比例正确
- 实现图片预加载避免闪烁
- 添加 alt 属性提高可访问性

#### 4.3 性能优化
- 使用 memo 优化不必要的重渲染
- 图片懒加载
- 使用 CSS 变量实现主题定制

#### 4.4 可访问性
- 合适的颜色对比度
- 键盘导航支持
- ARIA 标签支持

### 5. 自适应布局策略

#### 5.1 屏幕尺寸适配
- iPhone SE (375px)：基准设计尺寸
- iPhone 14 Pro Max (428px)：优化大屏体验

#### 5.2 文本自适应
使用 vw 单位结合最大像素值：
```css
text-[min(3vw,14px)] /* 普通文本 */
text-[min(8vw,40px)] /* 表情图标 */
```

#### 5.3 间距自适应
- 使用相对单位定义间距
- 在关键断点进行微调

### 6. 动画与过渡效果

#### 6.1 卡片翻转
- 使用 transform-style: preserve-3d
- 添加适当的过渡时间
- 考虑添加缓动函数优化体验

#### 6.2 状态变化
- hover 效果：scale + shadow 变化
- 选中效果：边框高亮
- 长按效果：延时显示大图

### 7. 错误处理

#### 7.1 图片加载
- 添加加载占位图
- 处理加载失败情况
- 实现重试机制

#### 7.2 数据验证
- 验证必要属性
- 提供默认值
- 错误边界处理

### 8. 测试规范

#### 8.1 单元测试
- 测试组件渲染
- 测试交互行为
- 测试边界情况

#### 8.2 集成测试
- 测试组件间通信
- 测试状态管理
- 测试路由跳转

#### 8.3 E2E测试
- 测试完整游戏流程
- 测试不同设备适配
- 测试网络异常情况

### 9. 维护指南

#### 9.1 代码组织
- 遵循功能模块化
- 保持组件粒度合适
- 注释关键业务逻辑

#### 9.2 样式管理
- 使用 Tailwind 工具类
- 避免内联样式
- 保持类名语义化

#### 9.3 版本控制
- 遵循语义化版本
- 编写清晰的提交信息
- 保持向后兼容

[继续...] 