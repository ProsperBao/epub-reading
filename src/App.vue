<script  lang="ts" setup>
import { vScrollLock } from '@vueuse/components'
import { useReadingStore } from './stores'
const reading = useReadingStore()
</script>

<template>
  <main v-scroll-lock="reading.lockScroll" font-sans w-100vw h-100vh overflow-x-hidden text="center gray-700 dark:gray-200">
    <StarportCarrier>
      <RouterView />
    </StarportCarrier>
  </main>
</template>
