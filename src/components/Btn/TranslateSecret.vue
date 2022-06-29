<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
import type { EngineConfig, TranslateEngine } from '~/stores'
import { TRANSLATE_ENGINE, useTranslateStore } from '~/stores'

const { open, targetRef, toggleOpen } = useToggleOutside()
const translateStore = useTranslateStore()

const active = ref<TranslateEngine>('youdao')

const engine = computed({
  get: () => translateStore[active.value] as EngineConfig,
  set: (val) => {
    Object.assign(translateStore[active.value], val)
  },
})
</script>

<template>
  <button class="btn" @click="() => toggleOpen()">
    配置翻译密钥
  </button>
  <Transition>
    <section
      v-if="open" ref="targetRef" fixed class="theme-wrap" bottom-0 left-0 w-full z-3 pb-4 p-2 shadow shadow-current
    >
      <h5 text-left font-600 pl-2 pt-2 pb-2>
        翻译密钥管理
      </h5>
      <nav flex justify-around>
        <button v-for="engine in TRANSLATE_ENGINE" :key="engine" class="btn" transition-all-300 :class="{ active: engine === active }" @click="active = engine">
          {{ engine }}
        </button>
      </nav>
      <section p="x-3 t-3">
        <div flex gap-2 items-center>
          <label w-18>应用ID: </label>
          <input v-model="engine.appid" type="text" p="x-4 y-1" w-full border rd>
        </div>
        <div flex gap-2 items-center mt-3>
          <label w-25>应用密钥: </label>
          <input v-model="engine.secret" type="password" p="x-4 y-1" w-full border rd>
        </div>
        <div flex gap-2 items-center mt-3>
          <label w-25>替换插槽: </label>
          <input v-model="engine.slot" type="text" p="x-4 y-1" w-full border rd>
        </div>
        <div flex gap-2 items-center mt-3>
          <label w-25>匹配正则: </label>
          <input v-model="engine.slotRegex" type="text" p="x-4 y-1" w-full border rd>
        </div>
      </section>
    </section>
  </Transition>
</template>

<style lang="postcss" scoped>
.btn.active {
    background: var(--theme-color);
  color: var(--theme-background);
}
</style>
