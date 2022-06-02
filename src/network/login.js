import { request } from "./requset"

// 登录
export function login(phone, md5_password) {
  return request({
    url: `/login/cellphone?phone=${phone}&md5_password=${md5_password}`
  })
}

// 登录状态
export function getLoginStatus() {
  return request({
    url: `/login/status`
  })
}