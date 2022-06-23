export function useFileSelect() {
  const data = ref<ArrayBuffer | null>(null)

  const open = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0] || null
      if (file) {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent) => {
          data.value = (e.target as FileReader).result as ArrayBuffer
        }
        reader.readAsArrayBuffer(file)
      }
    }
  }
  return {
    data,
    open,
  }
}
