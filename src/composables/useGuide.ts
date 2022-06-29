import Driver from 'driver.js'

type GuideType = 'main' | 'content'

const GuideMap: Record<GuideType, Driver.Step[]> = {
  main: [
    {
      element: '#guide-main-1',
      popover: {
        title: '底部菜单',
        description: '点击之后可以弹出底部操作栏',
        position: 'left',
        offset: 20,
      },
    },
    {
      element: '#guide-main-2',
      popover: {
        title: '书籍目录',
        description: '加载书籍之后可以点击这边看到目录',
        position: 'right',
        offset: 20,
      },
    },
  ],
  content: [
    {
      element: '#guide-content-1',
      popover: {
        title: '滑动翻译',
        description: '往左滑动段落可以翻译当前段落',
        position: 'bottom',
        offset: 20,
      },
    },
  ],
}

export function useGuide(type: GuideType) {
  const guide = useLocalStorage<GuideType[]>('config-reading-guid', ['main', 'content'])
  const driver = new Driver({
    doneBtnText: '完成',
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    allowClose: false,
    onReset: () => {
      document.body.style.position = ''
    },
  })

  if (guide.value.includes(type)) {
    nextTick(() => {
      document.body.style.position = 'fixed'
      driver.defineSteps(GuideMap[type])
      driver.start()
      guide.value = guide.value.filter(item => item !== type)
    })
  }
}
