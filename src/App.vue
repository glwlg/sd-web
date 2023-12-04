<script>

import {darkTheme} from 'naive-ui'
import {defineComponent} from "vue";

export default defineComponent({
  setup() {
    /**
     * js 文件下使用这个做类型提示
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      common: {
        cardColor:'#242527',
        primaryColor: '#ba0000',
        primaryColorHover: '#ba0000',
        progressRailColor: '#ba0000',
        scrollbarColor: '#ba0000',
      },
      Slider:{
        fillColor: '#b30000',
        fillColorHover: '#ba0000',
      }
    }
    return {
      darkTheme,
      themeOverrides
    }
  }
})

</script>

<template>
  <!--  <div v-if="$route.path !== '/'">-->
  <!--    <router-link to="/">-->
  <!--      <n-button>返回首页</n-button>-->
  <!--    </router-link>-->
  <!--    <n-divider/>-->
  <!--  </div>-->
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <n-message-provider>

      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

