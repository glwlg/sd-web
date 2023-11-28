<script setup>
</script>

<template>
  <div class="container">

    <n-space vertical>
      <n-card>
        <div class="placeholder">
          <router-link to="/img2img">
            <p style="font-size: 4vh;">AI照片</p>

          </router-link>
        </div>
      </n-card>
<!--      <n-card>-->
<!--        <div class="placeholder">-->
<!--          <router-link to="/text2img">-->
<!--            <p style="font-size: 3.5vh;">AI文字生成照片</p>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </n-card>-->
      <n-card>
        <div class="placeholder">
          <router-link to="/worddiff">
            <p style="font-size: 4vh;">文本对比</p>
          </router-link>
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<style scoped>

</style>
