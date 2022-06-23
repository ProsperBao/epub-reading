<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'
import { useFileSelect } from '~/composables/useFileSelect'

const [control, toggleControl] = useToggle(false)
const [sidebar, toggleSidebar] = useToggle(false)

const { open, data } = useFileSelect()

const { html, catalog, goto, navs } = useEpub(data)
</script>

<template>
  <div>
    <button v-if="!html.length" fixed left-0 top-0 w-full h-full bg="" @click="() => open()">
      点击打开
    </button>

    <section fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-2 opacity="20" text="#A2A2A2" bg-white>
      <div
        i-carbon:carbon text-sm
        @click="() => toggleControl()"
      />
    </section>
    <section v-if="catalog.length > 0" fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-10 opacity="20" text="#A2A2A2" bg-white>
      <div
        i-carbon:catalog text-sm
        @click="() => toggleSidebar()"
      />
    </section>

    <content-wrap :content="html" />

    <Footer :control="control" @toggle="toggleControl" />
    <Sidebar :catalog="catalog" :navs="navs" :sidebar="sidebar" @toggle="toggleSidebar" @goto="goto" />
  </div>
</template>
