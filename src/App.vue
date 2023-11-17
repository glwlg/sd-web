<script setup>
</script>

<template>
  <router-link to="/">
    <n-button v-if="$route.path !== '/'">返回首页</n-button>
  </router-link>
  <n-divider />
  <router-view></router-view>
</template>

