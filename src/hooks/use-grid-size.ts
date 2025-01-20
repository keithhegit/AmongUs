import { useState, useEffect } from 'react';

// 布局常量
const FOOTER_BUTTON_HEIGHT = 70; // 判断按钮高度
const FOOTER_BUTTON_MARGIN = 10; // 判断按钮到上边距
const FOOTER_BASE_HEIGHT = 27; // 底部基础高度
const FOOTER_TOTAL_HEIGHT = FOOTER_BASE_HEIGHT + FOOTER_BUTTON_HEIGHT + FOOTER_BUTTON_MARGIN; // 底部总高度
const GRID_GAP = 4; // 网格间距
const CARD_ASPECT_RATIO = 1.4; // 卡片宽高比 (height/width)
const HORIZONTAL_PADDING = 8; // 水平内边距

// 字体大小比例常量
const NAME_FONT_RATIO = 0.14; // 名字字体大小比例
const TEXT_FONT_RATIO = 0.12; // 文本字体大小比例

interface GridSizeProps {
  columns: number;
  rows: number;
}

interface GridSize {
  cardWidth: number;
  cardHeight: number;
  fontSize: {
    name: number;
    text: number;
  };
}

export function useGridSize({ columns, rows }: GridSizeProps): GridSize {
  const [size, setSize] = useState<GridSize>({
    cardWidth: 0,
    cardHeight: 0,
    fontSize: {
      name: 0,
      text: 0
    }
  });

  useEffect(() => {
    const calculateSize = () => {
      // 1. 计算固定的可用高度 (头部高度固定为123px)
      const availableHeight = window.innerHeight - 123 - FOOTER_TOTAL_HEIGHT;
      const availableWidth = window.innerWidth - (HORIZONTAL_PADDING * 2);
      
      // 2. 计算网格间距总和
      const totalGapHeight = GRID_GAP * (rows - 1);
      const totalGapWidth = GRID_GAP * (columns - 1);
      
      // 3. 根据固定高度计算卡片高度
      const cardHeight = Math.floor((availableHeight - totalGapHeight) / rows);
      
      // 4. 根据宽高比计算理想卡片宽度
      const idealCardWidth = Math.floor(cardHeight / CARD_ASPECT_RATIO);
      
      // 5. 检查宽度是否超出限制
      const maxCardWidth = Math.floor((availableWidth - totalGapWidth) / columns);
      const cardWidth = Math.min(idealCardWidth, maxCardWidth);
      
      // 6. 如果宽度受限,重新计算高度以保持比例
      const finalCardHeight = cardWidth === maxCardWidth 
        ? Math.floor(cardWidth * CARD_ASPECT_RATIO)
        : cardHeight;
      
      // 7. 计算字体大小
      const nameFontSize = Math.max(12, Math.floor(cardWidth * NAME_FONT_RATIO));
      const textFontSize = Math.max(10, Math.floor(cardWidth * TEXT_FONT_RATIO));

      setSize({ 
        cardWidth, 
        cardHeight: finalCardHeight,
        fontSize: {
          name: nameFontSize,
          text: textFontSize
        }
      });
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [columns, rows]);

  return size;
} 