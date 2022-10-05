<template>
  <div class="search" :class="{'add-padding':musicData.show}">
    <div class="search-header">
      <img class="back-icon" src="@/assets/img/common/back.svg" @click="back" />
      <div class="search-header-input">
        <img src="@/assets/img/common/search.svg" />
        <input v-model="value" @keyup.enter="search" />
      </div>
      <div class="search-header-btn" @click="search">搜索</div>
    </div>

    <div class="search-list" v-if="list.length > 0">
      <div class="search-list-title">单曲</div>
      <div class="search-item" v-for="item in list" :key="item.id" @click="playMusic(item)">
        <div class="search-item-center">
          <div class="search-item-name">{{ item.name }}</div>
          <div class="search-item-label">
            <span>{{ item.artists[0].name }}</span>
          </div>
        </div>
        <div class="search-item-right">
          <img src="@/assets/img/music/play-gray.svg" />
          <img src="@/assets/img/music/more-gray.svg" />
        </div>
      </div>
    </div>
    <empty v-if="list.length == 0" />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { getSearch, getMusicUrl, getMusicDetails } from '@/network/music.js'

import useMusicFunctio from '@/use/useMusic' 

import Empty from '@/components/common/empty/Empty'

export default {
  name: '',
  components: {
    Empty
  },
  setup() {
    const { setMusicData, musicData } = useMusicFunctio()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      value: "",
      searchRecord: [],
      list: []
    })
    // 获取缓存
    let searchRecord = JSON.parse(localStorage.getItem('searchRecord'))
    state.searchRecord = searchRecord ? searchRecord : []
    state.value = route.query.value

    onMounted(() => {
      search()
    })

    function back() {
      router.back()
    }

    const search = async () => {
      let find = state.searchRecord.find(item => {
        return item == state.value
      })
      if(!find) {
        state.searchRecord.unshift(state.value)
        if(state.searchRecord.length > 8) {
          state.searchRecord.pop()
        }
        localStorage.setItem('searchRecord',JSON.stringify(state.searchRecord))
      }
      let { data } = await getSearch(state.value)
      state.list = data.result.songs
    }

    // 播放音乐
    const playMusic = async (item) => {
      let { data } = await getMusicUrl(item.id)
      let details = await getMusicDetails(item.id)
      let picUrl = details.data.songs[0].al.picUrl
      setMusicData({
        id: item.id,
        picUrl: picUrl,
        name: item.name,
        singer: item.artists[0].name,
        url: data.data,
        show: true
      })
    }

    return {
      ...toRefs(state),
      search,
      back,
      playMusic,
      musicData
    }
  },
  methods: {}
}
</script>

<style scoped>
.search {
  padding-top: 54px;
}

.search-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
}

.back-icon {
  margin-right: 6px;
  width: 30px;
}

.search-header-input {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px 0px 10px;
  border-radius: 99rem;
  background-color: #f7f8fa;
}

.search-header-input input {
  width: 100%;
  height: 30px;
  border: 0;
  background-color: transparent;
  outline: none;
}

.search-header-input img {
  width: 20px;
  padding-right: 6px;
}

.search-header-btn {
  margin-left: 10px;
  color: var(--main-color);
}

.search-record {
  padding: 10px;
}

.search-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}

.search-record-header img {
  width: 20px;
}

.record-list span {
  display: inline-block;
  margin: 14px 10px 0 0;
  padding: 4px 16px;
  font-size: 14px;
  border-radius: 99rem;
  background-color: rgba(215, 210, 210, 0.4);
}

.search-list {
  margin: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.search-list-title {
  padding: 14px 10px 10px;
  font-weight: 600;
}

.search-item {
  font-size: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(223, 217, 217, 0.4);
}

.search-item:last-child {
  border-bottom: 0;
}

.search-item img {
  width: 25px;
}

.search-item-center {
  flex: 1;
  padding-right: 10px;
}

.search-item-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-item-label {
  margin-top: 4px;
  color: gray;
  font-size: 13px;
}

.add-padding {
  padding-bottom: 44px;
}
</style>