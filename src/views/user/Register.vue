<template>
  <div class="login">
    <NavBar title="注册" />
    <div class="content">
      <div class="logo">
        <img src="@/assets/img/logo.svg" width="80" />
      </div>
      <div class="form">
        <div class="input-wrap">
          <img src="@/assets/img/login/nickname.svg" width="20" />
          <input v-model="nickname" type="text" placeholder="请输入昵称" />
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/phone.svg" width="20" />
          <input v-model="phone" type="tel" placeholder="请输入手机号码" @blur="phoneRule" />
          <div class="phone-msg" v-if="phoneMsgState == 1">手机格式有误</div>
          <div class="phone-msg" v-if="phoneMsgState == 2">手机号码已注册</div>
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/captcha.svg" width="20" />
          <input v-model="captcha" type="tel" placeholder="请输入验证码" />
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/password.svg" width="20" />
          <input v-model="password" type="password"  placeholder="请输入密码" />
        </div>
        <div class="other">
          <router-link to="login">立即登录</router-link>
        </div>
        <div class="submit">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'

import { getExistence } from '@/network/user.js'
import { reactive, toRefs } from 'vue'

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const state = reactive({
      phone: "",
      password: "",
      nickname: "",
      captcha: "",
      phoneMsgState: 0
    })

    // 验证手机号码格式
    const phoneRule = async () => { 
      let phoneRule = /^[1][3,4,5,7,8][0-9]{9}$/
      if(!phoneRule.test(state.phone)) {
        state.phoneMsgState = 1
      } else {
        console.log(state.phone)
        let {data} = await getExistence(state.phone) 
        console.log(data)
        if(data.hasPassword) {
          state.phoneMsgState = 2
          return
        }
        state.phoneMsgState = 0
      }
    }

    return {
      ...toRefs(state),
      phoneRule
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
  flex: 1;
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

.phone-msg {
  color: #e02020;
  font-size: 12px;
}
</style>