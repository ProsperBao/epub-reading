import { defineStore } from 'pinia'

// 阅读
export const useReadingStore = defineStore('reading', () => ({
  font: useLocalStorage<Record<string, string>>('config-reading-font', {}),
  record: useLocalStorage<{
    partPath?: string
    percent?: number
  }>('config-reading-record', {}),
}))
