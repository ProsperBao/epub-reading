import fetchJsonp from 'fetch-jsonp'
import { MD5, SHA256, enc } from 'crypto-js'
import { omit } from 'lodash'
import type { NormalizeStringify } from './epub'
import type { TranslateEngine } from '~/stores'
import { useHistoryStore, useTranslateStore, useUniqueNounStore } from '~/stores'

// 转换处理注音标签
export function convertContent(content: string): string {
  const doc = document.createElement('div')
  doc.innerHTML = content
  doc.querySelectorAll('rt').forEach(el => el.remove())
  return doc.innerText
}

export function useEngineTextSlot(type: 'convert' | 'recovery', index: number): string {
  const translate = useTranslateStore()
  if (type === 'convert')
    return translate[translate.use].slot.replace(/<slot>/g, `${index}`)

  else
    return translate[translate.use].slotRegex.replace(/<slot>/g, `${index}`)
}

// 转换特有名词
export function convertUniqueNoun(content: string): [string, string[]] {
  let text = content
  text = text.replace(/「([^」]+)」/g, ' “$1” ')
  const nounMapping = []
  const { use, list } = useUniqueNounStore()
  for (const dict of use) {
    const uniqueNoun = list[dict]
    if (uniqueNoun) {
      for (const key in uniqueNoun) {
        if (!!uniqueNoun[key][0] || !!uniqueNoun[key][1])
          continue
        if ((new RegExp(uniqueNoun[key][0], 'g')).test(text)) {
          const index = nounMapping.length
          nounMapping.push(uniqueNoun[key][1])
          text = text.replace(new RegExp(uniqueNoun[key][0], 'g'), useEngineTextSlot('convert', index))
        }
      }
    }
  }
  return [text, nounMapping]
}

// 请求百度翻译
export function requestBaiduTranslate(content: string): Promise<string> {
  const { baidu: { appid, secret } } = useTranslateStore()
  if (!appid || !secret)
    throw alert('请先配置百度翻译')
  const params: Record<string, string> = {
    appid,
    q: content,
    from: 'jp',
    to: 'zh',
    salt: `${+new Date()}`,
  }
  params.sign = MD5(params.appid + params.q + params.salt + secret).toString()
  return fetchJsonp(`https://api.fanyi.baidu.com/api/trans/vip/translate?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
    .then(respone => respone.json())
    .then(result => result.trans_result[0].dst)
}
// 请求有道翻译
export function requestYoudaoTranslate(content: string): Promise<string> {
  function truncate(q: string) {
    const len = q.length
    if (len <= 20)
      return q
    return q.substring(0, 10) + len + q.substring(len - 10, len)
  }
  const { youdao: { appid: appKey, secret: key } } = useTranslateStore()
  if (!appKey || !key)
    throw alert('请先配置有道翻译')
  const params: Record<string, string> = {
    q: content,
    appKey,
    salt: `${+new Date()}`,
    from: 'ja',
    to: 'zh-CHS',
    signType: 'v3',
    curtime: `${Math.round(+new Date() / 1000)}`,
    vocabId: '',
  }
  params.sign = SHA256(appKey + truncate(content) + params.salt + params.curtime + key).toString(enc.Hex)
  return fetchJsonp(`https://openapi.youdao.com/api?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
    .then(respone => respone.json())
    .then(result => result.translation[0])
}

// 恢复特有名词
export function recoveryUniqueNoun(content: string, nounMapping: string[]): string {
  let text = content
  for (let i = 0; i < nounMapping.length; i++)
    // 关闭贪婪模式
    text = text.replace(new RegExp(useEngineTextSlot('recovery', i), 'g'), nounMapping[i])

  return text
}

// 更新数据缓存
export function updateHistory(source: NormalizeStringify, translate: string): NormalizeStringify {
  const { record } = useHistoryStore()
  const result = {
    ...omit(source, ['origin', 'hash']),
    translate,
    date: `${+new Date()}`,
  }
  record[source.hash] = result
  return { ...source, ...result }
}

const translateEngine: Record<TranslateEngine, any> = {
  baidu: requestBaiduTranslate,
  youdao: requestYoudaoTranslate,
}

// 转换翻译结果
export async function translate(source: NormalizeStringify): Promise<NormalizeStringify> {
  const translate = useTranslateStore()
  if (translate.loading.includes(source.hash))
    return source
  let nounMapping: string[] = []
  const { use } = useTranslateStore()
  // 剔除注音标签
  let content = convertContent(source.origin)
    // 转换专有名词，并且返回专有名词对应的翻译
    ;[content, nounMapping] = convertUniqueNoun(content)
  if (!content)
    return source
  // 加载
  translate.loading.push(source.hash)
  // 拼装请求参数并且请求翻译
  try {
    content = await (translateEngine[use])(content)
    source.engine = use
    // 恢复专有名词
    content = recoveryUniqueNoun(content, nounMapping)
    // 更新记录并返回数据
    return updateHistory(source, content)
  }
  finally {
    // 加载完成
    translate.loading = translate.loading.filter(hash => hash !== source.hash)
  }
  return source
}
