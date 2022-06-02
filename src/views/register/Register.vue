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
          <div class="msg" v-if="nicknameMsgState == 0">昵称不能为空</div>
          <div class="msg" v-if="nicknameMsgState == 2">昵称不符合规范</div>
          <div class="msg" v-if="nicknameMsgState == 3">重复昵称</div>
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/phone.svg" width="20" />
          <input v-model="phone" type="tel" placeholder="请输入手机号码" />
          <div class="msg" v-if="phoneMsgState == 0">手机号码不能为空</div>
          <div class="msg" v-if="phoneMsgState == 2">手机格式有误</div>
          <div class="msg" v-if="phoneMsgState == 3">手机号码已注册</div>
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/captcha.svg" width="20" />
          <input v-model="captcha" type="tel" placeholder="请输入验证码" />
          <div class="captcha-bnt" @click="send">{{ captchaText }}</div>
        </div>
        <div class="input-wrap">
          <img src="@/assets/img/login/password.svg" width="20" />
          <input v-model="password" type="password"  placeholder="请输入密码" />
          <div class="msg" v-if="passwordMsgState == 0">密码不能为空</div>
        </div>
        <div class="other">
          <router-link to="login">立即登录</router-link>
        </div>
        <div class="submit" @click="formRule">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import { 
  getCheckNickname, 
  getExistence, 
  getCaptcha, 
  getCheckCaptcha, 
  register 
} from '@/network/register.js'
import { reactive, toRefs, inject, onUnmounted } from 'vue'

export default {
  name: '',
  components: {
    NavBar
  },
  setup() {
    const $Toast = inject('Toast')
    const rule = /^[1][3,4,5,7,8][0-9]{9}$/
    const state = reactive({
      phone: "",
      password: "",
      nickname: "",
      captcha: "",
      captchaText: "发送",
      sendTime: null,
      nicknameMsgState: 1,
      phoneMsgState: 1,
      passwordMsgState: 1
    })

    // 检测重复昵称
    const checkNickname = async () => {
      if (state.nickname == "") {
        state.nicknameMsgState = 0
        return false
      }
      let { data } = await getCheckNickname(state.nickname)
      if (data.code == 400) {
        state.nicknameMsgState = 2
        return false
      }
      if (data.duplicated) {
        state.nicknameMsgState = 3
        return false
      }
      state.nicknameMsgState = 1
      return true
    }

    // 验证手机号码格式, 并检测是否已注册
    const checkPhone = async () => { 
      if (state.phone == "") {
        state.phoneMsgState = 0
        return false
      }
      if(!rule.test(state.phone)) {
        state.phoneMsgState = 2
        return false
      }
      let {data} = await getExistence(state.phone) 
      if(data.hasPassword) {
        state.phoneMsgState = 3
        return false
      }
      state.phoneMsgState = 1
      return true
    }

    // 发送验证码
    const send = async () => {
      if(state.phone == "") return $Toast({message: "请输入手机号码"})
      if(!rule.test(state.phone)) return $Toast({message: "手机格式有误"})
      if(!state.sendTime) {
        let { data } = await getCaptcha(state.phone)
        if(data.data) {
          $Toast({message: "发送成功"})
        } else {
          $Toast({message: "发送失败"})
        }
        state.captchaText = 60
        state.sendTime = setInterval(() => {
          if(state.captchaText == 1) {
            clearInterval(state.sendTime)
            state.sendTime = null
            state.captchaText = "发送"
          } else {
            state.captchaText--
          }
        }, 1000)
      }
    }

    // 检测验证码是否正确
    const checkCaptcha = async () => {
      if (state.captcha == "") {
        $Toast({message: "请输入验证码"})
        return false
      }
      try {
        let res = await getCheckCaptcha(state.phone, state.captcha)
        if(res.data) {
          return true
        }
        $Toast({message: "验证码错误"})
        return false
      } catch (err) {
        $Toast({message: "验证码错误"})
        return false
      }
    }

    // 检测密码 
    function checkPassword() {
      if (state.password == ""){
        state.passwordMsgState = 0
        return false
      }
      state.passwordMsgState = 1
      return true
    } 

    // 验证表单
    const formRule = async () => {
      let check1 = await checkNickname()
      let check2 = await checkPhone()
      let check3 = false
      if(check1 && check2) {
        check3 = await checkCaptcha()
      }
      let check4 = await checkPassword()
      if(check3 && check4) {
        submit()
      }
    }

    // 注册
    const submit = async () => {
      try {
        let { data } = await register(state.nickname, state.phone, state.captcha, state.password)
        if(data.code == 200) {
          $Toast({message: "注册成功"})
          state.nickname = ""
          state.phone = ""
          state.captcha = ""
          state.password = ""
        } else {
          $Toast({message: "注册失败"})
        }
      } catch (err) {
        $Toast({message: "注册失败"})
      }
    }

    // 销毁定时器
    onUnmounted(() => {
      clearInterval(state.sendTime)
    })

    return {
      ...toRefs(state),
      send,
      formRule
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

.msg {
  color: #e02020;
  font-size: 12px;
}

.captcha-bnt {
  font-size: 12px;
  color: #fff;
  background-color: var(--main-color);
  padding: 6px 16px;
  border-radius: 99rem;
}
</style>