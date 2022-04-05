<template>
  <div class="home">
    <div class="search">
      <div class="search-input">
        <img src="@/assets/img/common/search.svg" width="20" />
      </div>
    </div>

    <div class="banner">
      <swiper class="home-swiper" :banners="banners"/>
    </div>

    <balls :balls="balls" />

    <level-scroll title="最新单曲">
      <level-scroll-item
        v-for="(item,index) in newSingle" 
        :key="index" 
        :image-url="item.uiElement.image.imageUrl"
        :main-title="item.uiElement.mainTitle.title"
        :sub-title="item.uiElement.subTitle.title"
      />
    </level-scroll>

    <level-scroll title="推荐歌单">
      <level-scroll-item 
        v-for="(item,index) in songSheet" 
        :key="index" 
        :image-url="item.uiElement.image.imageUrl"
        :main-title="item.uiElement.mainTitle.title"
        :sub-title="item.uiElement.subTitle.title"
      />
    </level-scroll>

    <level-scroll title="热门话题">
      <div class="topic-block" v-for="(item,index) in topic" :key="index">
        <div class="topic-item" v-for="(item2,index2) in item" :key="index2">
          <img :src="item2.uiElement.mainTitle.titleImgUrl" width="15" />
          <div class="topic-label">{{ item2.uiElement.mainTitle.title }}</div>
          <img :src="item2.uiElement.labelUrls" width="15" />
          <div class="topic-subTitle">{{ item2.uiElement.subTitle.title }}</div>
        </div>
      </div>
    </level-scroll>

    <level-scroll title="精选视频">
      <level-scroll-item 
        v-for="(item,index) in video" 
        :key="index" 
        :image-url="item.userProfile.avatarUrl"
        :main-title="item.mlogBaseData.originalTitle"
      />
    </level-scroll>

    <tab-bar/>
  </div>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar'
import Swiper from '@/components/swiper/Swiper'
import Balls from '@/components/home/Balls'
import LevelScroll from '@/components/home/LevelScroll'
import LevelScrollItem from '@/components/home/LevelScrollItem'

import { getBanner, getBalls, getPageData } from '@/network/home.js'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'Home',
  components: {
    TabBar,
    Swiper,
    Balls,
    LevelScroll,
    LevelScrollItem
  },
  setup() {
    const state = reactive({
      banners: [],
      balls: [],
      newSingle: [],
      songSheet: [],
      video: [],
      topic: []
    })

    // 取出需要的数据
    function blocksTakeout(data) {
      console.log(data)
      let newSingle = {}
      let songSheet = {}
      let video = {}
      let topic = {}
      data.forEach(item => {
        if(item.blockCode == 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG') {
          newSingle = item
        } else if(item.blockCode == 'HOMEPAGE_BLOCK_PLAYLIST_RCMD') {
          songSheet = item
        } else if(item.blockCode == 'HOMEPAGE_MUSIC_MLOG') {
          video = item
        } else if(item.blockCode == 'HOMEPAGE_BLOCK_HOT_TOPIC') {
          topic = item
        }
      })
      console.log(songSheet)
      newSingle.creatives.forEach(item => {
        if(item.creativeType == 'NEW_SONG_HOMEPAGE') {
          state.newSingle.push(...item.resources)
        }
      })
      songSheet.creatives.forEach(item => {
        state.songSheet.push(...item.resources)
      })
      video.extInfo.forEach(item => {
        if(item.resource.userProfile) {
          state.video.push(item.resource)
        }
      })
      topic.creatives.forEach(item => {
        state.topic.push(item.resources)
      })
      // 模拟多数据
      state.topic.push(state.topic[0])
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
.home {
  padding-bottom: 50px;
}

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

.topic-block {
  width: 100%;
  margin-right: -25px;
  padding: 0 .3125rem;
  flex-shrink: 0;
}

.topic-block:last-child {
  width: 99%;
}


.topic-item {
  display: flex;
  font-size: .9375rem;
  align-items: center;
  padding: .5rem 0;
}

.topic-label {
  width: 50%;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  padding: 0 .3125rem;
}

.topic-subTitle {
  color: gray;
  font-size: .8125rem;
  flex: 1;
  text-align: right;
  padding-right: 1.875rem;
}
</style>