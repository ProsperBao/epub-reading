<script lang="ts" setup>
defineProps<{ control: boolean }>()
defineEmits(['toggle'])
</script>

<template>
  <div
    v-if="control" transition-all-300 :opacity="`${control ? '10' : '0'}`" fixed w-full h-full bg-black
    left-0 top-0 z-1 @click="$emit('toggle')"
  />
  <footer
    fixed w-full left-0 bottom-0 transform :translate-y="`${control ? '0' : '100%'}`"
    :opacity="`${control ? '100' : '0'}`" z-9 p-t-3 p-b-1 transition-all-300 shadow shadow-current flex justify-around
    bg-white dark:bg-hex-121212 z-2
  >
    <div text-center opacity-70 hover="opacity-100" active="opacity-100" outline-none>
      <div i-carbon:settings text-2xl m-a />
      <span text-sm>设置</span>
    </div>
  </footer>
</template>
