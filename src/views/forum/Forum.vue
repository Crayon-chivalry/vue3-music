<template>
  <div>
    社区
    <TabBar/>
  </div>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar'

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