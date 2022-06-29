<script lang="ts" setup>
import type { NavItem } from 'epubjs'
import { useToggleOutside } from '~/composables/useToggleOutside'
defineProps<{
  navs: [NavItem, string[]][]
  current: string
}>()
defineEmits(['goto'])

const { open, targetRef, toggleOpen } = useToggleOutside(() => {
  // 滚动到 li[catalog=true] 的位置
  nextTick(() => {
    console.log(document.querySelector('li[catalog=true]'))
    document.querySelector('li[catalog=true]')
      ?.scrollIntoView({ behavior: 'smooth' })
  })
})
</script>

<template>
  <section id="guide-main-2" fixed left-0 w="10vw" top-0 h="100vh" @click="() => navs.length > 0 && toggleOpen()" />
  <Transition>
    <aside
      v-if="open" ref="targetRef" fixed h-full p-x-2 text-left left-0 top-0 z-9 p-t-3 p-b-1 shadow shadow-current
      flex justify-around class="theme-wrap" z-2 overflow-y-scroll
    >
      <ul w-30vw>
        <li v-for="([navItem, children], navIdx) in navs" :key="navIdx" p-y-2>
          <div underline p-y-2 @click="$emit('goto', navItem.href)">
            {{ navItem.label }}
          </div>
          <ul m-l-4 inline-block w-20vw>
            <li
              v-for="(item, idx) in children" :key="idx" inline-block :catalog="current === item" :opacity="`${current === item ? '50' : '100'}`"
              @click="$emit('goto', item)"
            >
              第 {{ idx + 1 }} 小节
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </Transition>
</template>
