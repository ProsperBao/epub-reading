<script lang="ts" setup>
import type { NormalizeStringify } from '~/utils/epub'
import { translate } from '~/utils/translate'
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
</script>

<template>
  <section>
    <div text-left>
      <template v-for="line in content" :key="line.hash">
        <p opacity-5 mt-4 @click="translate(line)" v-html="line.origin" />
        <p v-if="line.translate" opacity-5 text-sm mt-1>
          {{ line.translate }}
        </p>
      </template>
    </div>
    <div ref="target" h-5 bg-blue />
  </section>
</template>
