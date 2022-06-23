<script setup lang="ts">
import { useEpub } from '~/composables/useEpub'

// 读取文件
const { open, data } = useFileSystemAccess({ dataType: 'ArrayBuffer' })
const { html } = useEpub(data)
</script>

<template>
  <div>
    <button v-if="!html.length" fixed left-0 top-0 w-full h-full bg="" @click="() => open">
      点击打开
    </button>
    <content-wrap :content="html" />
  </div>
</template>

<style lang="postcss">
.text-wrap {
  line-height: 30px;

  p {
    text-indent: 2em;
  }
}
</style>
