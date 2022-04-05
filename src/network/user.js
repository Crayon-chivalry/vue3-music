import { request } from "./requset"

export function getExistence(phone) {
  return request({
    url: `/cellphone/existence/check?phone=${phone}`
  })
}