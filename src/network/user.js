import { request } from "./requset"

// 获取用户详情
export function getUserDetail(uid) {
  return request({
    url: `/user/detail?uid=${uid}`
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount() {
  return request({
    url: `/user/subcount`
  })
}

// 获取用户歌单
export function getPlaylist(uid) {
  return request({
    url: `/user/playlist?uid=${uid}`
  })
}