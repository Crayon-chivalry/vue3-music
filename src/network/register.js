import { request } from "./requset"

// 检查重复昵称
export function getCheckNickname(nickname) {
  return request({
    url: `/nickname/check?nickname=${nickname}`
  })
}

// 验证手机号码是否注册
export function getExistence(phone) {
  return request({
    url: `/cellphone/existence/check?phone=${phone}`
  })
}

// 发送验证码
export function getCaptcha(phone) {
  return request({
    url: `/captcha/sent?phone=${phone}`
  })
}

// 验证验证码
export function getCheckCaptcha(phone, captcha) {
  return request({
    url: `/captcha/verify?phone=${phone}&captcha=${captcha}`
  })
}

// 注册
export function register(nickname, phone, captcha, password) {
  return request({
    url: `/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`
  })
}