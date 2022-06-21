import type { Book, NavItem } from 'epubjs'
import epub from 'epubjs'
import { handle, loadToDom } from '~/utils/epub'

export function useEpubOperate() {
  const book = ref<Book | null>(null)
  const catalog = ref<NavItem[] | null>()
  const html = ref<string>('')
  const { open, data } = useFileSystemAccess({
    dataType: 'ArrayBuffer',
  })

  const loadEpub = async (b: Book, path: string) => {
    const doc: Document = await loadToDom(b, path)
    const res = await handle(b, doc)
    html.value = res.doc
  }

  // 读取文件
  watch(() => data.value, (n) => {
    epub(n as ArrayBuffer).opened.then((res) => {
      book.value = res
      console.log(res)
      catalog.value = res.navigation.toc
      loadEpub(res, 'Text/cover_page.xhtml')
    })
  })

  return {
    // 只有未打开过的才可以打开
    open: () => !book.value && open(),
    catalog,
    html,
  }
}
