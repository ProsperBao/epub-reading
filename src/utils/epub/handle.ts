import type { Book } from 'epubjs'
import { loadStringByPath } from './loadToDom'

export async function handleInnerStyle(book: Book, asset: string): Promise<string[]> {
  const arr = asset.match(/@import\s+url\((.*?)\)/g)
  if (!arr)
    return []
  return await Promise.all(arr.map(async (item) => {
    const url = item.match(/"(.*?)"/)?.[1].substring(3)
    const str = await loadStringByPath(book, `${url}`)
    return str
  }))
}

// 处理 head 中的 <link> <style>标签
export async function handleAsset(book: Book, doc: Document): Promise<string[]> {
  // 从 doc 中
  const linkTags = doc.querySelectorAll('link')
  const styleTags = doc.querySelectorAll('style')
  const assets: string[] = []
  assets.concat(...Array.from(styleTags).map(tag => tag.textContent || ''))
  for await (const res of Array.from(linkTags).map(tag => loadStringByPath(book, tag.getAttribute('href')!.substring(3))))
    assets.push(...await handleInnerStyle(book, res), res)

  return assets
}
// 处理 body 中的 <ruby> <rb> <rt>标签
export function handleMark(doc: Document) {
  // 把 ruby 标签中的 rb 标签的内容放到新的 span 标签中，并替换 ruby 标签
  doc.body.querySelectorAll('ruby').forEach((el) => {
    const rt = el.querySelector('rt')
    const rb = el.querySelector('rb')
    if (rt && rb) {
      const span = document.createElement('span')
      span.innerHTML = rb.innerHTML
      span.setAttribute('data-mark', `(${rt.innerHTML})`)
      span.setAttribute('class', 'top-mark')
      el.replaceWith(span)
    }
  })
}

export interface DomHandled {
  asset: string[]
  doc: string
}

export async function handle(book: Book, doc: Document) {
  const asset: string[] = await handleAsset(book, doc)

  handleMark(doc)

  return {
    asset,
    doc: doc.body.innerHTML,
  }
}
