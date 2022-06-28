import { defineStore } from 'pinia'

// 阅读
export const useReadingStore = defineStore('reading', () => ({
  font: useLocalStorage('config-reading-font', {
    size: 18,
    height: 22,
  }),
  record: useLocalStorage<{
    partPath?: string
    percent?: number
  }>('config-reading-record', {}),
  lockScroll: ref(false),
}))
