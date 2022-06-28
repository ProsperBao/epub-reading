<script lang="ts" setup>
import { useReadingStore, useTranslateStore } from '~/stores'
import type { NormalizeStringify } from '~/utils/epub'
const props = defineProps<{ content: NormalizeStringify[] }>()
const emit = defineEmits(['next'])

const target = ref(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (props.content.length > 0 && isIntersecting)
      emit('next')
  },
)

const { width } = useElementSize(target)
const reading = useReadingStore()
const translate = useTranslateStore()
</script>

<template>
  <section h-full p-x-4>
    <div text-left>
      <template v-for="line in content" :key="line.hash">
        <LineSwipe :width="width" :line="line">
          <p
            w="100vw" p-r-8 mt-4
            :style="{ fontSize: `${reading.font.size}px`, lineHeight: `${reading.font.height}px` }"
            v-html="line.origin"
          />
          <div v-if="translate.loading.includes(line.hash)" i-carbon:fade class="rotate" absolute right-0 top-0 />
        </LineSwipe>
        <p
          v-if="line.translate"
          :style="{ fontSize: `${reading.font.size - 2}px`, lineHeight: `${reading.font.height - 2}px` }" text-sm mt-1
        >
          {{ line.translate }}
        </p>
      </template>
    </div>
    <div ref="target" h-5 />
  </section>
</template>

<style scoped>
.rotate {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {

  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(359deg)
  }

}
</style>
