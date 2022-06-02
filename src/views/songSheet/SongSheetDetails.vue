<template>
  <div>
    <div class="header">
      <div class="header-bg-cover" v-if="backgroundCoverUrl">
        <img :src="backgroundCoverUrl" />
        <div class="header-info-block">
          <div class="header-info-title">{{ name }}</div>
          <div class="header-info-date">{{ updateFrequency }}</div>
          <div class="header-info-msg">{{ description }}</div>
        </div>
      </div>
      <div class="header-cover" v-else>
        <img :src="coverImgUrl" />
        22
      </div>
      <div class="header-count">
        <div>
          <img src="@/assets/img/music/song-sheet/subscribed.svg" />
          {{ count.subscribedCount }}</div>
        <div>
          <img src="@/assets/img/music/song-sheet/comment.svg" />
          {{ count.commentCount }}
        </div>
        <div>
          <img src="@/assets/img/music/song-sheet/share.svg" />
          {{ count.shareCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/network/music'

import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: '',
  components: {},
  setup() {
    const route = useRoute()
    const state = reactive({
      backgroundCoverUrl: "",
      coverImgUrl: "",
      name: "",
      updateFrequency: "",
      description: "",
      count: {}
    })

    onMounted(async () => {
      let id = route.query.id
      let { data } = await getPlaylistDetail(id)
      let playlist = data.playlist
      state.backgroundCoverUrl = playlist.backgroundCoverUrl
      state.coverImgUrl = playlist.coverImgUrl
      let name = playlist.name.split(" ")
      state.name = name[0].replace(/\[|\]/g, "")
      state.updateFrequency = playlist.updateFrequency
      state.description = playlist.description
      state.count = {
        subscribedCount: playlist.subscribedCount,
        shareCount: playlist.shareCount,
        commentCount: playlist.commentCount
      }
      console.log(data)
      console.log(state)
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>
.header {
  position: relative;
}

.header-bg-cover img {
  width: 100%;
}

.header-cover {
  height: 240px;
  overflow: hidden;
}

.header-cover img {
  width: 100%;
  filter: blur(50px)
}

.header-bg-cover .header-info-block {
  position: absolute;
  bottom: 40px;
  left: 10px;
  right: 10px;
  text-align: center;
  color: #fff;
}

.header-bg-cover .header-info-title {
  font-size: 26px;
  font-weight: 600;
}

.header-bg-cover .header-info-date {
  font-size: 13px;
  padding: 10px 0;
}

.header-bg-cover .header-info-msg {
  font-size: 13px;
  color: #eeee;
}

.header-count {
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: -20px;
  padding: 14px 0;
  display: flex;
  border-radius: 9rem;
  font-size: 14px;
  background-color: #fff;
}

.header-count div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(178, 175, 175, 0.4);
}

.header-count div:last-child {
  border-right: none;
}

.header-count img {
  width: 20px;
  margin-right: 4px;
}
</style>