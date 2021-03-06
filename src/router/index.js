import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login'

Vue.use(Router)

/**
 * 路由说明
 * 
 * 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)
 * 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * redirect: 'noredirect'
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 * name: 'router-name'    设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
 *  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
 *  icon: 'svg-name' //设置该路由的图标
 *  useCache: false //如果设置为true，则会被 <keep-alive> 缓存(默认 false)
 *  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
 * }
 */

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '首页',
          icon: 'dashboard' 
        }
      }
    ]
  },
  {
    path: '/profile',
    hidden: true,
    component: layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        name: 'profile',
        hidden: true,
        component: () => import('@/views/profile'),
        meta: {
          title: '个人中心',
        }
      }
    ]
  },
  {
    path: '/join',                // 扫码加入社团
    name: 'join',
    hidden: true,
    component: () => import('@/views/page/join')
  },
  {
    path: '/join-activity',       // 扫码加入活动
    name: 'join-activity',
    hidden: true,
    component: () => import('@/views/page/join-activity')
  },
  {
    path: '/result',              // 扫码加入后的结果
    name: 'result',
    hidden: true,
    component: () => import('@/views/page/result')
  },
  {
    path: '/register',            // 扫码之后若用户还没有注册则进行注册
    name: 'register',
    hidden: true,
    component: () => import('@/views/page/register')
  },
  {
    path: '/forget-pwd',
    name: 'forget-pwd',
    hidden: true,
    component: () => import('@/views/page/forget-pwd/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: login
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/403', component: () => import('@/views/403'), hidden: true }
]
export default new Router({
  routes
})
