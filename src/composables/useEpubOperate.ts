import { loadAsync } from 'jszip'

export function useEpubOperate() {
  const book = ref<null>(null)
  const { open, data } = useFileSystemAccess({
    dataType: 'Blob',
  })

  // 读取文件
  watch(() => data.value, (n) => {
    loadAsync(n as Blob).then((zip) => {
      zip.files['OEBPS/Text/part0023.xhtml'].async('string').then(res => console.log(res))
    })
  })

  return {
    // 只有未打开过的才可以打开
    readEpub: () => !book.value && open(),
  }
}
