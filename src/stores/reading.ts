import { defineStore } from 'pinia'

// 阅读
export const useReadingStore = defineStore('reading', () => ({
  mode: useColorMode({
    modes: {
      green: 'green',
      mung: 'mung',
      autumn: 'autumn',
      sea: 'sea',
      rouge: 'rouge',
    },
  }),
  font: useLocalStorage('config-reading-font', {
    size: 18,
    height: 22,
  }),
  record: useLocalStorage<{
    partPath?: string
    percent?: number
  }>('config-reading-record', {}),
  lockScroll: ref(false),
  guid: useLocalStorage('config-reading-guid', false),
}))
