<template>
  <div class="singer-songs" :class="{'add-padding':musicData.show}">
    <nav-bar :title="title" />

    <div class="song-list">
      <div class="song-item" v-for="(item, index) in list" :key="item.id">
        <div class="song-item-num">{{index + 1}}</div>
        <div class="song-item-center">
          <div class="song-name">{{item.name}}</div>
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

import { getSingerSongs } from '@/network/music'

import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'

import useMusicFunctio from '@/use/useMusic'

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const { musicData } = useMusicFunctio()
    const route = useRoute()
    const state = reactive({
      title: "",
      id: "",
      list: []
    })
    state.title = route.query.name
    state.id = route.query.id

    onMounted(() => {
      getData()
    })

    const getData = async () => {
      let { data } = await getSingerSongs(state.id)
      state.list = data.songs
    }

    return {
      musicData,
      ...toRefs(state)
    }
  },
  methods: {}
}
</script>

<style scoped>
.singer-songs {
  padding-top: 45px;
}

.song-list {
  /* padding: 10px 0; */
  background-color: #fff;
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

.add-padding {
  padding-bottom: 44px;
}
</style>