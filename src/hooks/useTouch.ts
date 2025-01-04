import { useState } from 'react';

export const useTouch = () => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const touchProps = {
    onTouchStart: (e: React.TouchEvent) => {
      setTouchStart(e.timeStamp);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      setTouchEnd(e.timeStamp);
      
      // 如果触摸时间小于200ms，认为是点击
      if (e.timeStamp - touchStart < 200) {
        const target = e.currentTarget as HTMLElement;
        target.click();
      }
    },
    onTouchMove: (e: React.TouchEvent) => {
      // 防止滚动时触发点击
      setTouchEnd(0);
    }
  };

  return { touchProps };
}; 