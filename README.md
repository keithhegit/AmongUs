# 谁是伪人

## 部署步骤
### 下载依赖：git clone之后首先在项目根目录运行 yarn install
### 调试代码：项目根目录运行 npm run dev
### 构建代码：项目根目录运行 npm run build

## 更新日志

### 2024-01-xx 更新
- PWA功能优化
  - 修改manifest.json配置
    - 设置display为"fullscreen"以支持全屏显示
    - 添加orientation为"landscape"以优化横屏显示
  - 优化PWA安装体验
    - 支持Windows系统安装
    - 支持移动设备横屏模式
  - 修复空位卡片显示问题
    - 优化图片路径处理逻辑
    - 使用统一的getCitizenImagePath函数
    - 确保空位图片正确加载
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
- 这是一个推理解谜游戏，玩家需要通过收集线索识别隐藏的伪人
- 每个关卡中都隐藏着若干个伪人，他们混在人类之中
- 玩家需要通过翻开卡片，阅读线索来推理出谁是伪人
- 每局游戏有3次判断错误的机会，超过则游戏失败
- 只有识别出所有伪人且翻开所有卡片才能获胜

### 游戏玩法
1. **翻开卡片**
   - 点击卡片可以翻开，查看该角色提供的线索
   - 只能翻开与已翻开卡片相邻的卡片
   - 每张卡片都可能包含重要线索

2. **判断身份**
   - 根据收集到的线索，判断角色是人类还是伪人
   - 切换到"识别模式"可以标记伪人
   - 判断错误会消耗一次机会
   - 正确识别出伪人后，该伪人会被标记

3. **胜利条件**
   - 识别出所有伪人
   - 翻开所有必要的卡片
   - 错误次数不超过3次

### 关卡系统
1. **关卡数量**
   - 目前共有7个关卡（1-7）
   - 每关难度递增
   - 最后一关完成后显示特殊结束文本

2. **关卡解锁**
   - 完成当前关卡后自动解锁下一关
   - 支持重新挑战已解锁关卡

3. **关卡进度**
   - 进度计算：已翻开非空位卡片数/总非空位卡片数
   - 空位卡片不计入进度统计
   - 自动保存已解锁的关卡进度

4. **关卡生成规则**
   #### 基本规则
   1. 每个关卡由以下要素组成：
      - 网格大小（gridSize）：定义行数和列数
      - 起始位置（startPosition）：玩家开始的位置
      - 伪人数量（impostorCount）：每关的伪人数量
      - 角色列表（characters）：包含每个位置的角色信息
      - 线索流程（clueFlow）：定义线索的展示顺序

   #### 线索系统
   1. 线索类型：
      - 直接线索（direct）：直接指出某个角色的身份
      - 邻居线索（neighbor）：描述某个位置附近的情况
      - 区域线索（area）：描述某个区域（如某行或某列）的情况
      - 关系线索（relation）：描述角色之间的关系

   2. 线索生成规则：
      - 所有角色（包括人类和伪人）提供的线索都是真实的
      - 每个角色的线索都包含类型、目标位置和高亮名单
      - 线索内容基于角色当前所知的真实信息
      - 玩家需要通过组合多个真实线索来推理出伪人身份

   3. 关卡线索链规则：
      - **第一关线索链**
        - 起始位置(A2)提供直接线索，指向A1或A3
        - 第二层线索指向B区域的角色
        - 最终线索指向C区域，形成完整推理链
      
      - **第二关线索链**
        - 起始位置(A1)提供邻居线索
        - 线索链呈现"之"字形传递
        - 关键线索集中在B2周围
      
      - **第三关线索链**
        - 起始位置(A1)提供区域线索，涉及多个角色
        - 线索在3x3网格中形成"回"字形传递
        - 多条线索链交叉验证
      
      - **第四关线索链**
        - 起始位置(C1)提供关系线索
        - 线索链分为左右两条主线
        - 需要交叉对比验证身份
      
      - **第五关线索链**
        - 双起始位置(C4)，提供职业相关线索
        - 线索链按职业群体划分（警察、医生等）
        - 多条平行线索链需要综合判断
      
      - **第六关线索链**
        - 双起始位置(C1,C4)，提供区域性线索
        - 线索在5x3网格中形成网状结构
        - 需要通过多个角色的线索交叉验证
      
      - **第七关线索链**
        - 双起始位置(B1,A4)，结合空位设计
        - 线索链需绕过空位传递
        - 职业角色（工程师、消防员）提供关键线索

   4. 线索链设计原则：
      - 确保每个角色的线索都是有意义的
      - 线索之间存在逻辑关联和递进关系
      - 空位的存在会影响线索传递路径
      - 职业角色通常提供更关键的线索
      - 多起始位置时，线索链会形成交叉验证结构

   #### 难度递进
   1. 网格大小：
      - 初始关卡为 3x3
      - 每5关增加一次网格大小，最大到 5x5

   2. 伪人数量：
      - 初始关卡从 1 个伪人开始
      - 每3关增加一个伪人，最多到 4 个

   3. 线索复杂度：
      - 初始关卡使用简单的直接线索
      - 随关卡进展逐渐引入更复杂的线索类型
      - 高级关卡会混合使用多种线索类型

   #### 特殊机制
   1. 空位机制：
      - 某些关卡中会出现空位，增加推理难度
      - 空位的 identity.isBlank 为 true

   2. 行为线索：
      - 某些角色会展示特定行为（如"恶意别车"、"骗老太太买保健品"等）
      - 这些行为线索可能暗示角色的身份

