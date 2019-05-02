import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })


const whiteList = ['/login']      // 路由白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  let token = store.state.user.token
  if(token){      // 已经登录
    // 
  }else{          // 未登录
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