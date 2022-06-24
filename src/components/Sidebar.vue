<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
defineProps<{
  catalog: string[]
  navs: string[]
  current: string
}>()
defineEmits(['goto'])
const { open, targetRef, toggleOpen } = useToggleOutside()
</script>

<template>
  <section fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-10 opacity="20" text="#A2A2A2" bg-white>
    <div
      i-carbon:catalog text-sm
      @click="() => toggleOpen()"
    />
  </section>
  <Transition>
    <aside
      v-if="open" ref="targetRef" fixed h-full p-x-2 text-left left-0 top-0 z-9 p-t-3 p-b-1 shadow shadow-current flex
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
  </Transition>
</template>