5. **关卡详情**
   #### 第一关
   - 布局: 3x3
   - 伪人数量: 2个
   - 起始位置: A2
   - 角色列表:
     - A1: 阿明 (人类) - 监控员
     - A2: 隆基 (人类) - 起始位置
     - A3: 阿聪 (伪人)
     - B1: 阿强 (伪人)
     - B2: 阿杰 (人类)
     - B3: 安娜 (人类)
     - C1: 福贵 (人类)
     - C2: 嘉宝 (人类)
     - C3: 大明 (人类)

   #### 第二关
   - 布局: 2x3
   - 伪人数量: 1个
   - 起始位置: A1
   - 角色列表:
     - A1: 小智 (人类) - 起始位置
     - B1: 小丽 (人类)
     - C1: 小红 (人类)
     - A2: 张三 (人类)
     - B2: 小樱 (伪人)
     - C2: 李四 (人类)

   #### 第三关
   - 布局: 3x3
   - 伪人数量: 4个
   - 起始位置: A1
   - 角色列表:
     - A1: 阿波 (人类) - 起始位置
     - B1: 小彬 (伪人)
     - C1: 阿婷 (人类)
     - A2: 小辉 (伪人)
     - B2: 阿敏 (人类)
     - C2: 阿岚 (伪人)
     - A3: 阿慧 (人类)
     - B3: 小依 (伪人)
     - C3: 小涛 (人类)

   #### 第四关
   - 布局: 3x3
   - 伪人数量: 2个
   - 起始位置: C1
   - 角色列表:
     - A1: 阿雄 (伪人)
     - B1: 小广 (人类)
     - C1: 小薇 (人类) - 起始位置
     - A2: 小旭 (人类)
     - B2: 阿凯 (伪人)
     - C2: 小燕 (人类)
     - A3: 小晴 (人类)
     - B3: 阿琴 (人类)
     - C3: 阿志 (人类)

   #### 第五关
   - 布局: 4x3
   - 伪人数量: 3个
   - 起始位置: C4
   - 角色列表:
     - A1: 小泉 (人类) - 警察
     - B1: 阿瑞 (人类)
     - C1: 阿珍 (人类) - 警察
     - A2: 阿强 (人类)
     - B2: David (伪人)
     - C2: 阿星 (伪人) - 警察
     - A3: 阿明 (人类) - 医生
     - B3: 阿婷 (人类)
     - C3: 小天 (人类)
     - A4: 小龙 (伪人)
     - B4: 阿智 (人类) - 医生
     - C4: 小义 (人类) - 起始位置

   #### 第六关
   - 布局: 5x3
   - 伪人数量: 4个
   - 起始位置: C1, C4
   - 角色列表:
     - A1: 小智 (人类)
     - B1: 小妍 (人类)
     - C1: 小梦 (人类) - 起始位置1
     - A2: 小峰 (人类)
     - B2: 小军 (伪人)
     - C2: 阿霞 (人类)
     - A3: 小芳 (伪人)
     - B3: 小贤 (伪人)
     - C3: 小月 (人类)
     - A4: 阿强 (人类)
     - B4: 小宁 (人类) - 农夫
     - C4: 小楠 (人类) - 起始位置2
     - A5: 小胡 (伪人)
     - B5: 小雅 (人类)
     - C5: 小天 (人类)

   #### 第七关
   - 布局: 4x3
   - 伪人数量: 3个
   - 起始位置: B1, A4
   - 角色列表:
     - A1: 小森 (人类) - 工程师
     - B1: 小杰 (人类) - 起始位置1
     - C1: 阿莱 (人类)
     - A2: 小琳 (伪人)
     - B2: 空位
     - C2: 阿婷 (伪人)
     - A3: 小亮 (人类)
     - B3: 空位
     - C3: 小影 (人类) - 消防员
     - A4: 阿茜 (人类) - 起始位置2
     - B4: 阿冬 (伪人)
     - C4: 阿雄 (人类)

   #### 第八关
   - 布局: 4x4
   - 伪人数量: 5个
   - 起始位置: C2
   - 角色列表:
     - A1: 小莹 (伪人) - 开挂打游戏
     - A2: 小瑶 (人类)
     - A3: 小枫 (人类)
     - A4: 阿芳 (人类)
     - B1: 小雨 (人类)
     - B2: 小海 (伪人) - 随地吐痰
     - B3: 阿成 (伪人)
     - B4: 小楠 (人类)
     - C1: 小亮 (人类)
     - C2: 小莹 (人类) - 起始位置
     - C3: 小军 (人类)
     - C4: 小江 (伪人) - 抢车位
     - D1: 阿宇 (人类)
     - D2: 阿娟 (伪人) - 故意送人头
     - D3: 小军 (人类)
     - D4: 阿翔 (人类)

   #### 第九关
   - 布局: 4x3
   - 伪人数量: 3个
   - 起始位置: A1, B1, A2
   - 角色列表:
     - A1: 阿东 (人类) - 起始位置1
     - A2: 小玲 (人类) - 起始位置3
     - A3: 小广 (人类)
     - A4: 阿慧 (伪人) - 骗老太太买保健品
     - B1: 阿兰 (人类) - 起始位置2
     - B2: 小瑞 (伪人) - 抢车位
     - B3: 小青 (人类)
     - B4: 阿翔 (人类)
     - C1: 阿成 (人类)
     - C2: 阿蕾 (伪人) - 抢车位
     - C3: 小晨 (人类)
     - C4: 小凡 (人类)

   #### 第十关
   - 布局: 4x5
   - 伪人数量: 4个
   - 起始位置: C1, D3, B5
   - 空位: B1, A2, D5
   - 角色列表:
     - A1: 小楠 (人类)
     - A3: 阿震 (人类)
     - A4: 阿洁 (伪人) - 偷看别人手机
     - A5: 小雨 (人类)
     - B2: 阿雪 (人类)
     - B3: 小瑞 (人类)
     - B4: 小才 (伪人) - 随地吐痰
     - B5: 阿凯 (人类) - 起始位置3
     - C1: 阿航 (人类) - 起始位置1
     - C2: 小刚 (伪人) - 打车不付账款
     - C3: 小航 (人类)
     - C4: 小洁 (人类)
     - C5: 小青 (人类)
     - D1: 小瑞 (伪人) - 顺手牵羊
     - D2: 小婉 (人类)
     - D3: 阿伟 (人类) - 起始位置2
     - D4: 阿静 (人类)

