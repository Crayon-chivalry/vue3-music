<template>
  <div>
    <nav-bar title="歌单广场" />
    <tabs :tabs="tabs" v-model:active="tabsIndex" @update:active="getData" class="tabs-block" />
    <div class="content">
      <div 
        class="block" 
        v-for="item in playlists" 
        :key="item.id" 
        @click="tolink('song-sheet-details?id=' + item.id)"
      >
        <img :src="item.coverImgUrl" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Tabs from '@/components/common/tabs/Tabs'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { getPlaylistHot, getTopPlaylist } from '@/network/music'

export default {
  name: '',
  components: {
    NavBar,
    Tabs
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      tabs: [],
      playlists: [],
      tabsIndex: 0
    })

    // 获取数据
    const getData = (async () => {
      let { data } = await getPlaylistHot()
      state.tabs = data.tags
      let list = await getTopPlaylist(state.tabs[state.tabsIndex].name)
      state.playlists = list.data.playlists
    })

    onMounted(async () => {
      getData()
    })

    function tolink(path) {
      router.push(path)
    }

    return {
      getData,
      tolink,
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>
.tabs-block {
  margin-top: 44px;
  background-color: #fff;
}

.content {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.block {
  width: 31%;
  margin-bottom: 20px;
}

/* 伪元素,解决 flex 布局最后一行左对齐 */
.content::after {
  content: '';
  width: 31%;
}

.block img {
  width: 100%;
  border-radius: 10px;
}

.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 13px;
}
</style>