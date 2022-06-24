<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'
import { useFileSelect } from '~/composables/useFileSelect'

const { open, data } = useFileSelect()

const { html, catalog, goto, navs, current } = useEpub(data)
</script>

<template>
  <div v-if="!html.length" fixed left-0 top-0 w-100vw h-100vh flex items-center justify-center @click="() => open()">
    点击打开
  </div>

  <ContentWrap :content="html" />

  <Footer />

  <Sidebar v-if="catalog.length > 0" :catalog="catalog" :current="current" :navs="navs" @goto="goto" />
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
