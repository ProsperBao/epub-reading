<script lang="ts" setup>
import { MD5 } from 'crypto-js'
import { translate } from '~/utils/translate'
const text = ref('')
const t = async () => {
  console.log(await translate({
    origin: text.value,
    hash: MD5(text.value).toString().substring(0, 20),
  }))
}
</script>

<template>
  <div fixed top-0 left-0 w-full p-4>
    <input v-model="text" border type="text">
    <button @click="t">
      translate
    </button>
  </div>
</template>
