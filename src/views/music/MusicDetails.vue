<template>
  <div class="music-details">
    <div class="header">
      <img src="@/assets/img/music/bottom.svg" @click="back" />
      <div class="header-center">
        <!-- 暂空 -->
      </div>
      <img src="@/assets/img/music/share.svg" />
    </div>

    <div class="content">
      <div class="content-name">{{ details.name }}</div>
      <div class="content-label">{{ details.singer }}</div>
      <div class="content-img">
        <img :src="details.picUrl" />
      </div>
    </div>

    <div class="footer">
      <div class="row">
        <img src="@/assets/img/music/collect.svg" />
        <img src="@/assets/img/music/download.svg" />
        <img src="@/assets/img/music/comment.svg" />
        <img src="@/assets/img/music/sing.svg" />
        <img src="@/assets/img/music/more.svg" />
      </div>
      <div class="speed">
        <div>{{ formatDuring(details.currentTime) }}</div>
        <div class="speed-block">
          <div 
            :style="{'width': details.currentTime / details.duration * 100 + '%'}" 
            class="speed-block-progress" 
          />
        </div>
        <div>{{ formatDuring(details.duration) }}</div>
      </div>
      <div class="row">
        <img src="@/assets/img/music/listloop.svg" />
        <img src="@/assets/img/music/last.svg" />
        <img 
          src="@/assets/img/music/play.svg"
          style="width:50px;height:50px" 
          v-if="!playState" 
          @click="playClick"
        />
        <img 
          src="@/assets/img/music/stop.svg" 
          style="width:50px;height:50px" 
          v-if="playState" 
          @click="pauseClick"
        />
        <img src="@/assets/img/music/next.svg" />
        <img src="@/assets/img/music/playlist.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicDetails } from '@/network/music.js'

import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, toRefs, onUnmounted } from 'vue'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {},
  setup() {
    const { audioRef, playState, play, pause } = useMusicFunctio()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      details: {},
      time: null
    })

    function back() {
      router.back()
    }

    // 处理时间
    function formatDuring(millisecond) {
      let minutes = 0
      let seconds = 0
      if(millisecond > 60) {
        minutes = parseInt(millisecond / 60);
        seconds = parseInt(millisecond % 60);
      } else {
        seconds = parseInt(millisecond);
      }
      if(minutes < 10) {
        minutes = '0' + minutes
      }
      if(seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ":" + seconds;
    }

    // 播放时长
    function increaseTime() {
      state.time = setInterval(() => {
        if(state.details.currentTime < state.details.duration) {
          state.details.currentTime++
        } else {
          clearInterval(state.time)
        }
      }, 1000)
    }

    // 暂停播放
    function pauseClick() {
      clearInterval(state.time)
      pause()
    }

    // 继续播放
    function playClick() {
      if(state.details.currentTime >= state.details.duration) {
        state.details.currentTime = 0
      }
      clearInterval(state.time)
      increaseTime()
      play()
    }

    // 获取歌曲数据
    const getdata = async () => {
      let { data } = await getMusicDetails(route.query.id)
      let songs = data.songs[0]
      state.details = {
        name: songs.al.name,
        singer: songs.ar[0].name,
        picUrl: songs.al.picUrl,
        // 有延迟
        currentTime: parseInt(audioRef.value.currentTime),
        duration: parseInt(audioRef.value.duration)
      }
      increaseTime()
    }

    onMounted(() => {
      getdata()
    })

    onUnmounted(() => {
      clearInterval(state.time)
    })

    return {
      back,
      formatDuring,
      getdata,
      playState,
      playClick,
      pauseClick,
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>
.music-details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #f7f7f7;
}

.header {
  height: 50px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.header .header-center {
  flex: 1;
}

.header img {
  width: 25px;
  height: 25px;
}

.content {
  box-sizing: border-box;
  padding: 10px;
  height: calc(100vh - 205px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.content-name {
  font-size: 18px;
  font-weight: 600;
}

.content-label {
  margin-top: 6px; 
  color: gray;
}

.content-img  {
  padding: 20px;
}

.content-img img {
  width: 100%;
  border-radius: 10px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.row img {
  width: 25px;
  height: 25px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0 20px;
}

.speed {
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.speed-block {
  position: relative;
  flex: 1;
  margin: 0 8px;
  height: 3px;
  background-color: rgba(69, 106, 255, .1);
}

.speed-block-progress {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--main-color);
  transition: width 1s;
}
</style>