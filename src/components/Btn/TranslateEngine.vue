<script lang="ts" setup>
import { useTranslate } from '~/composables/useTranslate'

const [dropdown, toggleDropdown] = useToggle(false)
const dropdownRef = ref(null)
onClickOutside(dropdownRef, (e) => {
  e.stopPropagation()
  toggleDropdown()
})

const { current, engine, toggle } = useTranslate()
</script>

<template>
  <div relative inline-block>
    <span class="icon-btn" text-center @click="() => toggleDropdown()">
      <div i-carbon:translate text-2xl ma />
      <span>翻译引擎</span>
    </span>
    <Transition>
      <ul
        v-if="dropdown" ref="dropdownRef" absolute left="50%" top="-5" p="x-4 y-2" bg-white dark:bg-hex-121212 transform translate-y="-100%"
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
