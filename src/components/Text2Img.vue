<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
      <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
      'naive-info': 'hello!'
    }"
              :data="{
      'naive-data': 'cool! naive!'
    }"
      >
          <n-button>上传文件</n-button>
      </n-upload>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
