import { request } from './requset'

export function getAllMv(offset) {
  return request({
    url: `/mv/all?offset=${offset}`
  })
}

export function getPersonalizedMv() {
  return request({
    url: '/personalized/mv'
  })
}

export function getFirstMv() {
  return request({
    url: '/mv/first'
  })
}

export function getExclusiveMv(offset) {
  return request({
    url: `/mv/exclusive/rcmd?offset=${offset}`
  })
}

export function getMvDetail(id) {
  return request({
    url: `/mv/detail?mvid=${id}`
  })
}

export function getMvUrl(id) {
  return request({
    url: `/mv/url?id=${id}`
  })
}