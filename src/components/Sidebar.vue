<script lang="ts" setup>
import type { NavItem } from 'epubjs'
import { useToggleOutside } from '~/composables/useToggleOutside'
defineProps<{
  navs: [NavItem, string[]][]
  current: string
}>()
defineEmits(['goto'])

const { open, targetRef, toggleOpen } = useToggleOutside()
</script>

<template>
  <section fixed b="0.5" p-y-1 p-x-1 b-rd-r-5 left="-1" top-10 opacity="20" text="#A2A2A2" bg-white>
    <div i-carbon:catalog text-sm @click="() => toggleOpen()" />
  </section>
  <Transition>
    <aside
      v-if="open" ref="targetRef" fixed h-full p-x-2 text-left left-0 top-0 z-9 p-t-3 p-b-1 shadow shadow-current
      flex justify-around bg-white dark:bg-hex-121212 z-2 overflow-y-scroll
    >
      <ul w-30vw>
        <li v-for="([navItem, children], navIdx) in navs" :key="navIdx" p-y-2>
          <div underline p-y-2 @click="$emit('goto', navItem.href)">
            {{ navItem.label }}
          </div>
          <ul m-l-4 inline-block w-20vw>
            <li v-for="(item, idx) in children" :key="idx" inline-block :opacity="`${current === item ? '50' : '100'}`" @click="$emit('goto', item)">
              第 {{ idx + 1 }} 小节
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </Transition>
</template>
