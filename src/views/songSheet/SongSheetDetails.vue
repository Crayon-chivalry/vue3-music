<template>
  <div class="details" :class="{'add-padding':musicData.show}">
    <div class="header">
      <div class="header-bg-cover" v-if="backgroundCoverUrl">
        <img :src="backgroundCoverUrl" />
        <nav-bar :border="false" bg-color="transparent">
          <template v-slot:left>
            <img src="@/assets/img/common/back2.svg" style="width:30px" />
          </template>
        </nav-bar>
        <div class="header-info-block">
          <div class="header-info-title">{{ name }}</div>
          <div class="header-info-date">{{ updateFrequency }}</div>
          <div class="header-info-msg">{{ description }}</div>
        </div>
      </div>
      <div class="header-cover" v-else>
        <img class="header-cover-bg" :src="coverImgUrl" />
        <div class="header-info-block2">
          <img :src="coverImgUrl" />
          <div>
            <div class="header-info-title" style="color:#fff">{{ name }}</div>
            <div class="creator">
              <img :src="creator.avatarUrl" />
              <img class="creator-level" :src="creator.identityIconUrl" />
              <div style="margin-right:4px">{{ creator.nickname }}</div>
              <img src="@/assets/img/music/song-sheet/follow.svg" width="18" />
            </div>
            <div class="header-info-description-row">
              <div class="header-info-description-msg">{{ description }}</div>
              <img src="@/assets/img/common/to2.svg" width="18" />
            </div>
          </div>
        </div>
        <nav-bar :border="false" bg-color="transparent">
          <template v-slot:left>
            <img src="@/assets/img/common/back2.svg" style="width:30px" />
          </template>
        </nav-bar>
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

    <div class="song-list">
      <div 
        class="song-item"
        :class="[musicData.id == item.id ? 'song-item-active' : '']"
        v-for="(item,index) in songs" 
        :key="item.id" 
        @click="playMusic(item)"
      >
        <div class="song-item-num">{{index + 1}}</div>
        <div class="song-item-center">
          <div class="song-name">{{item.al.name}}</div>
          <div class="song-label" v-if="item.alia.length > 0">
            <span v-for="(item2,index2) in item.alia" :key="index2">{{item2}}</span>
          </div>
        </div>
        <div class="song-item-right">
            <img src="@/assets/img/music/play-gray.svg" />
            <img src="@/assets/img/music/more-gray.svg" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import { getPlaylistDetail, getPlaylistTrack, getMusicUrl } from '@/network/music'

import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const { setMusicData, musicData } = useMusicFunctio()
    const route = useRoute()
    const state = reactive({
      backgroundCoverUrl: "",
      coverImgUrl: "",
      name: "",
      creator: {},
      updateFrequency: "",
      description: "",
      count: {},
      songs: []
    })

    onMounted(() => {
      let id = route.query.id
      getDetail(id)
      getTrack(id)
    })

    // 获取歌单详情信息
    const getDetail = (async (id) => {
      let { data } = await getPlaylistDetail(id)
      let playlist = data.playlist
      state.backgroundCoverUrl = playlist.backgroundCoverUrl
      state.coverImgUrl = playlist.coverImgUrl
      if(playlist.backgroundCoverUrl) {
        let name = playlist.name.split(" ")
        state.name = name[0].replace(/\[|\]/g, "")
      } else {
        state.name = playlist.name
      }
      state.updateFrequency = playlist.updateFrequency
      state.description = playlist.description
      state.count = {
        subscribedCount: playlist.subscribedCount,
        shareCount: playlist.shareCount,
        commentCount: playlist.commentCount
      }
      state.creator = {
        nickname: playlist.creator.nickname,
        avatarUrl: playlist.creator.avatarUrl,
        identityIconUrl: playlist.creator.avatarDetail.identityIconUrl
      }
    })

    // 获取歌单下的歌曲
    const getTrack = (async (id) => {
      let { data } = await getPlaylistTrack(id)
      state.songs = data.songs
    })

    const playMusic = async (item) => {
      let { data } = await getMusicUrl(item.id)
      setMusicData({
        id: item.id,
        picUrl: item.al.picUrl,
        name: item.name,
        singer: item.alia[0] ? item.alia[0] : '',
        url: data.data,
        show: true
      })
    }

    return {
      ...toRefs(state),
      musicData,
      playMusic
    }
  },
}
</script>

<style scoped>
.details {
  min-height: 100vh;
  background-color: #fff; 
}

.header {
  position: relative;
}

.header-bg-cover img {
  min-height: 300px;
  width: 100%;
}

.header-cover {
  height: 240px;
  overflow: hidden;
}

.header-cover-bg {
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
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
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

.header-info-block2 {
  position: absolute;
  top: 54px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.header-info-block2 img:first-child {
  margin-right: 10px;
  width: 125px;
  border-radius: 8px;
}

.creator {
  position: relative;
  padding: 20px 0 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #eee;
}

.creator-level {
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 15px;
}

.creator img:first-child {
  width: 30px;
  border-radius: 50%;
}

.header-info-description-row {
  display: flex;
  align-items: center;
}

.header-info-description-msg {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: #eee;
}

.song-list {
  margin-top: 20px;
  padding: 10px 0;
}

.song-item {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.song-item-num {
  width: 45px;
  text-align: center;
  font-size: 15px;
  color: gray;
}

.song-item-center {
  flex: 1;
  padding-right: 16px;
}

.song-name {
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.song-label {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-top: 4px;
  font-size: 12px;
  color: gray;
}

.song-item-right img {
  width: 25px;
  margin-right: 10px;
}

/* .song-item-right img:first-child {
  margin-right: 10px;
} */

.add-padding {
  padding-bottom: 44px;
}

.song-item-active {
  color: var(--main-color);
}

.song-item-active span {
  color: var(--main-color);
}
</style>