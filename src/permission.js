import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookie'
NProgress.configure({ showSpinner: false })


const whiteList = ['/login', '/code-map', '/result', '/join', '/forget-pwd']      // 路由白名单 /code-map社团二维码路由
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 从cookie中获取token
  if(getToken()){      // 有token，已经登录
    // 判断如果自上次获取到token大于28分钟了
    if(new Date().getTime() > store.state.user.expires){
      // 获取新的token
      store.dispatch('GetToken')
    }

    if(!store.state.menuRouter.isGain && !store.state.user.userId){
      // 没有获取可操作的路由菜单也没有获取用户信息
      store.dispatch('GetUserInfo')
      .then(() => {
        return store.dispatch('GetMenu', store.state.user.userId)
      })
      .then(() => {
        next({ ...to, replace: true })
      })
      .catch((err) => {
        store.dispatch('LogOut').then(() => {
          Message.error(err)
          next({ path: '/' })
        })
      })
      
    }else if(!store.state.menuRouter.isGain && store.state.user.userId){
      // 没有可操作的路由菜单,但获取了用户数据
      store.dispatch('GetMenu', store.state.user.userId).then(() => {
        next({ ...to, replace: true })
      }).catch((err) => {
        store.dispatch('LogOut').then(() => {
          Message.error(err)
          next({ path: '/' })
        })
      })
    } else if(store.state.menuRouter.isGain && !store.state.user.userId){
      // 获取了路由菜单但没有获取用户数据
      store.dispatch('GetUserInfo').then(() => {
        next({ ...to, replace: true })
      }).catch((err) => {
        store.dispatch('LogOut').then(() => {
          Message.error(err)
          next({ path: '/' })
        })
      })
    }else{
      // 都获取了
      if(to.path === '/login'){
        
        // 登陆后不让其再次进入登录页
        Message('您已登录')
        next({ path: '/' })
        NProgress.done()
      }else{
        next()
      }
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