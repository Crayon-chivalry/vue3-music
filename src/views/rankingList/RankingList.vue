<template>
  <div :class="{'add-padding':musicData.show}">
    <nav-bar title="排行榜" />

    <div class="list">
      <div 
        class="item-block" 
        v-for="item in list" :key="item.id"
        @click="tolink('song-sheet-details?id=' + item.id)"
      >
        <img :src="item.coverImgUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { getToplist } from '@/network/music'

import useMusicFunctio from '@/use/useMusic' 

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const { musicData } = useMusicFunctio()
    const router = useRouter()
    let state = reactive({
      list: {}
    })

    onMounted(() => {
      getData()
    })

    // 获取所有榜单
    const getData = (async () => {
      let { data } = await getToplist()
      state.list = data.list
    })

    function tolink(path) {
      router.push(path)
    }

    return {
      ...toRefs(state),
      musicData,
      tolink
    }
  },
  methods: {}
}
</script>

<style scoped>
.list {
  margin-top: 44px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
}

.list::after {
  content: "";
  width: 31%;
}

.item-block {
  width: 31%;
  margin-bottom: 10px;
}

.item-block img {
  width: 100%;
  border-radius: 10px;
} 

.add-padding {
  padding-bottom: 44px;
}
</style>