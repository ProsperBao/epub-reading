<script setup lang="ts">
import { useReadingStore, useTranslateStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
import { translate } from '~/utils/translate'

const props = defineProps<{ width: number; line: NormalizeStringify }>()
const translateStore = useTranslateStore()
const readingStore = useReadingStore()

const target = ref<HTMLElement | null>(null)
const left = ref(0)
const { isSwiping, lengthX } = useSwipe(
  target, {
    passive: true,
    onSwipe() {
      const percent = lengthX.value / props.width * 100
      // 超过5才有翻译的意图
      if (percent > 5)
        readingStore.lockScroll = true

      left.value = percent < 10 ? 0 : percent
    },
    onSwipeEnd() {
      if (+left.value > 30) {
        if (!props.line.translate)
          translate(props.line)

        if (props.line.translate && props.line.engine !== translateStore.use)
          translate(props.line)
      }
      left.value = 0
      readingStore.lockScroll = false
    },
  })
</script>

<template>
  <div ref="target" class="overlay" :class="{ animated: !isSwiping }" relative :style="{ transform: `translateX(-${left}%)` }">
    <slot />
  </div>
</template>

<style scoped>
.overlay.animated {
  transition: all 0.2s ease-in-out;
}
</style>
