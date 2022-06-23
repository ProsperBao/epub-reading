import { defineStore } from 'pinia'

// 特有名词列表
export type UniqueNounList = Record<string, UniqueNounMap>
// 特有名词映射
export type UniqueNounMap = Record<string, string>

// 特有名词
export const useUniqueNounStore = defineStore('noun', () => {
  const list = import.meta.globEager('~/noun/*.json')

  return {
    use: useLocalStorage<string[]>('use', [
      '本好きの下剋上',
    ]),
    // 和每个小说/自定义词典一样，每个小说/自定义词典都有一个独立的列表
    list: useLocalStorage<UniqueNounList>('list',
      Object.entries(list).reduce((acc, [key, value]) => {
        const name = key.split('/').pop()?.replace('.json', '')
        if (name)
          acc[name] = value.default

        return acc
      }, {} as UniqueNounList),
    ),
  }
})
