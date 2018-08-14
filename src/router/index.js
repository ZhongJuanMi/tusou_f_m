import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => {
  import ('@/pages/index').then(module => {
    resolve(module)
  })
}

const Log = resolve => {
  import ('@/pages/log').then(module => {
    resolve(module)
  })
}
const Reg = resolve => {
  import ('@/pages/reg').then(module => {
    resolve(module)
  })
}

export default new Router({
  routes: [{
      path: '/',
      component: Index
    },
    {
      path: '/log',
      component: Log
    },
    {
      path: '/reg',
      component: Reg
    }
  ]
})
