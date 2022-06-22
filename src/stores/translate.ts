import { defineStore } from 'pinia'

// 翻译
export const useTranslateStore = defineStore('translate', () => ({
  appid: useLocalStorage('config-translate-appid', '20160823000027324'),
  secret: useLocalStorage('config-translate-secret', 'WM74h0ML7mKyiCO3xr4Z'),
}))
