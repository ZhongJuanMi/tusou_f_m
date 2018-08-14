import * as types from './mutation-types'
import api from '@/api'

export const changeinfo = function ({
  commit
}, info) {
  // 异步修改
  api.setinfo(info).then(() => {
    commit(types.SET_USERINFO, info)
  })

}
