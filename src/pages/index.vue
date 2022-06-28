<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'
import { useFileSelect } from '~/composables/useFileSelect'

const { open, data } = useFileSelect()

const { html, goto, navs, current, next } = useEpub(data)
</script>

<template>
  <div v-if="!html.length" fixed left-0 top-0 w-100vw h-100vh flex items-center justify-center @click="() => open()">
    点击打开
  </div>

  <ContentWrap :content="html" @next="next" />

  <Footer />

  <Sidebar v-if="navs.length > 1" :current="current" :navs="navs" @goto="goto" />

  <TestFunction />
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
