/**
 * mutations 调用 mutations 是唯一允许更新应用状态的地方。
 */

import {
    RECORD_USERINFO,
    QUIT_LOGIN
} from './mutation_type'; 

export default {
    // 记录当前用户的信息
    [RECORD_USERINFO](state, user) {
        state.islogined = true;
        state.userinfo = { ...user }; 
    },
    // 退出登录
    [QUIT_LOGIN](state) {
        state.islogined = false;
        state.userinfo = null;
    }

}