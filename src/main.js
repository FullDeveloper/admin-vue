import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.min.css'
import TreeView from 'vue-json-tree-view'

import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
// import i18n from './lang' // Internationalization

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(
  ElementUI, {
    locale
  // i18n: (key, value) => i18n.t(key, value)
  }
)

Vue.use(TreeView)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
