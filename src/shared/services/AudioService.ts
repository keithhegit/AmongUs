import { makeAutoObservable } from 'mobx';
import { eventService, GameEventType } from './EventService';

class AudioService {
  private gameplayBGM: HTMLAudioElement | null = null;
  private menuBGM: HTMLAudioElement | null = null;
  private successSound: HTMLAudioElement | null = null;
  private failureSound: HTMLAudioElement | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAudio();
    this.setupEventListeners();
  }

  private initializeAudio() {
    try {
      // 使用动态导入音频文件
      const gameplayBGMUrl = new URL('../../assets/BGM/freecompress-mixkit-night-patrol-853.mp3', import.meta.url).href;
      const menuBGMUrl = new URL('../../assets/BGM/freecompress-mixkit-traitor-1121.mp3', import.meta.url).href;
      const successSoundUrl = new URL('../../assets/BGM/powerupsuccess.wav', import.meta.url).href;
      const failureSoundUrl = new URL('../../assets/BGM/failurewrong.wav', import.meta.url).href;

      // 初始化游戏界面BGM
      this.gameplayBGM = new Audio(gameplayBGMUrl);
      this.gameplayBGM.loop = true;
      this.gameplayBGM.volume = 0.5; // 设置音量为50%
      
      // 初始化主菜单BGM
      this.menuBGM = new Audio(menuBGMUrl);
      this.menuBGM.loop = true;
      this.menuBGM.volume = 0.5; // 设置音量为50%

      // 初始化音效
      this.successSound = new Audio(successSoundUrl);
      this.successSound.volume = 1.0; // 设置音效音量为100%

      this.failureSound = new Audio(failureSoundUrl);
      this.failureSound.volume = 1.0; // 设置音效音量为100%
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  private setupEventListeners() {
    // 订阅判断成功事件
    eventService.subscribe('JUDGMENT_SUCCESS', () => {
      this.playSuccessSound();
    });

    // 订阅判断失败事件
    eventService.subscribe('JUDGMENT_FAILURE', () => {
      this.playFailureSound();
    });
  }

  playGameplayBGM() {
    this.stopMenuBGM();
    if (this.gameplayBGM) {
      this.gameplayBGM.play().catch(error => {
        console.error('Failed to play gameplay BGM:', error);
      });
    }
  }

  playMenuBGM() {
    this.stopGameplayBGM();
    if (this.menuBGM) {
      this.menuBGM.play().catch(error => {
        console.error('Failed to play menu BGM:', error);
      });
    }
  }

  private playSuccessSound() {
    if (this.successSound) {
      // 每次播放前重置音效
      this.successSound.currentTime = 0;
      this.successSound.play().catch(error => {
        console.error('Failed to play success sound:', error);
      });
    }
  }

  private playFailureSound() {
    if (this.failureSound) {
      // 每次播放前重置音效
      this.failureSound.currentTime = 0;
      this.failureSound.play().catch(error => {
        console.error('Failed to play failure sound:', error);
      });
    }
  }

  stopGameplayBGM() {
    if (this.gameplayBGM) {
      this.gameplayBGM.pause();
      this.gameplayBGM.currentTime = 0;
    }
  }

  stopMenuBGM() {
    if (this.menuBGM) {
      this.menuBGM.pause();
      this.menuBGM.currentTime = 0;
    }
  }

  stopAllBGM() {
    this.stopGameplayBGM();
    this.stopMenuBGM();
  }
}

export const audioService = new AudioService(); 