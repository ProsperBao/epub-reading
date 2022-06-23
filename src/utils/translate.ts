import fetchJsonp from 'fetch-jsonp'
import { MD5, SHA256, enc } from 'crypto-js'
import { omit } from 'lodash'
import type { NormalizeStringify } from './epub'
import type { TranslateEngine, TranslateHistory } from '~/stores'
import { useHistoryStore, useTranslateStore, useUniqueNounStore } from '~/stores'

// 转换处理注音标签
export function convertContent(content: string): string {
  const doc = document.createElement('div')
  doc.innerHTML = content
  doc.querySelectorAll('rt').forEach(el => el.remove())
  return doc.innerText
}

// 转换特有名词，用 {number} 占位
export function convertUniqueNoun(content: string): string {
  let text = content
  text = text.replace(/「([^」]+)」/g, '“$1”')
  const nounMapping = []
  const { use, list } = useUniqueNounStore()
  for (const dict of use) {
    const uniqueNoun = list[dict]
    if (uniqueNoun) {
      for (const key in uniqueNoun) {
        nounMapping.push(uniqueNoun[key])
        text = text.replace(new RegExp(key, 'g'), uniqueNoun[key])
      }
    }
  }

  return text
}

// 请求百度翻译
export function requestBaiduTranslate(content: string): Promise<string> {
  const { baidu: { appid, secret } } = useTranslateStore()
  const params: Record<string, string> = {
    appid,
    q: content,
    from: 'jp',
    to: 'zh',
    salt: `${+new Date()}`,
  }
  params.sign = MD5(params.appid + params.q + params.salt + secret).toString()
  return fetchJsonp(`http://api.fanyi.baidu.com/api/trans/vip/translate?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
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
  const { youdao: { appKey, key } } = useTranslateStore()
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
  return fetchJsonp(`http://openapi.youdao.com/api?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
    .then(respone => respone.json())
    .then(result => result.trans_result[0].dst)
}

// 请求谷歌翻译
export function requestGoogleTranslate(): Promise<string> {
  return fetchJsonp(`https://translate.google.cn/translate_a/single?client=webapp&sl=zh-CN&tl=en&dt=t&q=${encodeURIComponent('你好')}`)
    .then(respone => respone.json())
}

// 请求微软翻译
export function requestMicrosoftTranslate(): Promise<string> {
  return fetchJsonp(`https://translate.google.cn/translate_a/single?client=webapp&sl=zh-CN&tl=en&dt=t&q=${encodeURIComponent('你好')}`)
    .then(respone => respone.json())
}

// 更新数据缓存
export function updateHistory(source: NormalizeStringify, translate: string): TranslateHistory {
  const { record } = useHistoryStore()
  record[source.hash] = {
    ...omit(source, ['origin', 'hash']),
    translate,
    date: `${+new Date()}`,
  }
  return record[source.hash]
}

const translateEngine: Record<TranslateEngine, any> = {
  baidu: requestBaiduTranslate,
  google: requestGoogleTranslate,
  microsoft: requestMicrosoftTranslate,
  youdao: requestYoudaoTranslate,
}

// 转换翻译结果
export async function translate(source: NormalizeStringify): Promise<TranslateHistory> {
  const { use } = useTranslateStore()
  // 剔除注音标签
  let content = convertContent(source.origin)
  // 转换专有名词，并且返回专有名词对应的翻译
  content = convertUniqueNoun(content)
  // 拼装请求参数并且请求翻译
  content = await (translateEngine[use])(content)
  // 更新记录并返回数据
  return updateHistory(source, content)
}
