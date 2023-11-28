<template>
  <div class="container">
    <n-space vertical>
            <n-space>
              <n-button @click="compare">对比</n-button>
            </n-space>
      <n-card>
        <n-input
            v-model:value="textA"
            type="textarea"
            placeholder=""
        />
      </n-card>
      <n-card>
        <n-input
            v-model:value="textB"
            type="textarea"
            placeholder=""
        />
      </n-card>
      <n-card v-if="result">
        <div class="result">
          <span
              v-for="(item, index) in result"
              :key="index"
              :style="getStyle(item[0])">
            {{ item[1] }}
          </span>
        </div>
      </n-card>
    </n-space>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue'
import diff from "fast-diff";

export default defineComponent({
      setup() {

        const textA = ref('在一个美丽的小镇上，住着一位善良的老妇人。她有一个漂亮的花园，花园里种满了她最喜欢的花朵。每天，她都会花很多时间照顾这些花朵，浇水、施肥、修剪枝叶。她的花园里的花朵总是开得最旺，颜色最艳，香气最浓。邻居们都羡慕她的花园，但她总是笑着说，这些花朵就像她的孩子一样，她只是尽力去照顾它们，让它们开得更美。')
        const textB = ref('在一个宁静的乡村里，住着一位和蔼的老爷爷。他有一个巨大的果园，果园里种满了他最爱的苹果树。每天，他都会花很多精力照顾这些苹果树，浇水、施肥、修剪枝叶。他的果园里的苹果总是长得最大，颜色最亮，味道最甜。村民们都羡慕他的果园，但他总是笑着说，这些苹果树就像他的孩子一样，他只是尽力去照顾它们，让它们长得更好。')


        const result = ref(null)

        const compare = () => {
          result.value = diff(textA.value, textB.value);
          console.log(result.value);
        }

        const getStyle = (type) => {
          switch (type) {
            case diff.INSERT:
              return {backgroundColor: 'green',color: 'white'};
            case diff.DELETE:
              return {backgroundColor: 'red',color: 'white',textDecoration: 'line-through'};
            default:
              return {};
          }
        };

        return {
          compare,
          getStyle,
          textA,
          textB,
          result,
        }
      }
    }
)
;
</script>

<style scoped>
</style>