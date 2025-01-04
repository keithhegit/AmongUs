import { create } from 'zustand';

interface UserState {
  currentUser: { id: string; name: string } | null;
  isAuthenticated: boolean;

  // 动作
  login: (name: string) => Promise<boolean>;
  register: (name: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  login: async (name) => {
    try {
      // TODO: 实现实际的登录逻辑
      set({ 
        currentUser: { id: Date.now().toString(), name },
        isAuthenticated: true
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  register: async (name) => {
    try {
      // TODO: 实现实际的注册逻辑
      set({ 
        currentUser: { id: Date.now().toString(), name },
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: () => {
    set({ 
      currentUser: null, 
      isAuthenticated: false 
    });
  }
})); 