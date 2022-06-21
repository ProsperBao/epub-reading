import type { Book } from 'epubjs'
import { loadFileByPath } from './loadFile'

// 处理 <link> 中遇到的内联样式
export async function handleInnerStyle(book: Book, asset: string): Promise<string[]> {
  const arr = asset.match(/@import\s+url\((.*?)\)/g)
  if (!arr)
    return []
  return await Promise.all(arr.map(async (item) => {
    const url = item.match(/"(.*?)"/)?.[1].substring(3)
    const str = await loadFileByPath(book, `${url}`)
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
  for await (const res of Array.from(linkTags).map(tag => loadFileByPath(book, tag.getAttribute('href')!.substring(3))))
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

// 处理 body 中的 img 标签
export async function handleImage(book: Book, doc: Document) {
  const svgList = Array.from(doc.body.querySelectorAll('svg'))
  for (const el of svgList) {
    const svgImage = el.querySelector('image')
    if (svgImage) {
      const img = document.createElement('img')
      const base64 = await loadFileByPath(book, svgImage.getAttribute('xlink:href')!.substring(3), 'base64')
      img.setAttribute('src', `data:image/png;base64,${base64}`)
      el.replaceWith(img)
    }
  }
}

// 序列化 dom 到字符串 并去第一层的标签
// 保留 h1 去除第一层 p 只保留内部的文本/图片/注音
export function stringifyDocument(doc: Document) {
  const stringify: string[] = []

  const h1 = doc.querySelector('h1')
  h1 && stringify.push(h1.outerHTML || '')
}

// 处理结果
export interface HandleResult {
  // asset: string[]
  content: string[]
  doc: string
}

export async function handle(book: Book, doc: Document): Promise<HandleResult> {
  // 处理 head 样式标签
  // 大部分用到自己的样式，无需加载样式，保留代码
  // const asset = await handleAsset(book, doc)

  // 把 doc 中的日文注音替换成为元素显示避免后续影响到翻译结果
  handleMark(doc)

  // 处理 body 中的 image 标签
  // 主要的插图解析
  await handleImage(book, doc)

  return {
    content: [],
    doc: doc.body.innerHTML,
  }
}
