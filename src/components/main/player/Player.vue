<template>
  <div class="player" :class="[tabsPlayer ? 'tabs-player' : '']" v-show="musicData.show" @click="toDetails">
    <div class="music">
      <div class="music-img">
        <img :src="musicData.picUrl" width="30" height="30" class="rotate" />
      </div>
      <div class="music-label">
        {{musicData.name}}
        <span> - {{musicData.singer}}</span>
      </div>
    </div>
    <div class="tool">
      <div class="play-state">
        <img src="@/assets/img/player/play.svg" width="16" height="16" v-show="!playState" @click.stop="play" />
        <img src="@/assets/img/player/suspend.svg" width="16" height="16" v-show="playState" @click.stop="pause" />
      </div>
      <img src="@/assets/img/player/more.svg" width="26" height="26" />
    </div>
    <audio ref="audioRef" @ended="ended">
      <source 
        v-for="item in musicData.url"
        :key="item.id"
        :src="item.url" >
    </audio>
  </div>
</template>

<script>
import useMusicFunction from '@/use/useMusic'
import { useRouter } from 'vue-router'

import { ref } from 'vue'

export default {
  name: '',
  components: {},
  setup() {
    const router = useRouter()
    const { playState, musicData, audioRef, play, pause, ended, isShow } = useMusicFunction()
    const tabsPlayer = ref(false)
    // console.log(musicData)

    // 导航守卫
    router.beforeEach((to, from, next) => {
      let showPlayer = to.meta.player
      let path  = to.fullPath
      // 是否显示播放器
      if(showPlayer) {
        // 判断是否为 Tabs 页面 ，是则切换样式
        if(path == '/' || path == '/mv' || path == '/forum' || path == '/user') {
          tabsPlayer.value = true
        } else {
          tabsPlayer.value = false
        }
        isShow(true)
      } else {
        isShow(false)
      }
      next()
    })

    function toDetails() {
      router.push({
        name: 'music-details',
        query: {
          id: musicData.id
        }
      })
    }

    return {
      audioRef,
      playState,
      musicData,
      play,
      pause,
      ended,
      tabsPlayer,
      toDetails
    }
  },
}
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 .625rem;
  background-color: #fff;
  border-top: 1px solid rgba(237, 235, 235, .3);
}

.tabs-player {
  bottom: 50px;
}

.music {
  display: flex;
  align-items: center;
}

.music-img {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #000;
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 50%;
  overflow: hidden;
}

.music-img img {
  border-radius: 50%;
  overflow: hidden;
}

.rotate {
  animation-name: rotate;
  animation-duration: 16s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.music-label {
  flex: 1;
  padding-left: 10px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}

.music-label span {
  font-size: 12px;
  color: gray;
}

.tool {
  display: flex;
  align-items: center;
}

.play-state {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid gray;
}

.play-state img {
  padding: .3125rem;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>