import type { Book } from 'epubjs'
import type JSZip from 'jszip'

/**
 * 提取 epub 文件中的内容到 dom 元素中
 */
export function extractConvert2Dom(book: Book, path: string): Promise<Document> {
  return new Promise((resolve, reject) => {
    const exec = () => extractResource(book, path).then((str: string) => {
      const parser = new DOMParser()
      resolve(parser.parseFromString(str, 'text/xml'))
    }).catch(reject)
    book.archived ? exec() : setTimeout(exec)
  })
}

export type ExBooK = Book & {
  archive: {
    zip: JSZip
  }
}

/**
 * 抽取资源
 */

export function extractResource(book: Book, path: string, type: 'string' | 'base64' = 'string'): Promise<string> {
  return (book as ExBooK).archive.zip.files[`OEBPS/${path}`].async(type)
}

