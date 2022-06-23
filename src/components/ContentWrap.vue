<script lang="ts" setup>
import type { NormalizeStringify } from '~/utils/epub'

defineProps<{ content: NormalizeStringify[] }>()
</script>

<template>
  <section>
    <div text-left>
      <template v-for="line in content" :key="line.hash">
        <p mt-4 v-html="line.origin" />
        <p v-if="line.translate" text-sm mt-1>
          {{ line.translate }}
        </p>
      </template>
    </div>
  </section>
</template>
