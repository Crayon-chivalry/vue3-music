<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>

  <player />
</template>

<script>
import { provide, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Player from '@/components/main/player/Player'
import Toast from '@/components/common/toast/toast'

export default {
  name: '',
  components: {
    Player,
  },
  setup() {
    provide('Toast', Toast)
    const store = useStore()
    const route = reactive(useRoute())

    // 保持登录状态
    // 暂以 userid 为 已登录
    const userid = localStorage.getItem('userid')
    if(userid) {
      store.commit('setLoginStatus', true)
    }
    
    return {
      route
    }
  },
}
</script>

<style>
@import "~@/assets/css/normalize.css";

/* 全局 css 变量 */
:root {
  --bg-color: #f7f7f7;  /* 背景颜色 */
  --main-color: #456aff;  /* 主色 */
  --assist-color: #ffbd33;  /* 辅色 */
}

body {
  background-color: var(--bg-color);
}
</style>
