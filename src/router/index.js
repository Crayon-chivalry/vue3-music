import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      title: "首页",
      keepAlive: true,
      // 是否显示播放器
      player: true,
      index: 1
    }
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/mv/Mv.vue'),
    meta: {
      title: "mv",
      player: false,
      index: 1
    }
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/forum/Forum.vue'),
    meta: {
      title: "社区",
      player: true,
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    meta: {
      title: "我的",
      player: true,
      index: 1
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: "注册",
      keepAlive: false,
      index: 3
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: "登录",
      keepAlive: false,
      index: 2
    }
  },
  {
    path: '/music-details',
    name: 'music-details',
    component: () => import('@/views/music/MusicDetails.vue'),
    meta: {
      title: "music",
      keepAlive: false,
      player: true,
      index: 2
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend/Recommend.vue'),
    meta: {
      title: "每日推荐",
      keepAlive: true,
      player: true,
      index: 2
    }
  },
  {
    path: '/song-sheet',
    name: 'song-sheet',
    component: () => import('@/views/songSheet/SongSheet.vue'),
    meta: {
      title: "歌单广场",
      keepAlive: true,
      player: true,
      index: 2
    }
  },
  {
    path: '/song-sheet-details',
    name: 'song-sheet-details',
    component: () => import('@/views/songSheet/SongSheetDetails.vue'),
    meta: {
      title: "歌单详情",
      keepAlive: false,
      player: true,
      index: 3
    }
  },
  {
    path: '/ranking-list',
    name: 'ranking-list',
    component: () => import('@/views/rankingList/RankingList.vue'),
    meta: {
      title: "排行榜",
      keepAlive: true,
      player: true,
      index: 2
    }
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('@/views/album/Album.vue'),
    meta: {
      title: "数字专辑",
      keepAlive: true,
      player: true,
      index: 2
    }
  },
  {
    path: '/album-sales-list',
    name: 'album-sales-list',
    component: () => import('@/views/album/AlbumSalesList.vue'),
    meta: {
      title: "畅销榜",
      keepAlive: true,
      player: true,
      index: 3
    }
  },
  {
    path: '/album-area-list',
    name: 'album-area-list',
    component: () => import('@/views/album/AlbumAreaList.vue'),
    meta: {
      title: "语种风格馆",
      keepAlive: true,
      player: true,
      index: 3
    }
  },
  {
    path: '/album-buy',
    name: 'album-buy',
    component: () => import('@/views/album/AlbumBuy.vue'),
    meta: {
      title: "已购",
      keepAlive: false,
      player: true,
      index: 3
    }
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/singer/Singer.vue'),
    meta: {
      title: "歌手",
      keepAlive: true,
      player: true,
      index: 2
    }
  },
  {
    path: '/singer-songs',
    name: 'singer-songs',
    component: () => import('@/views/singer/SingerSongs.vue'),
    meta: {
      title: "歌手歌曲",
      keepAlive: false,
      player: true,
      index: 3
    }
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('@/views/user/UserInfo.vue'),
    meta: {
      title: "我的资料",
      keepAlive: false,
      player: false,
      index: 2
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue'),
    meta: {
      title: "搜索",
      keepAlive: false,
      player: false,
      index: 2
    }
  },
  {
    path: '/search-result',
    name: 'search-result',
    component: () => import('@/views/search/SearchResult.vue'),
    meta: {
      title: "搜索",
      keepAlive: false,
      player: true,
      index: 3
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
