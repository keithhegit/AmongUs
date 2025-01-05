import { createContext, useContext, ReactNode } from 'react';
import { RootStore, rootStore } from '@/stores';

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
}; 