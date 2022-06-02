<template>
  <div class="login">
    <nav-bar title="登录" to="user" />
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
        <div class="submit" @click="submit">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { login } from '@/network/login'

import { reactive, toRefs, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import md5 from 'blueimp-md5'

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const store = useStore()
    const router = useRouter() 
    const $Toast = inject('Toast')
    const rule = /^[1][3,4,5,7,8][0-9]{9}$/
    const state = reactive({
      phone: "",
      password: ""
    })

    // 登录
    const submit = async () => {
      if (state.phone == "") {
        $Toast({message: "请输入手机号码"})
        return
      }
      if (!rule.test(state.phone)) {
        $Toast({message: "手机格式有误"})
        return
      }
      if (state.password == "") {
        $Toast({message: "密码不能为空"})
        return
      }
      let md5_password = md5(state.password)
      let { data } = await login(state.phone, md5_password)
      if(data.code != 200) {
        $Toast({message: data.msg})
        return
      }
      $Toast({message: "登录成功"})
      localStorage.setItem('userid', data.bindings[0].userId)
      localStorage.setItem('id', data.bindings[0].id)
      localStorage.setItem('token', data.token)
      store.commit('setLoginStatus', true)
      setTimeout(() => {
        router.push('user')
      }, 1000)
    }

    return {
      ...toRefs(state),
      submit
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