/**
 * 这里为所有访问后端api的部分
 */
import MyHttp from './getdata'

export default {
    userLogin: (user) => MyHttp.post('/user/login', user),
    userLogout: (user) => MyHttp.post('/user/logout', user),
    validateUser: (data) => MyHttp.post('/user/isaleadyexis', data),
    sendEmail: (data) => MyHttp.post('/user/sendemail', data),
    registUser: (registform) => MyHttp.post('/user/regist', registform),
    writeArticle: (data) => MyHttp.post('/article/write', data),
    getMyArticle: (data) => MyHttp.post('/article/allmyarticle', data),
    showArticle: (data) => MyHttp.post("/article/articledetail", data),
    getArticles: (data) => MyHttp.post("/article/all", data),
    increaseViewed: (data) => MyHttp.post("/article/increase/" + data, null),
    delmyarticle: (arcid, suberid) => MyHttp.post("/article/del/" + arcid + "/" + suberid, null),
    addComments: (data) => MyHttp.post("/article/addcomm", data),
    queryComments: (arcid) => MyHttp.post("/article/allcomments/" + arcid, null),
    queryUserInfo: (userid) => MyHttp.post("/user/queryuser/" + userid, null),
    queryMyFans: (userid) => MyHttp.post("/user/allmyfans/" + userid, null),
    queryMyFriends: (userid) => MyHttp.post("/user/allmycared/" + userid, null),
    addFriends:(data)=> MyHttp.post("/user/addcared", data),
    cancelCared:(data) => MyHttp.post("/user/cancelcared", data),
    hasCared:(data) => MyHttp.post('/user/hascared', data)
}




