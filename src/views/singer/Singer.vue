<template>
  <div class="singer" :class="{'add-padding':musicData.show}">
    <nav-bar title="歌手" />

    <tabs :tabs="tabs" v-model:active="tabsIndex" class="singer-tabs" @update:active="getData" />

    <div class="singer-list">
      <div class="singer-item" v-for="item in list" :key="item.id" @click="toDetails(item)">
        <img v-lazy="item.img1v1Url" />
        <div class="singer-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Tabs from '@/components/common/tabs/Tabs'

import { getSinger } from '@/network/music'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {
    NavBar,
    Tabs
  },
  setup() {
    const { musicData } = useMusicFunctio()
    const router = useRouter()
    const state = reactive({
      list: [],
      tabs: [
        {name:'全部', value: -1}, 
        {name:'华语', value: 7}, 
        {name:'欧美', value: 96}, 
        {name:'日本', value: 8},
        {name:'韩国', value: 16},
        {name:'其他', value: 0},
      ],
      tabsIndex: 0
    })

    onMounted(() => {
      getData()
    })

    const getData = async () => {
      let area = state.tabs[state.tabsIndex].value
      let { data } = await getSinger(area, 0)
      state.list = data.artists
    }

    function toDetails(e) {
      router.push({
        name: 'singer-songs',
        query: {
          id: e.id,
          name: e.name
        }
      })
    }

    return {
      getData,
      toDetails,
      musicData,
      ...toRefs(state)
    }
  },
  methods: {}
}
</script>

<style scoped>
.singer {
  padding-top: 92px;
}

.singer-tabs {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  background-color: #fff;
}

.singer-list {
  padding: 20px 10px 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.singer-item {
  width: 30%;
  margin-bottom: 14px;
  text-align: center;
}

.singer-item img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.singer-name {
  margin-top: 6px;
  font-size: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.add-padding {
  padding-bottom: 44px;
}
</style>