import { defineStore } from 'pinia'

// 特有名词列表
export type UniqueNounList = Record<string, UniqueNounMap>
// 特有名词映射
export type UniqueNounMap = [string, string][]

// 特有名词
export const useUniqueNounStore = defineStore('noun', () => {
  const use = useLocalStorage<string[]>('config-noun-use', ['本好きの下剋上'])
  // 和每个小说/自定义词典一样，每个小说/自定义词典都有一个独立的列表
  const list = useLocalStorage<UniqueNounList>('config-noun-list', {})

  const initList = () => {
    list.value = Object.entries(import.meta.globEager('~/noun/*.json')).reduce((acc, [key, value]) => {
      const name = key.split('/').pop()?.replace('.json', '')
      if (name)
        acc[name] = Object.entries<string>(value.default)

      return acc
    }, {} as UniqueNounList)
  }
  // 第一次初始化
  Object.keys(list.value).length === 0 && initList()

  return {
    use,
    list,
    reset: initList,
  }
})
