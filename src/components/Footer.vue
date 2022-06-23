<script lang="ts" setup>
import { toggleDark } from '~/composables/dark'
defineProps<{ control: boolean }>()
defineEmits(['toggle'])
</script>

<template>
  <div
    v-show="control" :opacity="`${control ? '5' : '0'}`" fixed w-full h-full bg-black dark:bg-white left-0 top-0 z-1
    @click="$emit('toggle')"
  />
  <footer
    fixed w-full left-0 bottom-0 transform :translate-y="`${control ? '0' : '100%'}`"
    :opacity="`${control ? '100' : '0'}`" z-9 p-t-3 p-b-1 transition-all-300 shadow shadow-current flex justify-around
    bg-white dark:bg-hex-121212 z-2
  >
    <span class="icon-btn" text-center>
      <div i-carbon:settings text-2xl m-a />
      <span text-sm>设置</span>
    </span>
    <span class="icon-btn" text-center @click="() => toggleDark()">
      <div i="carbon-sun dark:carbon-moon" text-2xl m-a />
      <span text-sm>切换</span>
    </span>
  </footer>
</template>
