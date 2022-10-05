<template>
  <div class="list">
    <div class="list-header">
      <div class="list-label">自建歌单</div>
      <div class="list-other">
        <span style="margin-right:10px" @click="create">创建歌单</span>
        <img src="@/assets/img/user/more2.svg" />
      </div>
    </div>
    <div class="list-content">
      <div 
        class="item" 
        v-for="item in list" 
        :key="item.id"
        @click="tips"
      >
        <div class="item-info">
          <img :src="item.coverImgUrl" />
          <div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-num">{{ item.trackCount }}首</div>
          </div>
        </div>
        <div class="item-icon">
          <img src="@/assets/img/user/more2.svg" />
        </div>
      </div>
      <empty text="暂无歌单" v-if="list.length == 0" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'

import { getPlaylist } from '@/network/user'

import Empty from '@/components/common/empty/Empty'

export default {
  name: '',
  components: {
    Empty
  },
  setup() {
    const $Toast = inject('Toast')
    const router = useRouter()
    const state = reactive({
      list: []
    })

    onMounted(() => {
      getData()
    })

    const getData = async () => {
      let uid = localStorage.getItem('userid')
      let { data } = await getPlaylist(uid)
      state.list = data.playlist
    }

    function tolink(path) {
      router.push(path)
    }

    function tips() {
      $Toast({message: "暂无法查看"})
    }

    function create() {
      $Toast({message: "暂未开放"})
    }

    return {
      ...toRefs(state),
      tolink,
      tips,
      create,
    }
  },
  methods: {}
}
</script>

<style scoped>
.list {
  margin: .625rem;
  padding: .625rem;
  background-color: #fff;
  border-radius: .375rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3125rem 0 .9375rem;
}

.list-label {
  font-size: 1.125rem;
  font-weight: 600;
}

.list-other {
  display: flex;
  align-items: center;
  color: gray;
  font-size: .8125rem;
}

.list-other img {
  width: 1.3125rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .625rem;
}

.item-info {
  display: flex;
  align-items: center;
}

.item-info img {
  width: 3.75rem;
  border-radius: .625rem;
  margin-right: .625rem;
}

.item-name {
  font-weight: 500;
  font-size: .9375rem;
}

.item-num {
  color: gray;
  font-size: .75rem;
  margin-top: .3125rem;
}

.item-icon img {
  width: 1.25rem;
}
</style>