### 卡片系统

#### 1. 卡片类型
1. **普通角色卡片**
   - 可点击交互
   - 有对应的线索文本
   - 计入进度统计
   - 需要进行人类/伪人判定

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
    isImpostor: boolean;    // true表示伪人，false表示人类
    isRevealed: boolean;
    isBlank?: boolean;      // 标识空位卡片
  };
  clue: {
    text: string;
    type: ClueType;
    targetPosition?: string;
    highlightNames: string[];
    isUsed: boolean;
  };
}

type ClueType = 'direct' | 'area' | 'behavior' | 'relation' | 'none';  // none类型用于空位
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
1. **普通角色图片** (`/src/assets/images/citizens/`)
   - 命名格式: `[id]-[name].png`
   - ID范围: 001-099
   - 示例: `001-xiaoming.png`

2. **职业角色图片** (`/src/assets/images/professions/`)
   - 命名格式: `[id]-[name].png`
   - ID范围: 100-199
   - 示例: `120-police.png`

3. **特殊图片**
   - 空位图片: `200-blank-no.png`
   - 位置: `/src/assets/images/professions/`

### 项目结构
```
src/
├── assets/                # 静态资源
│   └── images/           # 图片资源
│       ├── citizens/     # 普通角色图片
│       └── professions/  # 职业角色和特殊图片
├── components/           # 通用组件
│   ├── layout/          # 布局相关组件
│   │   ├── Footer.tsx   # 底部导航栏
│   │   └── Header.tsx   # 顶部信息栏
│   └── ui/              # UI通用组件
├── data/                # 游戏数据
│   ├── clues/          # 线索模板
│   │   ├── templates.ts # 线索生成模板
│   │   └── badClues.json # 伪人线索库
│   └── levels/         # 关卡配置
│       ├── level1.ts   # 第一关配置
│       ├── level2.ts   # 第二关配置
│       └── ...         # 其他关卡
├── features/           # 功能模块
│   └── game/          # 游戏核心功能
│       ├── components/ # 游戏组件
│       │   ├── CharacterCard.tsx # 角色卡片
│       │   ├── GameHeader.tsx    # 游戏头部
│       │   ├── GameLayout.tsx    # 游戏布局
│       │   └── RoleToggle.tsx    # 身份切换
│       ├── stores/    # 游戏状态管理
│       │   └── gameStore.ts # 游戏状态
│       └── utils/     # 游戏工具函数
│           ├── generators/  # 生成器
│           │   ├── characterGenerator.ts # 角色生成
│           │   ├── clueGenerator.ts     # 线索生成
│           │   └── levelGenerator.ts    # 关卡生成
│           └── validators/  # 验证器
├── hooks/             # 自定义Hooks
│   ├── use-grid-size.ts  # 网格尺寸计算
│   └── use-long-press.ts # 长按事件处理
├── shared/           # 共享资源
│   ├── services/    # 共享服务
│   │   └── storage.ts # 存储服务
│   ├── types/      # 类型定义
│   │   ├── game.ts # 游戏相关类型
│   │   └── store.ts # 状态管理类型
│   └── utils/     # 通用工具函数
│       ├── clueUtils.ts # 线索工具
│       └── gameUtils.ts # 游戏工具
├── stores/         # 全局状态管理
│   └── index.ts   # 状态管理入口
└── styles/        # 样式文件
    └── globals.css # 全局样式
```

