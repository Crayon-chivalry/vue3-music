<template>
  <div v-if="list.length > 0" :class="{'add-padding':musicData.show}">
    <div class="header">
      <img :src="list[0].picUrl" />
      <nav-bar :border="false" bg-color="transparent">
        <template v-slot:left>
          <img src="@/assets/img/common/back2.svg" style="width:30px" />
        </template>
      </nav-bar>
    </div>

    <div class="content">
      <div class="list">
        <div 
          class="item-block"
          :class="[musicData.id == item.id ? 'item-block-active' : '']"
          v-for="item in list" 
          :key="item.id" 
          @click="playMusic(item)"
        >
          <img :src="item.picUrl" />
          <div class="item-block-center">
            <div class="item-block-name">{{ item.name }}</div>
            <div class="item-block-label">
              <span>{{ item.song.album.company }}</span>
              <span>{{ item.song.album.subType }}</span>
              <span>{{ item.song.album.type }}</span>
            </div>
          </div>
          <div class="item-block-right">
            <img src="@/assets/img/music/play-gray.svg" />
            <img src="@/assets/img/music/more-gray.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import { onMounted, reactive, toRefs } from 'vue'

import { getRecommendNewsong, getMusicUrl } from '@/network/music'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: 'recommend',
  components: {
    NavBar
  },
  setup() {
    const { setMusicData, musicData } = useMusicFunctio()
    const state = reactive({
      list: []
    })

    onMounted(async () => {
      let { data } = await getRecommendNewsong()
      state.list = data.result
    })

    // 播放音乐
    const playMusic = async (item) => {
      let { data } = await getMusicUrl(item.id)
      setMusicData({
        id: item.id,
        picUrl: item.picUrl,
        name: item.name,
        singer: item.song.album.subType,
        url: data.data,
        show: true
      })
    }

    return {
      ...toRefs(state),
      musicData,
      playMusic
    }
  }
}
</script>

<style scoped>
.header {
  height: 210px;
  overflow: hidden;
}

.header img {
  width: 100%;
}

.content {
  margin-top: 10px;
  padding: 10px;
}

.item-block {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.item-block-center {
  flex: 1;
  padding: 0 10px;
}

.item-block img {
  width: 40px;
  border-radius: 6px;
}

.item-block-name {
  font-size: 14px;
  margin-bottom: 2px;
}

.item-block-label span {
  font-size: 12px;
  color: gray;
}

.item-block-right img {
  width: 25px;
}

.item-block-right img:first-child {
  margin-right: 10px;
}

.add-padding {
  padding-bottom: 44px;
}

.item-block-active {
  color: var(--main-color) !important;
}

.item-block-active span {
  color: var(--main-color) !important;
}
</style>