import type { Book } from 'epubjs'
import epub from 'epubjs'
import type { Ref } from 'vue'
import { useHistoryStore, useReadingStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
import { extractConvert2Dom, normalizeConvert } from '~/utils/epub'

export function useEpub(epubData: Ref<ArrayBuffer | null>) {
  const book = ref<Book | null>(null)
  const html = ref<NormalizeStringify[]>([])
  const catalog = ref<string[]>([])
  const navs = ref<string[]>([])
  const { record } = useHistoryStore()
  const { record: readingRecord } = useReadingStore()

  const goto = async (path: string) => {
    if (book.value) {
      const doc: Document = await extractConvert2Dom(book.value as Book, path)
      html.value = (await normalizeConvert(book.value as Book, doc)).content
      readingRecord.partPath = path
    }
  }

  // 加载 epub 文件
  const loadEpubFile = async (n: ArrayBuffer) => {
    const res = await epub(n as ArrayBuffer).opened
    // 保存数据以便后续加载
    book.value = res
    navs.value = res.navigation.toc.map(item => item.href)
    catalog.value = (res.resources as any).html.map((i: { href: string }) => i.href)
    goto(readingRecord.partPath || catalog.value[0])
  }

  watch(() => epubData.value, n => n && loadEpubFile(n))

  return {
    html: computed(() => {
      if (html.value.length === 0)
        return []
      return html.value.map(i => ({ ...i, translate: record[i.hash]?.translate || i.translate }))
    }),
    catalog,
    goto,
    navs,
    current: computed(() => readingRecord.partPath || ''),
  }
}
