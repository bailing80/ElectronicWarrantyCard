import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import VDistpicker from 'v-distpicker'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import "babel-polyfill"

Vue.use(ElementUI)
Vue.use(api)
Vue.component('v-distpicker', VDistpicker);

Vue.prototype.global = global

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});