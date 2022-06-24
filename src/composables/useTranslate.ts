import type { TranslateEngine } from '~/stores'
import { useTranslateStore } from '~/stores'

export function useTranslate() {
  const engine = new Map<TranslateEngine, string>([
    ['youdao', '有道'],
    ['baidu', '百度'],
    // ['google', '谷歌'],
    // ['microsoft', '微软'],
  ])
  const translate = useTranslateStore()

  const toggle = (use: TranslateEngine) => {
    translate.use = use
  }

  return {
    current: computed(() => translate.use),
    toggle,
    engine,
  }
}
