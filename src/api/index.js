import axios from 'axios'
import VueCookies from 'vue-cookies'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://47.106.200.223:8000/'
axios.interceptors.request.use((config) => {
  let token = VueCookies.get('token')
  if (token) {
    config.headers.common['authorization'] = 'token ' + token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  // 404等问题可以在这里处理
  return Promise.reject(error)
})

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 调用接口
const api = {
  log: (name, password) => {
    return post('/api/users/logUser', {
      name,
      password
    })
  },
  accountused: (name) => {
    return get('/api/users/ifUser', {
      params: {
        name
      }
    })
  },
  reg: (name, password) => {
    return post('/api/users/registerUser', {
      name,
      password
    })
  },
  getUser: () => {
    return get('/api/users/getUser')
  },
  getWeight: () => {
    return get('/api/weights/getWeight')
  },
  setinfo: (info) => {
    return post('/api/users/setInfo', info)
  },
  setweight: (info) => {
    return post('/api/weights/setWeight', info)
  }
}

export default api
