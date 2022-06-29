<script lang="ts" setup>
import { toggleDark } from '~/composables/dark'
import { useToggleOutside } from '~/composables/useToggleOutside'
const { open, targetRef, toggleOpen } = useToggleOutside()
</script>

<template>
  <section id="guide-main-1" fixed right-0 w="10vw" top-0 h="100vh" @click.stop="() => toggleOpen()" />
  <Transition>
    <footer
      v-if="open" ref="targetRef" fixed w-full left-0 bottom-0
      z-9 p-t-3 p-b-1 transition-all-300 shadow shadow-current flex
      justify-around class="theme-wrap"
    >
      <Setting />
      <span class="icon-btn" w-18 text-center @click.stop="() => toggleDark()">
        <div i="carbon-sun dark:carbon-moon" text-2xl m-a />
        <span text-sm>切换</span>
      </span>
      <TranslateEngine />
    </footer>
  </Transition>
</template>
