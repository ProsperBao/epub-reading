<script lang="ts" setup>
import { useToggleOutside } from '~/composables/useToggleOutside'
import { useUniqueNounStore } from '~/stores'
const { open, targetRef, toggleOpen } = useToggleOutside()

const nounStore = useUniqueNounStore()
const active = ref<string>(nounStore.use[0])

function addCurrentNoneLine() {
  nounStore.list[active.value].push(['', ''])
  nextTick(() => document.querySelector(`tr[idx="${nounStore.list[active.value].length - 1}"]`)
    ?.scrollIntoView({ behavior: 'smooth' }))
}
function removeCurrentNoneLine(idx: number) {
  nounStore.list[active.value].splice(idx, 1)
}
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
              <td border w="45%" p-1>
                名词
              </td>
              <td border w="45%" p-1>
                翻译
              </td>
              <td border w="10%" p-1 />
            </tr>
          </table>
          <div h-50 overflow-y-scroll>
            <table w-full text-center border-t-none>
              <tr v-for="(noun, idx) in nounStore.list[active]" :key="noun[0]" :idx="idx">
                <td border border-t-none w="45%">
                  <input v-model="noun[0]" w-full outline-none p-x-2 type="text" placeholder="修改名词">
                </td>
                <td border border-t-none w="45%">
                  <input v-model="noun[1]" w-full outline-none p-x-2 type="text" placeholder="修改翻译">
                </td>
                <td border border-t-none w="45%">
                  <div i-carbon-trash-can m-x-auto @click="removeCurrentNoneLine(idx)" />
                </td>
              </tr>
            </table>
          </div>
          <button w-full mt-2 text-center border border-rd @click="addCurrentNoneLine">
            + 添加
          </button>
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
