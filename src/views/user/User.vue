<template>
  <div class="user">
    <!-- <div class="header-tool">
      <div><img src="@/assets/img/user/info.svg" /></div>
      <div><img src="@/assets/img/user/more.svg" /></div>
    </div> -->
    <UserBaseInfo />
    <UserSongSheet />
    <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import UserBaseInfo from './childcomps/UserBaseInfo'
import UserSongSheet from './childcomps/UserSongSheet'

export default {
  name: 'User',
  components: {
    TabBar,
    UserBaseInfo,
    UserSongSheet
  },
  setup() {
    return {

    }
  },
  methods: {}
}
</script>

<style scoped>
.user {
  padding:10px 0 50px;
}

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