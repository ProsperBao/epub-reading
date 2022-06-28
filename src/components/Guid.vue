<script lang="ts" setup>
import { useReadingStore } from '~/stores'
const reading = useReadingStore()
const guid = [
  'https://pic.jitudisk.com/public/2022/06/28/8ce6ede99a7ad.png',
  'https://pic.jitudisk.com/public/2022/06/28/6160695c00dca.png',
  'https://pic.jitudisk.com/public/2022/06/28/1382e5bf599e6.png',
  'https://pic.jitudisk.com/public/2022/06/28/709dcc1f3dfad.png',
  'https://pic.jitudisk.com/public/2022/06/28/bc9c1cff1dd9a.png',
  'https://pic.jitudisk.com/public/2022/06/28/c4599d319533d.png',
]
const step = ref(0)
</script>

<template>
  <section v-if="!reading.guid" fixed z-20 left-0 top-0 w-100vw h-100vh @click="step === guid.length - 1 ? (reading.guid = true) : step++">
    <img w-100vw h-100vh :src="guid[step]" alt="guid">
  </section>
</template>
