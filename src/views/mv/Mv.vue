<template>
  <div class="mv">
    <div class="video-content">
      <div class="video-item" v-for="item in list" :key="item.id">
        <div class="video-name">
          {{ item.artistName }}
          <div class="video-label">{{ item.briefDesc }}</div>
        </div>
        <div class="video-cover" v-if="!item.playState" @click="play(item.id)">
          <img :src="item.cover" />
          <img class="video-play-icon" src="@/assets/img/mv/video-play.svg" />
        </div>
        <div v-else>
          <videos :url="url" />
        </div>
        <div class="video-footer">
          <div>
            <img src="@/assets/img/mv/video-footer1.svg" />
            分享
          </div>
          <div>
            <img src="@/assets/img/mv/video-footer2.svg" />
            0
          </div>
          <div>
            <img src="@/assets/img/mv/video-footer3.svg" />
            0
          </div>
          <div>
            <img src="@/assets/img/mv/video-footer4.svg" />
            收藏
          </div>
        </div>
      </div>
    </div>

    <tab-bar/>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import Videos from '@/components/main/videos/Videos'

import { getAllMv, getMvUrl } from '@/network/mv.js'

import { onMounted, reactive, toRefs } from 'vue'

import useMusicFunction from '@/use/useMusic'

export default {
  name: '',
  components: {
    TabBar,
    Videos
  },
  setup() {
    const { pause } = useMusicFunction()
    const state = reactive({
      list: [],
      url: ""
    })

    const getAll = async () => {
      let { data } = await getAllMv(0)
      let list = data.data
      list.forEach(item => {
        item.playState = false
      })
      state.list = list
    }

    onMounted(async () => {
      getAll()
    })

    const play = async (id) => {
      pause()
      let { data } = await getMvUrl(id)
      state.url = data.data.url
      state.list.forEach(item => {
        if(item.id == id) {
          item.playState = true
        } else {
          item.playState = false
        }
      })
    }

    return {
      ...toRefs(state),
      play
    }
  },
}
</script>

<style scoped>
.mv {
  padding-bottom: 50px;
}

.video-item {
  padding: 14px 0;
  margin-bottom: 10px;
  background-color: #fff;
}

.video-cover {
  position: relative;
}

.video-item img {
  width: 100%;
}

.video-name {
  padding: 0 10px;
  margin-bottom: 10px;
  font-weight: 600;
}

.video-label {
  margin-top: 2px;
  font-size: 13px;
  color: gray;
}

.video-footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.video-footer > div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.video-footer img {
  width: 20px;
  margin-right: 4px;
}

.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px !important;
  color: #f5f2f2;
}
</style>