import axios from 'axios'
import {useLoading} from 'vue-loading-overlay'

export function request(config) {
  const $loading = useLoading()

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000
  })

  const loader = $loading.show({
    color: "#456aff"
  });

  // 响应拦截器，接受响应后进行操作
  instance.interceptors.response.use(config => {
    loader.hide()
    return config
  }, err => {
    loader.hide()
    console.log(err)
  })

  return instance(config)
}