import type { Book } from 'epubjs'
import md5 from 'md5'
import { pipeline } from '../pipeline'
import { extractResource } from './extractResource'
import { useHistoryStore } from '~/stores'

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

export interface NormalizeStringify {
  origin: string
  translate?: string // 翻译过后的文本
  hash: string // 哈希值用来对应历史缓存
  date?: string // 翻译时间戳，超过时间的文本会被清除
}

// 规范转化段落标签
export async function normalizeStringify(_: Book, doc: Document): Promise<NormalizeStringify[]> {
  const stringify: NormalizeStringify[] = []

  const h1 = doc.querySelector('h1')
  if (h1) {
    const text = h1.textContent || ''
    stringify.push({ origin: text, hash: md5(text).substring(0, 20) })
    h1.remove()
  }

  const p = doc.querySelectorAll('.main > p')
  for (const el of Array.from(p)) {
    const text = el.innerHTML.replace(/ xmlns="[^"]+"/g, '')
    stringify.push({ origin: text, hash: md5(text).substring(0, 20) })
  }

  return stringify
}

// 把标准化字符串和翻译历史记录合并
export async function merageNormalizeStringify(stringify: NormalizeStringify[]): Promise<NormalizeStringify[]> {
  const history = useHistoryStore()
  return stringify.map(item => ({ ...item, ...history.record[item.hash] }))
}

// 处理结果
export interface NormalizeResult {
  content: NormalizeStringify[]
}

export async function normalizeConvert(book: Book, doc: Document): Promise<NormalizeResult> {
  const res = await pipeline(
    [book, doc],
    normalizePicture,
    normalizeStringify,
  )

  return {
    content: await merageNormalizeStringify(res),
  }
}
