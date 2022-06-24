<script lang="ts" setup>
import { toggleDark } from '~/composables/dark'
const [control, toggleControl] = useToggle(false)
const footerRef = ref(null)
onClickOutside(footerRef, (e) => {
  e.stopPropagation()
  toggleControl()
})
</script>

<template>
  <section fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-2 opacity="20" text="#A2A2A2" bg-white>
    <div i-carbon:carbon text-sm @click="() => toggleControl()" />
  </section>
  <Transition>
    <footer
      v-if="control" ref="footerRef" fixed w-full left-0 bottom-0 transform :translate-y="`${control ? '0' : '100%'}`"
      :opacity="`${control ? '100' : '0'}`" z-9 p-t-3 p-b-1 transition-all-300 shadow shadow-current flex
      justify-around bg-white dark:bg-hex-121212 z-2
    >
      <span class="icon-btn" text-center>
        <div i-carbon:settings text-2xl m-a />
        <span text-sm>设置</span>
      </span>
      <span class="icon-btn" text-center @click="() => toggleDark()">
        <div i="carbon-sun dark:carbon-moon" text-2xl m-a />
        <span text-sm>切换</span>
      </span>
      <translate-engine />
    </footer>
  </Transition>
</template>
