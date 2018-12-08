/**
 * 这里为所有访问后端api的部分
 */
import MyHttp from './getdata'

export default{
    userLogin :  (user) => MyHttp.post('/user/login', user),
    userLogout : (user) => MyHttp.post('/user/logout', user),
    validateUser: (data)=> MyHttp.post('/user/isaleadyexis', data),
    sendEmail: (data) => MyHttp.post('/user/sendemail', data),
    registUser: (registform) => MyHttp.post('/user/regist', registform)
}
 


 
