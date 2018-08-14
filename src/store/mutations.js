import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, info) {
    state.userInfo = info
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
  }
}

export default mutations
