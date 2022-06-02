<template>
  <div>
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
        <div>00.13</div>
        <div class="speed-block"></div>
        <div>4:21</div>
      </div>
      <div class="row">
        <img src="@/assets/img/music/listloop.svg" />
        <img src="@/assets/img/music/last.svg" />
        <img src="@/assets/img/music/play.svg" style="width:50px;height:50px" />
        <img src="@/assets/img/music/next.svg" />
        <img src="@/assets/img/music/playlist.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicDetails } from '@/network/music.js'

import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: '',
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      details: {}
    })

    function back() {
      router.back()
    }

    onMounted(async () => {
      let { data } = await getMusicDetails(route.query.id)
      let songs = data.songs[0]
      console.log(songs)
      state.details = {
        name: songs.al.name,
        singer: songs.ar[0].name,
        picUrl: songs.al.picUrl
      }
      console.log(state)
    })

    return {
      back,
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>
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
  flex: 1;
  margin: 0 8px;
  height: 3px;
  background-color: rgba(69, 106, 255, .1);
}
</style>