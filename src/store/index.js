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
	islogined: false,    // 是否已经登录
	userinfo: null,      // 用户的信息
	myarticlelist: {     // 用户的所有的文章列表 
		pageno: 1,       // 页号
		pagesize: 10,    // 页面大小
		total: 0,        // 一共多少数据
		articlelsit: [], // 文章列表
	}, 
	currentactiveindex: "1" // 当前激活
}
 
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})