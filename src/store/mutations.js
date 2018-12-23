/**
 * mutations 调用 mutations 是唯一允许更新应用状态的地方。
 */

import {
    RECORD_USERINFO,
    QUIT_LOGIN,
    GET_MYARTICLELIST,
    SET_MYARTICLEPAGE,
    SET_ACTIVEINDEX
} from './mutation_type';
import mylocalstorage from '@/common/localstorage';

export default {
    // 记录当前用户的信息
    [RECORD_USERINFO](state, user) {
        state.islogined = true;
        state.userinfo = { ...user };
        mylocalstorage.set("islogined", true);
        mylocalstorage.set("userinfo", user);
    },
    // 退出登录
    [QUIT_LOGIN](state) {
        state.islogined = false;
        state.userinfo = null;
        mylocalstorage.set("islogined", false);
        mylocalstorage.set("userinfo", null);
    },
    // 设置我的文章列表分页
    [SET_MYARTICLEPAGE](state, {
        pageno,
        pagesize
    }) {
        state.myarticlelist.pageno = pageno;
        state.myarticlelist.pagesize = pagesize;
    },
    // 获取我的文章列表
    [GET_MYARTICLELIST](state, reqData) {
        state.myarticlelist.articlelsit = reqData.list; // 获取文章列表（分页过的） 
        state.myarticlelist.total = parseInt(reqData.total); // 一共多少页
    },
    // 设置激活
    [SET_ACTIVEINDEX](state, index) { 
        state.currentactiveindex = index; 
        mylocalstorage.set("current", state.currentactiveindex);
    }
}