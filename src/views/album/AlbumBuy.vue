<template>
  <div class="album-buy">
    <nav-bar title="已购" />
    <empty text="暂无购买的数字专辑" />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Empty from '@/components/common/empty/Empty'

export default {
  name: '',
  components: {
    NavBar,
    Empty
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.album-buy {
  padding-top: 45px;
}
</style>