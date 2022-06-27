<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
import { useHistoryStore, useReadingStore, useUniqueNounStore } from '~/stores'
const { open, targetRef, toggleOpen } = useToggleOutside()

const { reset } = useUniqueNounStore()
const history = useHistoryStore()
const resetNoun = () => {
  reset()
  alert('清理完成')
}
const resetHistory = () => {
  history.record = {}
  alert('清理完成')
}
const reading = useReadingStore()
const operateReading = (attr: 'height' | 'size', type: 'add' | 'sub') => {
  const value = reading.font[attr]
  reading.font[attr] = type === 'add' ? +value + 1 : +value - 1
}
</script>

<template>
  <span class="icon-btn" w-18 text-center @click="() => toggleOpen()">
    <div i-carbon:settings text-2xl ma />
    <span>设置</span>
  </span>
  <Transition>
    <div v-if="open" ref="targetRef" shadow shadow-neutral-3 shadow-current fixed left-0 bottom-0 w-full opacity-100 z-10 bg-white dark:bg-hex-121212>
      <h5 text-left font-600 p-l-2 p-t-2>
        清理缓存数据
      </h5>
      <div text-left flex gap-x-2 p-2>
        <button class="btn" @click="resetNoun">
          清理翻译历史
        </button>
        <button class="btn" @click="resetHistory">
          清理特有名词
        </button>
      </div>
      <h5 text-left font-600 p-l-2 p-t-2>
        字体管理
      </h5>
      <div text-left flex justify-around gap-x-2 p-2>
        <div flex gap-x-2 items-center>
          <div i-carbon:add-alt text-xl @click="operateReading('size', 'add')" />
          <span>字体大小</span>
          <div i-carbon:subtract-alt text-xl @click="operateReading('size', 'sub')" />
          <div i-carbon:renew text-xl @click="reading.font.size = 18" />
        </div>
        <div flex gap-x-2 items-center>
          <div i-carbon:add-alt text-xl @click="operateReading('height', 'add')" />
          <span>字体行高</span>
          <div i-carbon:subtract-alt text-xl @click="operateReading('height', 'sub')" />
          <div i-carbon:renew text-xl @click="reading.font.height = 22" />
        </div>
      </div>
    </div>
  </Transition>
</template>
