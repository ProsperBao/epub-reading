import type { RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export type TranslateEngine = 'google' | 'baidu' | 'microsoft' | 'youdao'
export const TRANSLATE_ENGINE: TranslateEngine[] = ['youdao', 'baidu', 'microsoft', 'google']

export interface EngineConfig {
  appid: string
  secret: string
}

// 翻译
export const useTranslateStore = defineStore<'translate', {
  loading: Ref<string[]>
  use: RemovableRef<TranslateEngine>
  [key: string]: RemovableRef<EngineConfig> | Ref<string[]> | RemovableRef<TranslateEngine>
}>('translate', () => ({
  loading: ref<string[]>([]),
  use: useLocalStorage<TranslateEngine>('config-translate-use', 'youdao'),
  baidu: useLocalStorage<EngineConfig>('config-translate-baidu', { appid: '', secret: '' }),
  youdao: useLocalStorage<EngineConfig>('config-translate-youdao', { appid: '', secret: '' }),
  microsoft: useLocalStorage<EngineConfig>('config-translate-microsoft', { appid: '', secret: '' }),
  google: useLocalStorage<EngineConfig>('config-translate-google', { appid: '', secret: '' }),
}))
