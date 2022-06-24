<script lang="ts" setup>
defineProps<{
  sidebar: boolean
  catalog: string[]
  navs: string[]
  current: string
}>()
defineEmits(['toggle', 'goto'])
</script>

<template>
  <div
    v-show="sidebar" :opacity="`${sidebar ? '5' : '0'}`" fixed w-full h-full bg-black dark:bg-white left-0 top-0 z-1
    @click="$emit('toggle')"
  />
  <aside
    v-if="catalog.length > 0" fixed h-full p-x-2 text-left left-0 top-0 transform
    :translate-x="`${sidebar ? '0' : '-100%'}`" :opacity="`${sidebar ? '100' : '0'}`" z-9 p-t-3 p-b-1 transition-all-300 shadow shadow-current flex
    justify-around bg-white dark:bg-hex-121212 z-2
    overflow-y-scroll
  >
    <ul>
      <li v-for="(item, idx) in catalog" :key="idx" p-y-2 flex items-center :opacity="`${current === item ? '50' : '100'}`">
        <div v-if="navs.includes(item)" i-carbon:paragraph text-sm />
        <span href="javascrip:;" underline p-y-2 @click="$emit('goto', item)">{{ item }}</span>
      </li>
    </ul>
  </aside>
</template>
