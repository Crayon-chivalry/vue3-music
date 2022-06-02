<template>
  <div class="info">
    <div class="info-row">
      <div class="info-tx">
        <img :src="avatarUrl" />
      </div>
      <div class="info-base">
        <template v-if="loginStatus">
          <div class="info-name">{{ nickname }}</div>
          <div class="info-level">Lv{{ level }}</div>
        </template>
        <template v-else>
          <router-link to="login">
            <div class="login-bnt">立即登录</div>
          </router-link>
        </template>
      </div>
      <div class="info-icon" v-if="loginStatus">
        <img src="@/assets/img/common/to.svg" />
      </div>
    </div>
    <div class="info-record">
      <div class="record-item">
        <div class="record-value">100</div>
        <div class="record-label">收藏</div>
      </div>
      <div class="record-item">
        <div class="record-value">20</div>
        <div class="record-label">歌单</div>
      </div>
      <div class="record-item">
        <div class="record-value">100</div>
        <div class="record-label">下载</div>
      </div>
      <div class="record-item">
        <div class="record-value">100</div>
        <div class="record-label">最近</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, toRefs } from 'vue'

import { getUserDetail } from '@/network/user'

export default {
  name: '',
  components: {},
  setup() {
    const store = useStore()
    const loginStatus = store.state.loginStatus
    const state = reactive({
      nickname: "",
      avatarUrl: "",
      level: 0
    })

    onMounted(async () => {
      if(loginStatus) {
        let uid = localStorage.getItem('userid')
        let { data } = await getUserDetail(uid)
        state.nickname = data.profile.nickname
        state.level = data.level
        state.avatarUrl = data.profile.avatarUrl
        console.log(data)
      }
    })

    return {
      loginStatus,
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>
.info {
  background-color: #fff;
  padding: 1rem;
  margin: 0 .625rem;
  border-radius: .375rem;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-tx {
  width: 5rem;
}

.info-tx img {
  width: 100%;
  border-radius: 50%;
}

.info-base {
  flex: 1;
  padding-left: .625rem;
}

.info-icon {
  width: 1.5625rem;
}

.info-icon img {
  width: 100%;
}

.info-name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 6px;
}

.info-level {
  display: inline-block;
  font-size: .75rem;
  border-radius: 99rem;
  border: .0625rem solid var(--main-color);
  padding: .0625rem .5rem;
  color: var(--main-color);
}

.info-record {
  display: flex;
  align-items: center;
  margin-top: 1.25rem;
}

.record-item {
  flex: 1;
  text-align: center;
}

.record-label {
  color: gray;
  font-size: .8125rem;
}

.record-value {
  font-size: .9375rem;
  font-weight: 600;
  margin-bottom: .25rem;
}

.login-bnt {
  font-size: 18px;
  display: inline-block;
  padding: .25rem 1rem;
  border-radius: 99rem;
  color: #fff;
  background-color: var(--main-color);
}
</style>