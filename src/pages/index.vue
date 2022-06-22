<script setup lang="ts">
import { useEpubOperate } from '~/composables/useEpubOperate'
import { translate } from '~/utils/translate'

const { open, html } = useEpubOperate()

translate({
  origin: '冬の<ruby><rb>主</rb><rt>あるじ</rt></ruby>の<ruby><rb>討伐</rb><rt>とうばつ</rt></ruby>が終わったことで<ruby><rb>吹雪</rb><rt>ふぶき</rt></ruby>が<ruby><rb>止</rb><rt>や</rt></ruby>んだ。久し振りの晴れ間が見えて、<ruby><rb>回廊</rb><rt>かいろう</rt></ruby>はとても明るい。日差しが差し込んだだけで、心まで軽くなるようだ。ランプレヒトはそう感じながら騎士団長室へ急いでいた。',
  hash: '21df345rtrefadsf',
})
</script>

<template>
  <div>
    <button v-if="!html.length" fixed left-0 top-0 w-full h-full bg="" @click="open">
      点击打开
    </button>
  </div>
</template>

<style lang="postcss">
.text-wrap {
  line-height: 30px;

  p {
    text-indent: 2em;
  }
}
</style>
