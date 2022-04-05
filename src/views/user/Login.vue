<template>
  <div class="login">
    <NavBar title="登录" to="user" />
    <div class="content">
      <div class="logo">
        <img src="@/assets/img/logo.svg" width="80" />
      </div>
      <div class="form">
        <div class="input-wrap">
          <img src="@/assets/img/login/phone.svg" width="20" />
          <input v-model="phone" type="tel" placeholder="请输入手机号码" />
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/password.svg" width="20" />
          <input v-model="password" type="password"  placeholder="请输入密码" />
        </div>
        <div class="other">
          <router-link to="">忘记密码</router-link>
          <router-link to="register">注册账号</router-link>
        </div>
        <div class="submit">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'
import { reactive, toRefs } from 'vue'

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const state = reactive({
      phone: "",
      password: ""
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>
.login {
  background-color: #fff;
  min-height: 100vh;
}

.content {
  padding-top: 2.75rem;
}

.logo {
  text-align: center;
  padding: 2.5rem 0 1.875rem;
}

.form {
  padding: 0 1.875rem;
}

.input-wrap {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: .625rem;
  border-bottom: .0625rem solid rgba(194, 189, 189, 0.3);
}

.input-wrap input {
  border: 0;
  outline: none;
  margin-left: .625rem;
}

.other {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.other a {
  color: var(--main-color);
  text-decoration: none;
}

.submit {
  background-color: var(--main-color);
  color: #fff;
  margin-top: 1.25rem;
  padding: .75rem;
  border-radius: 99rem;
  text-align: center;
}
</style>