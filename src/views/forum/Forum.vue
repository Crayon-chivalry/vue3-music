<template>
  <div>
    社区
    <tab-bar/>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'

// import { getTopicList } from '@/network/forum'
// import { onMounted } from '@vue/runtime-core'

export default {
  name: '',
  components: {
    TabBar
  },
  setup() {
    // const limit = 20
    // const offset = 1

    // onMounted(async () => {
    //   let data = await getTopicList(limit, offset)
    //   console.log(data)
    // })
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>