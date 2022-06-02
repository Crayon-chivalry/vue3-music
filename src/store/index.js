import { createStore } from 'vuex'

export default createStore({
  state: {
    loginStatus: false
  },
  mutations: {
    setLoginStatus(state, content) {
      state.loginStatus = content
    }
  },
  actions: {
  },
  modules: {
  }
})
