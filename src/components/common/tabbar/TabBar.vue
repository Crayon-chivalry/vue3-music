<template>
  <div class="tabs">
    <div class="tabs-wrap">
      <router-link class="tabs-item" :class="{'active':fullPath == '/' }" to="/">
        <img src="@/assets/img/tabbar/home-active.svg" width="24" v-show="fullPath == '/'" />
        <img src="@/assets/img/tabbar/home.svg" width="24" v-show="fullPath != '/'" />
        <div>首页</div>
      </router-link>
      <router-link class="tabs-item" :class="{'active':fullPath == '/mv' }" to="/mv">
        <img src="@/assets/img/tabbar/mv-active.svg" width="24" v-show="fullPath == '/mv'" />
        <img src="@/assets/img/tabbar/mv.svg" width="24" v-show="fullPath != '/mv'" />
        <div>MV</div>
      </router-link>
      <router-link class="tabs-item" :class="{'active':fullPath == '/forum' }" to="/forum">
        <img src="@/assets/img/tabbar/forum-active.svg" width="24" v-show="fullPath == '/forum'" />
        <img src="@/assets/img/tabbar/forum.svg" width="24" v-show="fullPath != '/forum'" />
        <div>社区</div>
      </router-link>
      <router-link class="tabs-item" :class="{'active':fullPath == '/user' }" to="/user">
        <img src="@/assets/img/tabbar/user-active.svg" width="24" v-show="fullPath == '/user'" />
        <img src="@/assets/img/tabbar/user.svg" width="24" v-show="fullPath != '/user'" />
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'TabBar',
  components: {
  },
  setup() {
    // 获取当前路由
    const route = useRoute()
    const fullPath = route.fullPath

    return {
      fullPath
    }
  },
  methods: {}
}
</script>

<style scoped>
.tabs {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: .8125rem;
}

.tabs-wrap {
  height: 3.125rem;
  display: flex;
  align-items: center;
}

.tabs-item {
  flex: 1;
  text-align: center;
  color: #000;
  text-decoration: none;
}

.active {
  color: var(--main-color);
}
</style>