import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/Mv',
    name: 'Mv',
    component: () => import('@/views/mv/Mv.vue')
  },
  {
    path: '/Forum',
    name: 'Forum',
    component: () => import('@/views/forum/Forum.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('@/views/user/User.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
