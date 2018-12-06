// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'es6-promise/auto' 
import api from './service/index'


Vue.config.productionTip = false

/**
 * 使用elementUI
 */
Vue.use(ElementUI);

/**
 * 使用自定义封装的api
 */
Vue.use(api);
 
/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router, /** Step4. 挂载路由实例，让整个应用都有路由功能 */
  store, /**vuex 的使用 */
  components: { App },
  template: '<App/>' 
})
 

