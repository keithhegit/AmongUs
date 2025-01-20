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

4. **关卡详情**
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
├── assets/
│   └── images/
│       ├── citizens/      # 普通角色图片
│       └── professions/   # 职业角色和特殊图片
├── components/           # 通用组件
├── data/
│   └── levels/          # 关卡配置
├── features/
│   └── game/           # 游戏相关功能
│       ├── components/ # 游戏组件
│       └── utils/     # 游戏工具函数
├── shared/
│   ├── services/     # 共享服务
│   └── types/       # 类型定义
└── stores/         # 状态管理
```

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
