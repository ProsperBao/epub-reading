<script setup lang="ts">
import { useEpubOperate } from '~/composables/useEpubOperate'

const { readEpub } = useEpubOperate()
</script>

<template>
  <div>
    <button @click="readEpub">
      Click
    </button>
    <div id="book" />
  </div>
</template>
