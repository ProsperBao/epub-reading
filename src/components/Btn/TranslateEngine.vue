<script lang="ts" setup>
import { useTranslate } from '~/composables/useTranslate'

import { useToggleOutside } from '~/composables/useToggleOutside'
const { open, targetRef, toggleOpen } = useToggleOutside()

const { current, engine, toggle } = useTranslate()
</script>

<template>
  <div relative inline-block>
    <span class="icon-btn" w-18 text-center @click="() => toggleOpen()">
      <div i-carbon:translate text-2xl ma />
      <span>翻译引擎</span>
    </span>
    <Transition>
      <ul
        v-if="open" ref="targetRef" shadow shadow-neutral-3 shadow-current absolute left="50%" top="-5" p="x-4 y-2" class="theme-wrap" transform translate-y="-100%"
        translate-x="-50%" z-10
      >
        <li v-for="key in engine.keys()" :key="key" flex items-center gap-2 @click="toggle(key)">
          <div v-if="key === current" i-carbon:circle-filled />
          <div v-else i-carbon:circle-dash />
          <span truncate>{{ engine.get(key) }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>
