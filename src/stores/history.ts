import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import type { NormalizeStringify } from '~/utils/epub'

export type TranslateHistory = Omit<NormalizeStringify, 'origin' | 'hash'>

// 翻译记录
export const useHistoryStore = defineStore('history', () => {
  const record = useLocalStorage<Record<string, TranslateHistory>>('config-history-record', {})
  const name = useLocalStorage('config-history-name', '')

  // 过滤 record 中的过期数据
  const processExpire = () => {
    const clone = cloneDeep(record.value)
    const now = new Date().getTime()
    const keys = Object.keys(clone)
    for (const key of keys) {
      const { date } = clone[key]
      if (date && now - +date > 3 * 24 * 60 * 60 * 1000)
        delete clone[key]
    }
    record.value = clone
  }
  processExpire()

  return {
    record,
    name,
  }
})
