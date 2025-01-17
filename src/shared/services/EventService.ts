type EventCallback = (...args: any[]) => void;

export type GameEventType = 
  | 'JUDGMENT_SUCCESS'  // 判断正确
  | 'JUDGMENT_FAILURE'  // 判断错误
  | 'GAME_START'        // 游戏开始
  | 'GAME_OVER';        // 游戏结束

class EventService {
  private listeners: Map<GameEventType, Set<EventCallback>> = new Map();

  subscribe(event: GameEventType, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);

    // 返回取消订阅的函数
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit(event: GameEventType, ...args: any[]) {
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  clear() {
    this.listeners.clear();
  }
}

export const eventService = new EventService(); 