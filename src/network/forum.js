import { request } from './requset'

export function getTopicList(limit, offset) {
  return request({
    url: `/hot/topic?limit=30&offset=30`
  })
}