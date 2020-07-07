import Vue from 'vue'
import Router from 'vue-router'
import Cookies from "js-cookie"
import FirstPage from '@/views/FirstPage'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'
import Cardpersonal from '@/views/Sys/Cardpersonal'
import Login from '@/views/Sys/Login'
import Cardhospital from '@/views/Sys/Cardhospital'
import Preview from '@/views/Sys/Preview'
import PrivacyExplain from '@/views/Sys/PrivacyExplain'
import EndPage from '@/views/EndPage'
import Cheakdate from '@/views/Sys/Cheakdate'
import Queryresults from '@/views/Sys/Queryresults'


import api from '@/http/api'
import store from '@/store'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'

Vue.use(Router)

const router = new Router({
  routes: [
   
   
   
   
    // {
    //   path: '/',
    //   name: '首页',
    //   component: Cheakdate
    // },
  //   {
  //     path: '/login',
  //     name: '登录',
  //    component: Login
  //  },
   {
    path: '/',
    name: '登录',
   component: FirstPage
 },
  {
    path: '/cheakdate',
    name: '查看序列号',
    component: Cheakdate
  },
  {
    path: '/queryresults',
    name: '查看结果',
    component: Queryresults
  },
    {
      path: '/cardpersonal',
      name: '个人用户',
      component: Cardpersonal
    },
    {
      path: '/endpage',
      name: '最终页面',
      component: EndPage
    },
    {
      path: '/cardhospital',
      name: '医院用户',
      component: Cardhospital
    },
    {
      path: '/privacyexplain',
      name: '隐私说明',
      component: PrivacyExplain
    },
  

    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
  
  ]
})

// router.beforeEach((to, from, next) => {
//   // 登录界面登录成功之后，会把用户信息保存在会话
//   // 存在时间为会话生命周期，页面关闭即失效。
//   let token = Cookies.get('token')
//   let userName = sessionStorage.getItem('user')

//   if (to.path === '/login') {
//     // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
//     if(token) {
//          next({ path: '/' })    
//     } else {
         
//          next()    
        
//     }
//   } else {
//     if (!token) {
//          next({ path: '/login' })
//     } else {
//         next()    
//         //next()
//     }
//   }
// })




export default router
