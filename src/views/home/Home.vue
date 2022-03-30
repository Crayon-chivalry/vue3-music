<template>
  <div>
    <div class="search">
      <div class="search-input">
        <img src="@/assets/img/common/search.svg" width="20" />
      </div>
    </div>

    <div class="banner">
      <Swiper class="home-swiper" :banners="banners"/>
    </div>

    <Balls :balls="balls" />

    <TabBar/>
  </div>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar'
import Swiper from '@/components/swiper/Swiper'
import Balls from '@/components/home/Balls'

import { getBanner, getBalls, getPageData } from '@/network/home.js'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'Home',
  components: {
    TabBar,
    Swiper,
    Balls
  },
  setup() {
    const state = reactive({
      banners: [],
      balls: []
    })

    // 取出需要的数据
    function blocksTakeout(data) {
      console.log(data)
    }

    onMounted(async () => {
      // 轮播图数据
      let {data: {banners}} = await getBanner()
      state.banners = banners
      // 首页圆形图标入口列表
      let {data: balls} = await getBalls()
      state.balls = balls.data
      // 首页信息数据
      let {data: blocks} = await getPageData()
      blocks = blocks.data.blocks
      // 取出需要的数据
      blocksTakeout(blocks)
      console.log(state)
    })

    return {
      ...toRefs(state)
    }
  },
  methods: {}
}
</script>

<style scoped>
.search {
  height: 1.875rem;
  padding: .625rem;
}

.search-input {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 .625rem;
  background-color: #fff;
  border-radius: 99rem;
}

.banner {
  padding: .625rem;
}

.home-swiper {
  border-radius: .625rem;
  overflow: hidden;
}
</style>