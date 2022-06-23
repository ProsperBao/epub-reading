import type { Book } from 'epubjs'
import epub from 'epubjs'
import type { Ref } from 'vue'
import { useHistoryStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
import { extractConvert2Dom, normalizeConvert } from '~/utils/epub'

export function useEpub(epubData: Ref<ArrayBuffer | null>) {
  const book = ref<Book | null>(null)
  const html = ref<NormalizeStringify[]>([])
  const { record } = useHistoryStore()

  // 加载 epub 文件
  const loadEpubFile = async (n: ArrayBuffer) => {
    const res = await epub(n as ArrayBuffer).opened
    // 保存数据以便后续加载
    book.value = res
    const doc: Document = await extractConvert2Dom(res, 'Text/part0011.xhtml')
    html.value = (await normalizeConvert(res, doc)).content
  }

  watch(() => epubData.value, n => n && loadEpubFile(n))

  return {
    html: computed(() => {
      if (html.value.length === 0)
        return []
      return html.value.map(i => ({ ...i, translate: record[i.hash]?.translate || i.translate }))
    }),
  }
}
