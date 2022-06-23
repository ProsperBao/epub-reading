import { defineStore } from 'pinia'

export type TranslateEngine = 'google' | 'baidu' | 'microsoft'

// 翻译
export const useTranslateStore = defineStore('translate', () => ({
  use: useLocalStorage<TranslateEngine>('config-translate-use', 'baidu'),
  baidu: useLocalStorage('config-translate-baidu', {
    appid: '20160823000027324',
    secret: 'WM74h0ML7mKyiCO3xr4Z',
  }),
}))
