import { makeAutoObservable } from 'mobx';

export class UIStore {
  judgmentMode = {
    isActive: false,
    type: 'good' as 'good' | 'evil'
  };

  loading = false;
  error: Error | null = null;
  
  modal = {
    isOpen: false,
    type: null as 'clue' | 'character' | 'result' | null
  };

  constructor() {
    makeAutoObservable(this);
  }

  setJudgmentMode(isActive: boolean, type: 'good' | 'evil') {
    this.judgmentMode.isActive = isActive;
    this.judgmentMode.type = type;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: Error | null) {
    this.error = error;
  }

  openModal(type: 'clue' | 'character' | 'result') {
    this.modal.isOpen = true;
    this.modal.type = type;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.modal.type = null;
  }
} 