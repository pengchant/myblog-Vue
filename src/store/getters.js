/**
 * 从state中派生出状态，比如将state中的某个状态进行过滤然后获取新的状态。
 */

import global_config from '@/common/config'
import localstorage from '@/common/localstorage'

export default {
    getuserimgurl: (state) => (fileName) => {
        if (fileName === undefined) {// 如果filename为空，则默认显示本地用户的头像
            if (state.userinfo != null && state.userinfo.headimgurl!=null) {
                return global_config.url + "user/show?fileName=" + state.userinfo.headimgurl;
            }  
        } else if (fileName != null && fileName.indexOf("/") != "-1") { // 如果filename非空，则显示其他用户的头像
            return global_config.url + "user/show?fileName=" + fileName;
        }
        return require("../assets/logo.png");

    } 
}