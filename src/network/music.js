import { request } from './requset'

export function getMusicUrl(id) {
  return request({
    url: `/song/url?id=${id}`
  })
}

export function getMusicDetails(id) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}

// 每日推荐新歌曲
export function getRecommendNewsong() {
  return request({
    url: `/personalized/newsong`
  })
}

// 热门歌单分类
export function getPlaylistHot() {
  return request({
    url: `/playlist/hot`
  })
}

// 热门歌单分类下的所有歌单
export function getTopPlaylist(tag) {
  return request({
    url: `/top/playlist?cat=${tag}`
  })
}

// 热门歌单分类下的所有歌单
export function getPlaylistDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}

