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

// 歌单分类
export function getPlaylistHot() {
  return request({
    url: `/playlist/hot`
  })
}

// 歌单分类下的所有歌单
export function getTopPlaylist(tag) {
  return request({
    url: `/top/playlist?cat=${tag}`
  })
}

// 歌单详情(只能获取到歌单名称等，无法获取歌单歌曲)
export function getPlaylistDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}

// 获取歌单下的歌曲
export function getPlaylistTrack(id, limit = 10,offset = 0) {
  return request({
    url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
  })
}

// 所有榜单
export function getToplist() {
  return request({
    url: `/toplist`
  })
}

// 数字专辑-新碟上架
export function getAlbumList(limit) {
  return request({
    url: `/album/list?limit=${limit}`
  })
}

// 数字专辑&数字单曲-榜单
export function getSongsaleboard(type, year, albumType) {
  return request({
    url: `/album/songsaleboard?type=${type}&year=${year}&albumType=${albumType}`
  })
}

// 语种风格馆数字专辑列表
export function getAlbumArea(area, offset) {
  return request({
    url: `/album/list/style?area=${area}&offset=${offset}`
  })
}

// 歌手
export function getSinger(area, offset) {
  return request({
    url: `/artist/list?type=-1&area=${area}&initial=z$offset=${offset}`
  })
}

// 歌手歌曲
export function getSingerSongs(id) {
  return request({
    url: `/artist/songs?id=${id}&order=time&limit=50`
  })
}

// 搜索
export function getSearch(keywords) {
  return request({
    url: `/search?keywords=${keywords}`
  })
}



