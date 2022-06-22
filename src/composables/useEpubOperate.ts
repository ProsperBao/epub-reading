import type { Book, NavItem } from 'epubjs'
import epub from 'epubjs'
import { extractConvert2Dom, normalizeConvert } from '~/utils/epub'

export function useEpubOperate() {
  const book = ref<Book | null>(null)
  const catalog = ref<NavItem[] | null>()
  const html = ref<string>('')
  const { open, data } = useFileSystemAccess({
    dataType: 'ArrayBuffer',
  })

  const loadEpub = async (b: Book, path: string) => {
    const doc: Document = await extractConvert2Dom(b, path)
    await normalizeConvert(b, doc)
  }

  // 读取文件
  watch(() => data.value, (n) => {
    epub(n as ArrayBuffer).opened.then((res) => {
      book.value = res
      loadEpub(res, 'Text/part0011.xhtml')
    })
  })

  return {
    // 只有未打开过的才可以打开
    open: () => !book.value && open(),
    catalog,
    html,
  }
}
