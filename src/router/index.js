import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      title: "首页",
    }
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/mv/Mv.vue'),
    meta: {
      title: "mv",
    }
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/forum/Forum.vue'),
    meta: {
      title: "社区",
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    meta: {
      title: "首页",
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: "注册",
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: "登录",
    }
  },
  {
    path: '/music-details',
    name: 'music-details',
    component: () => import('@/views/music/MusicDetails.vue'),
    meta: {
      title: "music",
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend/Recommend.vue'),
    meta: {
      title: "每日推荐",
    }
  },
  {
    path: '/song-sheet',
    name: 'song-sheet',
    component: () => import('@/views/songSheet/SongSheet.vue'),
    meta: {
      title: "歌单广场",
    }
  },
  {
    path: '/song-sheet-details',
    name: 'song-sheet-details',
    component: () => import('@/views/songSheet/SongSheetDetails.vue'),
    meta: {
      title: "歌单详情",
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
