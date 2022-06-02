<template>
  <div>
    <div class="header-tool">
      <div><img src="@/assets/img/user/info.svg" /></div>
      <div><img src="@/assets/img/user/more.svg" /></div>
    </div>
    <UserInfo />
    <DisplayList />
    <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import UserInfo from './childcomps/UserInfo'
import DisplayList from '@/components/user/DisplayList'

export default {
  name: 'User',
  components: {
    TabBar,
    UserInfo,
    DisplayList
  },
  setup() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.header-tool {
  padding: .625rem;
  display: flex;
  justify-content: flex-end;
}

.header-tool img {
  width: 1.5625rem;
  margin-left: .625rem;
}
</style>