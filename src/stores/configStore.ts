import { makeAutoObservable } from 'mobx';

export class ConfigStore {
  gridLayout = {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    rows: Array.from({ length: 10 }, (_, i) => i + 1),
    maxColumns: 10,
    maxRows: 10
  };

  difficulty = {
    evilCount: 1,
    complexity: 1,
    maxMistakes: 3
  };

  constructor() {
    makeAutoObservable(this);
  }

  setDifficulty(level: number) {
    this.difficulty.evilCount = Math.floor(level / 3) + 1;
    this.difficulty.complexity = Math.min(5, Math.floor(level / 2) + 1);
  }

  setGridSize(columns: number, rows: number) {
    this.gridLayout.columns = this.gridLayout.columns.slice(0, columns);
    this.gridLayout.rows = this.gridLayout.rows.slice(0, rows);
  }
} 