#### 主要目录说明

1. **assets/**
   - 存放所有静态资源
   - 图片资源按角色类型分类存储
   - 严格遵循图片命名规范

2. **components/**
   - 存放可复用的通用组件
   - 按功能分类：layout（布局）和 ui（界面）
   - 每个组件都有对应的类型定义和测试文件

3. **data/**
   - 存放游戏数据和配置
   - 关卡配置独立管理
   - 线索模板集中存储

4. **features/game/**
   - 游戏核心功能模块
   - 包含游戏组件、状态管理和工具函数
   - 使用生成器模式处理游戏内容生成

5. **hooks/**
   - 存放自定义React Hooks
   - 处理通用的状态和行为逻辑
   - 提供可复用的功能封装

6. **shared/**
   - 共享资源和工具
   - 类型定义集中管理
   - 通用工具函数和服务

7. **stores/**
   - 全局状态管理
   - 使用 MobX 进行状态管理
   - 包含游戏核心状态逻辑

8. **styles/**
   - 全局样式定义
   - 使用 Tailwind CSS
   - 包含自定义样式配置

### 游戏核心逻辑

#### 1. 胜利条件
```typescript
// 游戏胜利条件检查
isVictory = (
  // 所有非空位卡片都被翻开
  revealedNonBlankPositions.length === nonBlankCharacters.length &&
  // 且识别出所有伪人
  remainingImpostors === 0 &&
  // 且失败次数未达上限
  mistakeCount < maxMistakes // maxMistakes = 3
);
```

#### 2. 进度计算
```typescript
// 进度计算逻辑
progress = {
  // 已翻开的非空位卡片数
  revealed: revealedNonBlankPositions.length,
  // 总非空位卡片数
  total: nonBlankCharacters.length
};
```

#### 3. 游戏参数
- 最大错误次数 (maxMistakes): 3次
- 每关伪人数量: 在关卡配置中指定
- 初始翻开位置: 在关卡配置中指定
- 音效音量:
  - 正确音效: 100%
  - 错误音效: 100%

### 游戏界面布局规范

#### 1. 屏幕布局
- **头部区域 (Header)**
  - 高度: 75px
  - 包含: 关卡信息、进度条、计数器
  - 位置调整:
    - 关卡信息: 距顶部 38px
    - 进度条和计数器: 距底部 8px

- **底部区域 (Footer)**
  - 总高度: 107px (包含按钮和边距)
  - 按钮高度: 70px
  - 按钮边距: 上下各 10px
  - 居中对齐

#### 2. 卡片网格布局
根据不同行数自动调整卡片尺寸：

- **3行布局**
  - 卡片高度: 420px
  - 适用场景: 9-12张卡片

- **4行布局**
  - 卡片高度: 315px
  - 适用场景: 13-16张卡片

- **5行布局**
  - 卡片高度: 252px
  - 适用场景: 17-20张卡片

- **6行布局**
  - 卡片高度: 210px
  - 适用场景: 21-24张卡片

#### 3. 自适应字体大小
- **卡片字体**
  - 角色名称: 根据卡片高度自动计算
    ```typescript
    fontSize.name = Math.floor(height * 0.0476)  // 例如: 420px * 0.0476 = 20px
    ```
  - 线索文本: 根据卡片高度自动计算
    ```typescript
    fontSize.text = Math.floor(height * 0.0381)  // 例如: 420px * 0.0381 = 16px
    ```

#### 4. 特殊元素
- **身份标识表情**
  - 位置: 右上角
  - 大小: 原始大小的3倍 (transform: scale(3))
  - 缩放原点: 右上角 (transform-origin: top right)

- **位置标识**
  - 位置: 左上角
  - 背景色: 半透明黑色 (bg-black/80)
  - 字体大小: 与线索文本相同

### 游戏存档系统 (🚧 计划功能)
> 以下功能将在未来版本中实现

1. **自动存档**
   - 自动保存游戏进度到 localStorage
   - 保存内容包括：
     - 当前关卡
     - 金币数量
     - 已解锁关卡
     - 最后游玩时间
     - 游戏设置

2. **存档导入导出**
   - 支持导出存档为编码字符串
   - 支持导入存档数据
   - 包含数据验证机制

3. **进度统计**
   - 每关统计：
     - 获得星星数
     - 最高分数
     - 最佳时间
   - 全局统计：
     - 总游玩时间
     - 总金币数
     - 已解锁关卡数

### 游戏设置系统 (🚧 计划功能)
> 以下功能将在未来版本中实现

1. **音频设置**
   - 音效开关（默认开启）
   - 音乐开关（默认开启）
   - 音效音量：
     - 背景音乐: 50%
     - 正确音效: 100%
     - 错误音效: 100%

2. **界面设置**
   - 震动反馈开关（默认开启）
   - 主题切换：
     - 浅色主题
     - 深色主题
     - 跟随系统

### 奖励系统 (🚧 计划功能)
> 以下功能将在未来版本中实现

1. **金币机制**
   - 正确判断角色身份: +10金币
   - 完成关卡额外奖励
   - 可用于解锁特殊内容

2. **关卡评分**
   - 根据以下因素计算星级：
     - 完成时间
     - 错误次数
     - 剩余机会数

## 关卡系统

### 1. 关卡配置文件结构

关卡配置文件位于 `src/data/levels/` 目录下，每个关卡都有独立的配置文件（如 `level1.ts`, `level2.ts` 等）。

#### 1.1 关卡配置主要参数
```typescript
export const levelN: LevelConfig = {
  id: number,           // 关卡ID
  gridSize: {           // 网格大小
    rows: number,       // 行数
    cols: number        // 列数
  },
  startPosition: string | string[],  // 初始显示的位置
  impostorCount: number,  // 伪装者数量
  characters: Character[], // 角色配置
  clueFlow: {           // 线索流程
    steps: ClueFlowStep[]
  }
};
```

#### 1.2 角色配置参数
```typescript
{
  id: string,          // 角色ID，用于匹配图片资源
  position: string,    // 位置坐标（如'A1', 'B2'等）
  name: string,        // 角色名称
  state: string,       // 状态（'initial'/'revealed'等）
  identity: {          // 身份信息
    isImpostor: boolean,  // 是否是伪装者
    isRevealed: boolean   // 是否已显示
  },
  clue: {             // 线索信息
    text: string,     // 线索文本
    type: ClueType,   // 线索类型
    targetPosition: string,    // 目标位置
    highlightNames: string[],  // 高亮显示的名字
    isUsed: boolean           // 是否已使用
  }
}
```

### 2. 角色图片系统

#### 2.1 图片资源
- 角色图片存放在 `src/assets/images/citizens/` 目录下
- 图片ID与性别对应关系定义在 `src/assets/images/citizens/citizens.json` 中

#### 2.2 角色ID规则
- 男性角色：使用 '001'-'050' 范围的ID
- 女性角色：使用 '051'-'100' 范围的ID
- ID必须与 citizens.json 中的性别定义匹配

```json
// citizens.json 示例
{
  "citizens": [
    {
      "id": "001",
      "gender": "boy",
      "feature": "red-ts",
      "image": "001-boy-citizen-red-ts.png"
    },
    {
      "id": "051",
      "gender": "girl",
      "feature": "brownHair-greyoveralls",
      "image": "051-girl-citizen-brownHair-greyoveralls.png"
    }
  ]
}
```

### 3. 新关卡创建教程

#### 第一步：规划关卡内容

1. **确定关卡基本参数**
   ```typescript
   {
     id: number,          // 关卡编号，如 8
     gridSize: {          // 网格大小
       rows: number,      // 行数，建议3-5
       cols: number       // 列数，建议3-5
     },
     impostorCount: number  // 伪装者数量，建议2-5个
   }
   ```

2. **绘制关卡网格图**
   ```
   示例：4x4网格
   A1 A2 A3 A4
   B1 B2 B3 B4
   C1 C2 C3 C4
   D1 D2 D3 D4
   ```
   - 标记起始位置（startPosition）
   - 标记伪装者位置（用 "I" 表示）
   - 标记空位（如果有，用 "X" 表示）

3. **设计线索链**
   - 画出线索传递路径
   - 确定每个位置的线索类型
   - 设计线索内容，确保逻辑闭环

#### 第二步：准备角色资源

1. **检查可用角色图片**
   ```bash
   # 查看 citizens.json 了解可用角色
   src/assets/images/citizens/citizens.json
   ```

2. **角色ID分配规则**
   - 男性角色：001-050
   - 女性角色：051-100
   - 确保ID与性别匹配

3. **创建角色列表**
   ```typescript
   // 为每个位置创建角色配置
   {
     id: string,        // 从 citizens.json 中选择
     position: string,  // 网格位置（如'A1'）
     name: string,      // 角色名称（如'小明'）
     identity: {
       isImpostor: boolean,  // 是否是伪装者
       isRevealed: boolean   // 初始为 false
     }
   }
   ```

#### 第三步：编写关卡配置

1. **创建关卡文件**
   ```bash
   # 在 src/data/levels/ 目录下创建新文件
   touch src/data/levels/level8.ts  # 示例：创建第8关
   ```

2. **编写基础结构**
   ```typescript
   import type { LevelConfig } from '@/shared/types/game';

   export const level8: LevelConfig = {
     id: 8,
     gridSize: {
       rows: 4,
       cols: 4
     },
     startPosition: 'C2',
     impostorCount: 5,
     characters: [],
     clueFlow: {
       steps: []
     }
   };
   ```

3. **添加角色配置**
   ```typescript
   characters: [
     {
       id: '001',
       position: 'A1',
       name: '小明',
       state: 'initial',
       identity: {
         isImpostor: true,
         isRevealed: false
       },
       clue: {
         text: '线索内容',
         type: 'behavior',
         targetPosition: '',
         highlightNames: [],
         isUsed: false
       }
     },
     // ... 其他角色
   ]
   ```

4. **设计线索流程**
   ```typescript
   clueFlow: {
     steps: [
       {
         round: 1,
         fromPosition: 'C2',
         clueType: 'area',
         targetInfo: {
           area: 'corners'  // 或 'neighbors', 'row', 'column'
         }
       },
       // ... 其他步骤
     ]
   }
   ```

#### 第四步：注册新关卡

1. **更新关卡索引**
   ```typescript
   // src/data/levels/index.ts
   import { level8 } from './level8';
   
   export const levels = [
     // ... 现有关卡
     level8
   ];
   
   export { level8 };
   ```

2. **添加关卡选择图片**
   - 准备关卡选择界面的图片（建议尺寸：300x200px）
   - 命名为 `level8.png`
   - 放置在 `src/assets/images/levelcard/` 目录下

3. **更新主菜单**
   ```typescript
   // src/features/game/components/MainMenu.tsx
   import level8 from '../../../assets/images/levelcard/level8.png';
   
   const levelCards = [
     // ... 现有关卡
     level8
   ];
   ```

#### 第五步：测试和调试

1. **基础检查**
   - [ ] 所有角色ID与性别是否匹配
   - [ ] 伪装者数量是否正确
   - [ ] 起始位置是否合理
   - [ ] 线索是否构成完整链路

2. **游戏测试**
   - [ ] 进入关卡是否正常
   - [ ] 角色图片是否正确显示
   - [ ] 线索是否按设计传递
   - [ ] 是否可以找出所有伪装者

3. **常见问题排查**
   ```typescript
   // 1. 角色ID性别不匹配
   // 解决：检查 citizens.json 确认正确的ID
   
   // 2. 线索链断裂
   // 解决：确保 clueFlow 中的位置都是有效的
   
   // 3. 图片无法显示
   // 解决：检查图片路径和导入语句
   ```

#### 第六步：优化和完善

1. **关卡平衡性调整**
   - 调整伪装者分布
   - 优化线索难度
   - 确保游戏可解性

2. **关卡说明文档**
   ```markdown
   ## 第N关设计说明
   
   - 网格：4x4
   - 伪装者：5个
   - 特殊机制：空位/特殊线索
   - 难点：xxx
   - 预期通关时间：xx分钟
   ```

3. **版本控制**
   ```bash
   # 提交新关卡代码
   git add src/data/levels/level8.ts
   git add src/data/levels/index.ts
   git add src/assets/images/levelcard/level8.png
   git commit -m "feat: add level 8"
   ```

### 4. 关卡设计建议

1. 难度递进
- 初始关卡使用较小的网格（如3x3）
- 随关卡进展增加网格大小和伪装者数量
- 逐步引入复杂的线索类型

2. 线索设计
- 确保线索之间有逻辑关联
- 提供足够信息让玩家推理
- 避免矛盾或误导性的线索

3. 角色布局
- 合理分布伪装者位置
- 设置适当的初始显示位置
- 考虑线索传递的路径

4. 测试验证
- 确保所有线索都是可解的
- 验证角色图片正确显示
- 测试关卡完成条件

5. 注意事项

1. 类型检查
- 确保使用正确的类型定义
- 注意 ClueFlowStep 的 targetInfo 格式
- 验证所有必需字段都已填写

2. 图片资源
- 确保所有引用的图片文件存在
- 检查图片ID与性别匹配
- 保持图片命名规范

3. 性能考虑
- 合理控制图片大小
- 避免过度复杂的线索逻辑
- 优化关卡加载性能
