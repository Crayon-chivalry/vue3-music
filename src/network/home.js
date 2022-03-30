import { request } from './requset'

export function getBanner() {
  return request({
    url: '/banner?type=2',
  })
}

export function getBalls() {
  return request({
    url: '/homepage/dragon/ball'
  })
}

export function getPageData() {
  return request({
    url: '/homepage/block/page'
  })
}