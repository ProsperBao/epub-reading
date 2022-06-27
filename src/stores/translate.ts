import { defineStore } from 'pinia'

export type TranslateEngine = 'google' | 'baidu' | 'microsoft' | 'youdao'

// 翻译
export const useTranslateStore = defineStore('translate', () => ({
  loading: ref<string[]>([]),
  use: useLocalStorage<TranslateEngine>('config-translate-use', 'youdao'),
  baidu: useLocalStorage('config-translate-baidu', {
    appid: '20160823000027324',
    secret: 'WM74h0ML7mKyiCO3xr4Z',
  }),
  youdao: useLocalStorage('config-translate-youdao', {
    appid: '791194598ffb2694',
    secret: 'ah0LK287QzXjqe6ieWq1OzdsW6UP2qX1',
  }),
}))
