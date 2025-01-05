export const badPersonClues = [
  "随地吐痰",
  "恶意刹车",
  "打游戏挂机",
  "顺手牵羊",
  "我什么都不知道",
  "一口8个瑞士卷",
  "坐高铁大声外放短视频",
  "被抓到在商店零元购",
  "偷电瓶",
  "我供出同伙，能少判我点吗",
  "图书馆大笑",
  "电影院剧透",
  "公共场合放屁",
  "会议打瞌睡",
  "餐厅恶劣态度",
  "公园乱扔垃圾",
  "电梯里放屁",
  "葬礼上讲笑话",
  "婚礼上抢风头",
  "考试作弊传答案",
  "当众挖鼻屎",
  "公共场合穿睡衣",
  "超市试吃不买",
  "做客时乱翻东西",
  "公共交通占座",
  "大声嚼口香糖",
  "公共场合讲私事",
  "不戴口罩故意咳嗽"
];

export const getRandomBadClue = () => {
  const index = Math.floor(Math.random() * badPersonClues.length);
  return badPersonClues[index];
}; 