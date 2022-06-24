<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'
import { useFileSelect } from '~/composables/useFileSelect'

const [sidebar, toggleSidebar] = useToggle(false)

const { open, data } = useFileSelect()

const { html, catalog, goto, navs, current } = useEpub(data)
</script>

<template>
  <div v-if="!html.length" fixed left-0 top-0 w-100vw h-100vh flex items-center justify-center @click="() => open()">
    点击打开
  </div>

  <section v-if="catalog.length > 0" fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-10 opacity="20" text="#A2A2A2" bg-white>
    <div
      i-carbon:catalog text-sm
      @click="() => toggleSidebar()"
    />
  </section>

  <ContentWrap :content="html" />

  <Footer />

  <Sidebar :catalog="catalog" :current="current" :navs="navs" :sidebar="sidebar" @toggle="toggleSidebar" @goto="goto" />
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
