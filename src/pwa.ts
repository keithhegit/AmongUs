import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    // 当有新版本时提示用户
    if (confirm('New content available. Reload?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});