<template>
  <div class="home" :class="{'add-padding':musicData.show}">
    <div class="search" @click="tolink('search')">
      <div class="search-input">
        <img src="@/assets/img/common/search.svg" width="20" />
      </div>
    </div>

    <div class="banner">
      <swiper class="home-swiper" :banners="banners"/>
    </div>

    <home-quick />

    <level-scroll title="最新单曲">
      <div class="grid-item" v-for="(item,index) in newSingle" :key="index" @click="playMusic(item)">
        <img v-lazy="item.uiElement.image.imageUrl" />
        <div class="main-title">{{ item.uiElement.mainTitle.title }}</div>
        <div class="sub-title">{{ item.uiElement.subTitle.title }}</div>
      </div>
    </level-scroll>

    <level-scroll title="推荐歌单">
      <div 
        class="grid-item" 
        v-for="(item,index) in songSheet" 
        :key="index" 
        @click="tolink('song-sheet-details?id=' + item.resourceId)"
      >
        <img v-lazy="item.uiElement.image.imageUrl" />
        <div class="main-title">{{ item.uiElement.mainTitle.title }}</div>
        <!-- <div class="sub-title" v-if="item.uiElement.subTitle">{{ item.uiElement.subTitle.title }}</div> -->
      </div>
    </level-scroll>

    <level-scroll title="热门话题" ele-class="topic-block" :length="topic.length" :swiper="true">
      <div class="topic-block" v-for="(item,index) in topic" :key="index">
        <div class="topic-item" v-for="(item2,index2) in item" :key="index2">
          <img src="@/assets/img/common/topic.svg" width="15" />
          <div class="topic-label">{{ item2.uiElement.mainTitle.title }}</div>
          <img :src="item2.uiElement.labelUrls" width="15" />
          <div class="topic-subTitle">{{ item2.uiElement.subTitle.title }}</div>
        </div>
      </div>
    </level-scroll>

    <level-scroll title="精选视频">
      <div class="grid-item" v-for="(item,index) in video" :key="index">
        <img v-lazy="item.userProfile.avatarUrl" />
        <div class="main-title">{{ item.mlogBaseData.originalTitle }}</div>
      </div>
    </level-scroll>

    <tab-bar />
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import Swiper from '@/components/common/swiper/Swiper'
import HomeQuick from './childcompd/HomeQuick'
import LevelScroll from '@/components/main/levelscroll/LevelScroll'

import { getBanner, getBalls, getPageData } from '@/network/home.js'
import { getMusicUrl, getMusicDetails } from '@/network/music.js'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: 'home',
  components: {
    TabBar,
    Swiper,
    HomeQuick,
    LevelScroll,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      banners: [],
      balls: [],
      newSingle: [],
      songSheet: [],
      video: [],
      topic: []
    })
    const { setMusicData, musicData } = useMusicFunctio()

    // 取出需要的数据
    function blocksTakeout(data) {
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

    // 播放音乐
   const playMusic = async (item) => {
      let {data} = await getMusicUrl(item.resourceId)
      let details = await getMusicDetails(item.resourceId)
      let picUrl = details.data.songs[0].al.picUrl
      setMusicData({
        id: item.resourceId,
        picUrl: picUrl,
        name: item.uiElement.mainTitle.title,
        singer: item.resourceExtInfo.artists[0].name,
        url: data.data,
        show: true
      })
    }

    function tolink(path) {
      router.push(path)
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
    })

    return {
      ...toRefs(state),
      musicData,
      playMusic,
      tolink
    }
  },
  methods: {}
}
</script>

<style scoped>
.home {
  padding-bottom: 50px;
}

.add-padding {
  padding-bottom: 94px;
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

.grid-item {
  width: 28%;
  padding: 0 .3125rem;
  flex-shrink: 0;
}

.grid-item img {
  width: 100%;
  border-radius: .625rem;
}

.main-title {
  font-size: .875rem;
  color: #333;
  font-weight: 600;
  margin: .25rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.sub-title {
  font-size: 12px;
  color: gray;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
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