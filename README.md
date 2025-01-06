# Among Us

## 游戏规则

### 基础规则
- 每局游戏包含多个角色，其中有少数内鬼和多数船员
- 玩家需要通过收集线索，正确找出所有内鬼
- 每局游戏有3次判断错误的机会
- 需要找出所有内鬼且翻开所有卡片才能获胜

### 关卡系统
1. **关卡解锁条件**
   - 第1-10关：完成上一关后自动解锁，无金币要求
   - 第11关起：需要满足金币要求
     - 第11关：需要100金币
     - 第12关：需要200金币
     - 第13关：需要300金币
     - 以此类推...

2. **关卡奖励**
   - 每次正确判断：+10金币
   - 完美通关(无失误)：额外+20金币
   - 观看广告：双倍金币奖励

3. **关卡进度**
   - 进度保存：自动保存已解锁的关卡和获得的金币
   - 重玩机制：已解锁的关卡可以随时重玩
   - 进度显示：顶部显示当前关卡进度(X/Y)和累计金币数

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

[继续...] 