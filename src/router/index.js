import Vue from 'vue'
import Router from 'vue-router'

/**Step1. 由前面定义的路由组件，用import关键字导入进来 */
import Main from '@/components/Main'
import ArticleContent from '@/components/ArticleContent'
import MyBlogArticle from '@/components/MyBlogArticle'
import NewArticle from '@/components/NewArticle'
import MyFriends from '@/components/MyFriends'
import MyInfo from '@/components/MyInfo'
import BlogUserInfo from '@/components/BlogUserInfo'

Vue.use(Router)

/**
 *  Step2.创建路由router实例
 */
export default new Router({
  routes: [ /** Step3. 定义路由 */
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/article',
      name: 'ArticleContent',
      component: ArticleContent
    }, {
      path: '/myarticle',
      name: 'MyBlogArticle',
      component: MyBlogArticle
    }, {
      path: '/newartic',
      name: 'NewArticle',
      component: NewArticle
    }, {
      path: '/friends',
      name: 'MyFriends',
      component: MyFriends
    }, {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo
    }, {
      path: '/bloguser',
      name: 'BlogUserInfo',
      component: BlogUserInfo
    }
  ]
}) 