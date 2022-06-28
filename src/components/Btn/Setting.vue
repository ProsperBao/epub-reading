<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
import { useHistoryStore, useReadingStore, useUniqueNounStore } from '~/stores'
const { open, targetRef, toggleOpen } = useToggleOutside()
// 清理缓存
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
// 字体相关
const reading = useReadingStore()
const operateReading = (attr: 'height' | 'size', type: 'add' | 'sub') => {
  const value = reading.font[attr]
  reading.font[attr] = type === 'add' ? +value + 1 : +value - 1
}
// 配色相关
const mode = useColorMode({
  modes: {
    green: 'green',
    mung: 'mung',
    autumn: 'autumn',
    sea: 'sea',
    rouge: 'rouge',
  },
})
</script>

<template>
  <span class="icon-btn" w-18 text-center @click="() => toggleOpen()">
    <div i-carbon:settings text-2xl ma />
    <span>设置</span>
  </span>
  <Transition>
    <div
      v-if="open" ref="targetRef" shadow shadow-current fixed left-0 bottom-0 w-full opacity-100
      z-10 class="theme-wrap"
    >
      <h5 text-left font-600 p-l-2 p-t-2>
        数据管理
      </h5>
      <div text-left flex justify-around gap-x-2 p-2>
        <TranslateSecret />
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
      <h5 text-left font-600 p-l-2 p-t-2>
        非暗色模式配色设置
      </h5>
      <div flex justify-around gap-4 p-4>
        <div class="half-circle" :style="{ '--setting-f-color': '#374451', '--setting-b-color': 'white' }" @click="mode = 'light'" />
        <div class="half-circle" :style="{ '--setting-f-color': '#4E7B6C', '--setting-b-color': '#E3EDCD' }" @click="mode = 'green'" />
        <div class="half-circle" :style="{ '--setting-f-color': '#4E7B6C', '--setting-b-color': '#C7EDCC' }" @click="mode = 'mung'" />
        <div class="half-circle" :style="{ '--setting-f-color': '#374451', '--setting-b-color': '#FFF2E2' }" @click="mode = 'autumn'" />
        <div class="half-circle" :style="{ '--setting-f-color': '#374451', '--setting-b-color': '#DCE2F1' }" @click="mode = 'sea'" />
        <div class="half-circle" :style="{ '--setting-f-color': '#374451', '--setting-b-color': '#FDE6E0' }" @click="mode = 'rouge'" />
      </div>
      <div />
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.half-circle {
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  transform: rotate(45deg);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 40px;
    background: var(--setting-f-color);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 20px;
    height: 40px;
    background-color: var(--setting-b-color);
  }
}
</style>
