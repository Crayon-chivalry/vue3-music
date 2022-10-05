<template>
  <div class="sales-list" :class="{'add-padding':musicData.show}">
    <nav-bar title="畅销榜" />

    <div class="header-tabs">
      <div class="header-tabs-wrap">
        <div 
          class="header-tabs-item" 
          :class="{'header-tabs-active' : headerTabsActive == index}" 
          v-for="(item,index) in headerTabs"
          :key="index"
          @click="headerTabsClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <tabs :tabs="tabs" v-model:active="tabsIndex" class="sales-tabs" @update:active="getList" />

    <div class="album-list">
      <div class="album-item" v-for="(item, index) in list" :key="item.albumId">
        <div class="album-item-left" :style="{color: index < 3 ? 'red' : 'gray'}">
          {{ index + 1 }}
        </div>
        <div class="album-item-center">
          <img v-lazy="item.coverUrl" />
          <div>
            <div class="album-name">
              {{ item.albumName }}
            </div>
            <div class="sale-num">
              已售{{ item.saleNum }}张
            </div>
          </div>
        </div>
        <div class="album-item-right">支持</div>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Tabs from '@/components/common/tabs/Tabs'

import { onMounted, reactive, toRefs } from 'vue'

import { getSongsaleboard } from "@/network/music"

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
      headerTabs: ['数字专辑榜','数字单曲榜'],
      headerTabsActive: 0,
      tabs: [
        {name:'日榜', value: "daily"}, 
        {name:'周榜', value: "week"}, 
        {name:'2022年榜', value: "year"}, 
        {name:'总榜', value: "total"}
      ],
      tabsIndex: 0,
      list: []
    })

    onMounted(() => {
      getList()
    })

    // 获取数据
    const getList = async () => {
      // 暂只获取但年的榜单
      let year = new Date().getFullYear()
      let { data } = await getSongsaleboard(
        state.tabs[state.tabsIndex].value,
        year, 
        state.headerTabsActive, 
      )
      state.list = data.products
    }

    function headerTabsClick(index) {
      state.headerTabsActive = index
      getList()
    }

    return {
      ...toRefs(state),
      headerTabsClick,
      musicData,
      getList
    }
  }
}
</script>

<style scoped>
.sales-list {
  background-color: #fff;
}

.header-tabs {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  background-color: #fff;
}

.header-tabs-wrap {
  display: flex;
  border: 1px solid rgba(223, 219, 219, .8);
  border-radius: 99rem;
}

.header-tabs-item {
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 99rem;
}

.header-tabs-active {
  color: #fff;
  background-color: rgba(128, 128, 128, .8);
}

.sales-tabs {
  position: fixed;
  top: 99px;
  left: 0;
  right: 0;
  background-color: #fff;
}

.album-list {
  padding: 160px 0 16px;
}

.album-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.album-item:last-child {
  margin-bottom: 0;
}

.album-item-left {
  width: 50px;
  text-align: center;
  font-size: 18px;
  color: gray;
}

.album-item-center {
  flex: 1;
  display: flex;
  align-items: center;
}

.album-item-center img {
  width: 80px;
  margin-right: 10px
}

.album-item-right {
  margin: 0 10px;
  padding: 4px 16px;
  color: #e02020;
  border: 1px solid #e02020;
  border-radius: 99rem;
  font-size: 14px;
}

.album-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 16px;
  margin-bottom: 16px
}

.sale-num {
  font-size: 13px;
  color: gray;
}

.add-padding {
  padding-bottom: 44px;
}
</style>