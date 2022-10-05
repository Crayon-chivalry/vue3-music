<template>
  <div class="album">
    <nav-bar title="数字专辑" />

    <div class="album-tabs">
      <div class="album-tabs-item" @click="tolink('album-sales-list')">
        <div class="album-tabs-icon">
          <img src="@/assets/img/music/album/album-tabs1.svg" />
        </div>
        <div>畅销榜</div>
      </div>
      <div class="album-tabs-item" @click="tolink('album-area-list')">
        <div class="album-tabs-icon">
          <img src="@/assets/img/music/album/album-tabs2.svg" />
        </div>
        <div>语种风格馆</div>
      </div>
      <div class="album-tabs-item" @click="tolink('album-buy')">
        <div class="album-tabs-icon">
          <img src="@/assets/img/music/album/album-tabs3.svg" />
        </div>
        <div>已购</div>
      </div>
    </div>

    <div class="new-album">
      <div class="new-album-title">
        <div>最新专辑</div>
        <img src="@/assets/img/common/to.svg" />
      </div>
      <div class="new-album-list">
        <div class="new-album-item" v-for="item in products" :key="item.albumId">
          <img v-lazy="item.coverUrl" />
          <div class="new-album-albumName">{{ item.albumName }}</div>
          <div class="new-album-artistName">{{ item.artistName }}</div>
          <div class="new-album-price">￥{{ item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import { getAlbumList } from '@/network/music'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const router = useRouter() 
    const state = reactive({
      products: []
    })

    onMounted(() => {
      getAlbums()
    })

    // 获取最新数字专辑
    const getAlbums = async () => {
      let { data } = await getAlbumList(6)
      state.products = data.products
    }

    function tolink(path) {
      router.push(path)
    }

    return {
      ...toRefs(state),
      tolink
    }
  }
}
</script>

<style scoped>
.album {
  padding-top: 45px;
  min-height: calc(100vh - 45px);
  background-color: #fff;
}

.album-tabs {
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid rgba(235, 233, 233, .4);
}

.album-tabs-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-tabs-icon {
  padding: 10px;
  margin-bottom: 4px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--main-color);
}

.album-tabs-icon img {
  width: 100%;
}

.new-album {
  padding: 24px 10px 10px;
}

.new-album-title {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
}

.new-album-title img {
  width: 22px;
  margin-left: 4px;
}

.new-album-list {
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
</style>