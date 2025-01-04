import { GameStore } from './gameStore';
import { UIStore } from './uiStore';
import { ConfigStore } from './configStore';

export class RootStore {
  gameStore: GameStore;
  uiStore: UIStore;
  configStore: ConfigStore;

  constructor() {
    this.gameStore = new GameStore();
    this.uiStore = new UIStore();
    this.configStore = new ConfigStore();
  }
}

export const rootStore = new RootStore(); 