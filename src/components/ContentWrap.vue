<script lang="ts" setup>
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
</script>

<template>
  <section>
    <div text-left>
      <template v-for="line in content" :key="line.hash">
        <LineSwipe :width="width" :line="line">
          <p opacity-10 w="100vw" p-r-8 mt-4 v-html="line.origin" />
        </LineSwipe>
        <p v-if="line.translate" opacity-5 text-sm mt-1>
          {{ line.translate }}
        </p>
      </template>
    </div>
    <div ref="target" h-5 />
  </section>
</template>
