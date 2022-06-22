import fetchJsonp from 'fetch-jsonp'
import md5 from 'md5'
import type { NormalizeStringify } from './epub'
import { useTranslateStore, useUniqueNounStore } from '~/stores'

// 转换处理注音标签
export function convertContent(content: string): string {
  const doc = document.createElement('div')
  doc.innerHTML = content
  doc.querySelectorAll('rt').forEach(el => el.remove())
  return doc.innerText
}

// 转换特有名词，用 {number} 占位
export function convertUniqueNoun(content: string): [string, string[]] {
  let text = content

  const nounMapping = []
  const { use, list } = useUniqueNounStore()
  for (const dict of use) {
    const uniqueNoun = list[dict]
    if (uniqueNoun) {
      for (const key in uniqueNoun) {
        const index = nounMapping.length
        nounMapping.push(uniqueNoun[key])
        text = text.replace(new RegExp(key, 'g'), `{${index}}`)
      }
    }
  }

  return [text, nounMapping]
}

// 拼装请求参数
export function assembleParams(content: string): Record<string, string> {
  const { appid, secret } = useTranslateStore()
  const params: Record<string, string> = {
    appid,
    q: content,
    from: 'jp',
    to: 'zh',
    salt: `${+new Date()}`,
  }

  return {
    ...params,
    sign: md5(params.appid + params.q + params.salt + secret),
  }
}

// 请求翻译
export function requestTranslate(params: Record<string, string>): Promise<string> {
  return fetchJsonp(`http://api.fanyi.baidu.com/api/trans/vip/translate?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
    .then(respone => respone.json())
}

// 恢复用 {number} 占位，的特有名词
export function recoveryUniqueNoun(content: string, nounMapping: string[]): string {
  let result = content
  for (let i = 0; i < nounMapping.length; i++)
    result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), nounMapping[i])

  return result
}

export async function translate(source: NormalizeStringify) {
  let nounMapping: string[] = []
  let content = convertContent(source.origin)
  ;[content, nounMapping] = convertUniqueNoun(content)
  const result: any = await requestTranslate(assembleParams(content))
  content = result.trans_result[0].dst
  console.log(recoveryUniqueNoun(content, nounMapping))
}
