// '冬の<ruby><rb>主</rb><rt>あるじ</rt></ruby>の<ruby><rb>討伐…差しが差し込んだだけで、心まで軽くなるようだ。ランプレヒトはそう感じながら騎士団長室へ急いでいた。'
// import fetchJsonp from 'fetch-jsonp'
import hash from 'object-hash'
import type { NormalizeStringify } from './epub'

// 转换处理注音标签
export function convertContent(content: string): string {
  const doc = document.createElement('div')
  doc.innerHTML = content
  doc.querySelectorAll('rt').forEach(el => el.remove())
  return doc.innerText
}

// 转换特有名字，用 emoji 占位
export function convertUniqueNoun(content: string): string {

}

// 拼装请求参数
export function assembleParams(content: string, appid: string, secret: string): Record<string, string> {
  const params: Record<string, string> = {
    appid,
    q: content,
    from: 'jp',
    to: 'zh',
    salt: `${+new Date()}`,
  }
  return {
    ...params,
    sign: hash.MD5(params.appid + params.q + params.salt + secret),
  }
}

export async function translate(source: NormalizeStringify) {
  const { translate } = useReadConfig()

  const { appid, secret } = translate.value
  assembleParams(source.origin, appid, secret)

  console.log(translate.value)
}
