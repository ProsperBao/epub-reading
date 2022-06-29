import type { Book, NavItem } from 'epubjs'
import epub from 'epubjs'
import type { Ref } from 'vue'
import { useHistoryStore, useReadingStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
import { extractConvert2Dom, normalizeConvert } from '~/utils/epub'

export function useEpub(epubData: Ref<ArrayBuffer | null>) {
  const book = ref<Book | null>(null)
  const html = ref<NormalizeStringify[]>([])
  const catalog = ref<string[]>([])
  const navs = ref<NavItem[]>([])
  const history = useHistoryStore()
  const { record: readingRecord } = useReadingStore()

  const goto = async (path: string, concat = false) => {
    if (book.value) {
      const doc: Document = await extractConvert2Dom(book.value as Book, path)
      const res: NormalizeStringify[] = (await normalizeConvert(book.value as Book, doc)).content
      html.value = concat ? [...html.value, ...res] : res
      readingRecord.partPath = path
    }
  }
  const next = () => {
    if (book.value) {
      const idx = catalog.value.findIndex(i => readingRecord.partPath === i)
      if (idx !== -1) {
        const nextPath = catalog.value[idx + 1]
        if (nextPath)
          goto(nextPath, true)
      }
    }
  }

  // 加载 epub 文件
  const loadEpubFile = async (n: ArrayBuffer) => {
    const res = await epub(n as ArrayBuffer).opened
    // 保存数据以便后续加载
    book.value = res
    navs.value = res.navigation.toc.map(i => ({ ...i, label: i.label.replace(/\n| /g, ''), href: i.href.split('#')[0] }))
    catalog.value = (res.resources as any).html.map((i: { href: string }) => i.href)
    let partPath = readingRecord.partPath || catalog.value[0]
    if (history.name !== res.packaging.metadata.title) {
      history.name = res.packaging.metadata.title
      partPath = catalog.value[0]
    }
    goto(partPath)
  }

  watch(() => epubData.value, n => n && loadEpubFile(n))

  return {
    html: computed(() => {
      if (html.value.length === 0)
        return []
      return html.value.map(i => ({ ...i, ...history.record[i.hash], translate: history.record[i.hash]?.translate || i.translate }))
    }),
    goto,
    navs: computed(() => {
      const temp: [NavItem, string[]][] = [
        [{ href: catalog.value[0], id: 'cover', label: '封面' }, []],
      ]
      for (const item of catalog.value) {
        if (temp.length <= navs.value.length && navs.value[temp.length - 1].href === item)
          temp.push([navs.value[temp.length - 1], []])
        temp[temp.length - 1][1].push(item)
      }
      return temp
    }),
    current: computed(() => readingRecord.partPath || ''),
    next,
  }
}
