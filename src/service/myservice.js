/**
 * 这里为所有访问后端api的部分
 */
import MyHttp from './getdata'

export default{
    userLogin :  (user) => MyHttp.post('/user/login', user),
    userLogout : (userId) => MyHttp.post('/user/logout', userId)
}
 


 
