<script setup lang="ts">
import { useEpubOperate } from '~/composables/useEpubOperate'
import { translate } from '~/utils/translate'

const { open, html } = useEpubOperate()

translate()
</script>

<template>
  <div>
    <button v-if="!html.length" fixed left-0 top-0 w-full h-full bg="" @click="open">
      点击打开
    </button>
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
