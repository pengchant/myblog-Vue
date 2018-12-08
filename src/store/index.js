import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

/**
 * vuex 的全局状态
 */
const state = {
	islogined: false, // 是否已经登录
	userinfo: null, // 用户的信息
}
 
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})