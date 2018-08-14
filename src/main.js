import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import api from './api'
import store from './store'
import 'lib-flexible/flexible.js'
import '@/assets/css/index.scss'
import {
  Button,
  Icon,
  NavBar,
  Toast,
  Dialog,
  CellGroup,
  Field,
  Popup,
  Cell,
  RadioGroup,
  Radio,
  DatetimePicker
} from 'vant'
Vue.use(Button)
  .use(Icon)
  .use(NavBar).use(Toast).use(Dialog).use(CellGroup).use(Field).use(Popup).use(Cell).use(RadioGroup).use(Radio).use(DatetimePicker)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$api = api
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.jpg')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
