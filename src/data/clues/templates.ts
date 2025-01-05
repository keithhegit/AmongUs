export const clueTemplates = {
  // 好人的线索模板
  goodClues: [
    {
      type: 'location',
      template: '我看见{target}昨晚在{location}鬼鬼祟祟',
      weight: 3
    },
    {
      type: 'behavior',
      template: '{target}的行为很可疑，一直在观察其他人',
      weight: 2
    },
    // ... 更多模板
  ],
  
  // 坏人的误导线索
  badClues: [
    {
      type: 'defense',
      template: '我相信{target}是清白的，他一直在{location}工作',
      weight: 3
    },
    {
      type: 'accusation',
      template: '我觉得{other}更可疑，{target}是无辜的',
      weight: 2
    }
    // ... 更多模板
  ]
}; 