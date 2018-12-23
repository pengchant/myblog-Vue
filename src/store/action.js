import myapi from '../service/myservice';

import {
    GET_MYARTICLELIST
} from '../store/mutation_type';

/**
 * actions 即是定义提交触发更改信息的描述，
 * 常见的例子有从服务端获取数据，在数据获取完成后
 * 会调用store.commit()来调用更改 Store 中的状态。
 */

export default {
    getMyArticle({
        commit,
        state
    }) {
        myapi.getMyArticle({
            userid: state.userinfo.userId,
            pageno: state.myarticlelist.pageno,
            pagesize: state.myarticlelist.pagesize
        }).then(r => { 
            let reqData = r.data.data; 
            commit(GET_MYARTICLELIST, reqData);
        });
    }
}