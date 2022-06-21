<script setup lang="ts">
import { useEpubOperate } from '~/composables/useEpubOperate'

const { open, html } = useEpubOperate()
</script>

<template>
  <div>
    <button @click="open">
      Click
    </button>
    <div class="text-wrap" v-html="html" />
  </div>
</template>

<style lang="postcss">
.text-wrap {
  line-height: 30px;

  .top-mark {
    position: relative;
  }

  .top-mark::after {
    content: attr(data-mark);
    white-space: nowrap;
  }

  p {
    text-indent: 2em;
  }
}
</style>
