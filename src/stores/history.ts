import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'

export type TranslateHistory = Record<string, {
  date: string
  translate: string
}>

// 翻译记录
export const useHistoryStore = defineStore('history', () => {
  const record = useLocalStorage<TranslateHistory>('config-history-record', {})

  // 过滤 record 中的过期数据
  const processExpire = () => {
    const clone = cloneDeep(record.value)
    const now = new Date().getTime()
    const keys = Object.keys(clone)
    for (const key of keys) {
      const { date } = clone[key]
      if (now - +date > 3 * 24 * 60 * 60 * 1000)
        delete clone[key]
    }
    record.value = clone
  }
  processExpire()

  return {
    record,
  }
})
