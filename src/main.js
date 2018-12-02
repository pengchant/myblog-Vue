// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import 'es6-promise/auto'
import axios from 'axios'
import GCONFIG from './common/config'
import qs from 'qs'   


Vue.config.productionTip = false

/**
 * 使用elementUI
 */
Vue.use(ElementUI);

/**
 * 使用Vuex
 */
Vue.use(Vuex);

/**
 * 全局使用axios
 */
Vue.prototype.$axios = axios;

/**
 * 全局使用qs
 */
Vue.prototype.$qs = qs;

/**
 * 全局的url
 */ 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("x-auth-token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`;
    }
    if (config.url.indexOf(GCONFIG.url) === -1) {
      config.url = GCONFIG.url + config.url;/*拼接完整请求路径*/
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router, /** Step4. 挂载路由实例，让整个应用都有路由功能 */
  components: { App },
  template: '<App/>' 
})
 

