<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'

const [control, toggleControl] = useToggle(false)

const { open, data } = useFileSystemAccess({ dataType: 'ArrayBuffer' })

const { html } = useEpub(data)
</script>

<template>
  <div>
    <button v-if="!html.length" fixed left-0 top-0 w-full h-full bg="" @click="() => open()">
      点击打开
    </button>

    <section fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-5 opacity="50" transition-all-300 text="#A2A2A2" active="opacity-100" bg-white>
      <div
        i-carbon:carbon text-xl
        @click="() => toggleControl()"
      />
    </section>

    <content-wrap :content="html" />

    <Footer :control="control" @toggle="toggleControl" />
  </div>
</template>
