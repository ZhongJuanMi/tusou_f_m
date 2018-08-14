import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => {
  import('@/components/index').then(module => {
    resolve(module)
  })
}

const Classify = resolve => {
  import('@/components/classify').then(module => {
    resolve(module)
  })
}
const Cart = resolve => {
  import('@/components/cart').then(module => {
    resolve(module)
  })
}
const Personal = resolve => {
  import('@/components/personal').then(module => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/personal',
      component: Personal
    }
  ]
})
