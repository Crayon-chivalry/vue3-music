<template>
  <div class="area-list" :class="{'add-padding':musicData.show}">
    <nav-bar title="语种风格馆" />

    <tabs :tabs="tabs" v-model:active="tabsIndex" class="sales-tabs" @update:active="getList" />

    <div class="new-album-list">
      <div class="new-album-item" v-for="item in albumProducts" :key="item.albumId">
        <img v-lazy="item.coverUrl" />
        <div class="new-album-albumName">{{ item.albumName }}</div>
        <div class="new-album-artistName">{{ item.artistName }}</div>
        <div class="new-album-price">￥{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Tabs from '@/components/common/tabs/Tabs'

import { onMounted, reactive, toRefs } from 'vue'

import { getAlbumArea } from "@/network/music"

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {
    NavBar,
    Tabs
  },
  setup() {
    const { musicData } = useMusicFunctio()
    const state = reactive({
      tabs: [
        {name:'华语', value: "Z_H"}, 
        {name:'欧美', value: "E_A"}, 
        {name:'韩国', value: "KR"}, 
        {name:'日本', value: "JP"}
      ],
      tabsIndex: 0,
      albumProducts: []
    })

    onMounted(() => {
      getList()
    })

    const getList = async () => {
      let area = state.tabs[state.tabsIndex].value
      let { data } = await getAlbumArea(area, 0)
      state.albumProducts = data.albumProducts
    }

    return {
      ...toRefs(state),
      musicData,
      getList
    }
  },
  methods: {}
}
</script>

<style scoped>
.area-list {
  background-color: #fff;
}

.new-album-list {
  padding: 110px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.new-album-item {
  width: 30%;
  margin-bottom: 14px;
}

.new-album-item img {
  width: 100%;
  border-radius: 4px;
}

.new-album-albumName {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 2px;
}

.new-album-artistName {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 13px;
  color: gray;
  margin-bottom: 2px;
}

.new-album-price {
  font-size: 14px;
  color: #e02020;
}

.add-padding {
  padding-bottom: 44px;
}

.sales-tabs {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>