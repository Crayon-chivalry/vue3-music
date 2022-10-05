import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 网页标题
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

const app = createApp(App)

const loadingImg = require("./assets/img/loading.png")
app.use(lazyPlugin, {
  loading: loadingImg,
  error: loadingImg,
})

app.use(VueLoading).use(store).use(router).mount('#app')
