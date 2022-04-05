import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/mv/Mv.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/forum/Forum.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/User.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
