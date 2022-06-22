import type { Book } from 'epubjs'
import { pipeline } from '../pipeline'
import { extractResource } from './extractResource'

// 规范化文本中的所有图片标签
export async function normalizePicture(book: Book, doc: Document): Promise<[Book, Document]> {
  const svgList = Array.from(doc.body.querySelectorAll('svg'))
  for (const el of svgList) {
    const svgImage = el.querySelector('image')
    if (svgImage) {
      const img = document.createElement('img')
      const base64 = await extractResource(book, svgImage.getAttribute('xlink:href')!.substring(3), 'base64')
      img.setAttribute('src', `data:image/png;base64,${base64}`)
      el.replaceWith(img)
    }
  }
  return [
    book,
    doc,
  ]
}

// 规范转化段落标签
export async function normalizeStringify(_: Book, doc: Document): Promise<string[]> {
  const stringify: string[] = []

  const h1 = doc.querySelector('h1')
  if (h1) {
    stringify.push(h1.textContent || '')
    h1.remove()
  }

  const p = doc.querySelectorAll('.main > p')
  for (const el of Array.from(p))
    stringify.push(el.innerHTML.replace(/ xmlns="[^"]+"/g, ''))

  return stringify
}

// 处理结果
export interface NormalizeResult {
  content: string[]
  doc: string
}

export async function normalizeConvert(book: Book, doc: Document): Promise<NormalizeResult> {
  const res = await pipeline(
    [book, doc],
    normalizePicture,
    normalizeStringify,
  )

  return {
    content: res,
    doc: doc.body.innerHTML,
  }
}
