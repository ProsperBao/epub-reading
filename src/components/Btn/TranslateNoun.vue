<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
import { useUniqueNounStore } from '~/stores'
const { open, targetRef, toggleOpen } = useToggleOutside()

const nounStore = useUniqueNounStore()
const active = ref<string>(nounStore.use[0])
</script>

<template>
  <div relative inline-block>
    <button class="btn" @click="() => toggleOpen()">
      配置特有名词
    </button>
    <Transition>
      <section
        v-if="open" ref="targetRef" fixed class="theme-wrap" bottom-0 left-0 w-full z-3 pb-4 p-2 shadow
        shadow-current
      >
        <nav flex gap-2 overflow-x-scroll>
          <button
            v-for="noun in Object.keys(nounStore.list)" :key="noun" class="btn" transition-all-300 shrink-0
            :class="{ active: noun === active }" @click="active = noun"
          >
            {{ noun }}
          </button>
        </nav>
        <div mt-2>
          <table w-full text-center>
            <tr>
              <td border w="50%" p-1>
                名词
              </td>
              <td border w="50%" p-1>
                翻译
              </td>
            </tr>
          </table>
          <div h-50 overflow-y-scroll>
            <table w-full text-center border-t-none>
              <tr v-for="noun in nounStore.list[active]" :key="noun[0]">
                <td border border-t-none w="50%">
                  <input v-model="noun[0]" w-full outline-none p-x-2 type="text">
                </td>
                <td border border-t-none w="50%">
                  <input v-model="noun[1]" w-full outline-none p-x-2 type="text">
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.btn.active {
  background: var(--theme-color);
  color: var(--theme-background);
}
</style>
