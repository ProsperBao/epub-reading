import { defineStore } from 'pinia'

// 特有名词列表
export type UniqueNounList = Record<string, UniqueNounMap>
// 特有名词映射
export type UniqueNounMap = Record<string, string>

// 特有名词
export const useUniqueNounStore = defineStore('noun', () => ({
  use: useLocalStorage<string[]>('use', []),
  list: useLocalStorage<UniqueNounList>('list', {}),
}))
