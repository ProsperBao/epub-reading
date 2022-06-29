<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'
import { useFileSelect } from '~/composables/useFileSelect'
import { useGuide } from '~/composables/useGuide'

const { open, data } = useFileSelect()

const { html, goto, navs, current, next } = useEpub(data)

useGuide('main')
</script>

<template>
  <div v-if="!html.length" fixed left-0 top-0 w-100vw h-100vh flex items-center justify-center @click="() => open()">
    点击打开
  </div>

  <ContentWrap v-if="html.length > 0" :content="html" @next="next" />

  <Footer />

  <Sidebar :current="current" :navs="navs" @goto="goto" />
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
