<script setup lang="ts">
import { useTranslateStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
import { translate } from '~/utils/translate'

const props = defineProps<{ width: number; line: NormalizeStringify }>()
const translateStore = useTranslateStore()

const target = ref<HTMLElement | null>(null)
const left = ref(0)
const { isSwiping, lengthX } = useSwipe(
  target, {
    passive: true,
    onSwipe() {
      left.value = lengthX.value / props.width * 100
    },
    onSwipeEnd() {
      if (+left.value > 30) {
        if (!props.line.translate)
          translate(props.line)

        if (props.line.translate && props.line.engine !== translateStore.use)
          translate(props.line)
      }
      left.value = 0
    },
  })
</script>

<template>
  <div ref="target" class="overlay" :class="{ animated: !isSwiping }" :style="{ transform: `translateX(-${left}%)` }">
    <slot />
  </div>
</template>

<style scoped>
.overlay.animated {
  transition: all 0.2s ease-in-out;
}
</style>
