import { create } from 'zustand';

interface UIState {
  loading: boolean;
  error: Error | null;
  modal: {
    isOpen: boolean;
    type: 'clue' | 'character' | 'result' | null;
  };

  // 动作
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  openModal: (type: 'clue' | 'character' | 'result') => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  error: null,
  modal: {
    isOpen: false,
    type: null
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  openModal: (type) => set({ modal: { isOpen: true, type } }),
  closeModal: () => set({ modal: { isOpen: false, type: null } })
})); 