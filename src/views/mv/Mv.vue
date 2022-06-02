<template>
  <div class="mv">
    <div class="video-content">
      <videos />
    </div>

    <tab-bar/>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import Videos from '@/components/main/videos/Videos'

import { getAllMv } from '@/network/mv.js'

import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: '',
  components: {
    TabBar,
    Videos
  },
  setup() {
    const state = reactive({
      list: []
    })

    const getAll = async () => {
      let { data } = await getAllMv(0)
      state.list = data.data
      console.log(state.list)
    }

    onMounted(async () => {
      getAll()
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>
</style>