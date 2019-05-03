import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookie'
NProgress.configure({ showSpinner: false })


const whiteList = ['/login']      // 路由白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 从cookie中获取token
  if(getToken()){      // 有token，已经登录
    // 判断是否已经获取用户信息
    if(!store.state.user.userId){
      // 没有获取用户信息
      store.dispatch('GetUserInfo').then(() => {
        // 获取用户信息之后在获取后端返回的用户可操作的路由菜单
        store.dispatch('GetMenu').then(() => {
          next({ ...to, replace: true }) 
        }) 
      }).catch((err) => {
        store.dispatch('LogOut').then(() => {
          Message.error(err)
          next({ path: '/' })
        })
      })
    }else{
      // 已经获取用户信息
      next()
    }
  }else{              // 无token，未登录
    if(whiteList.includes(to.path)){     // 访问的路由在白名单中
      next()
    }else{
      next({path: '/login'})           // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})