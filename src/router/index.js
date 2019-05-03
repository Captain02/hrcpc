import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import { constantRouterMap } from './defaultRouter'

Vue.use(Router)

/**
 * 路由说明
 * 
 * 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)
 * 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * redirect: 'noredirect'
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 * name: 'router-name'    设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
 *  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
 *  icon: 'svg-name' //设置该路由的图标
 *  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
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
    path: '/test',
    name: 'test',
    component: layout,
    meta: {
      title: '测试',
      icon: 'link'
    },
    redirect: '/test/test1',
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/user'),
        meta: {
          title: '测试1'
        },
        children: [
          {
            path: 'test1-1',
            name: 'test1-1',
            component: () => import('@/views/user/group'),
            meta: {
              title: '测试1-1'
            },
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user/index',
    name: 'user',
    component: layout,
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'index',
        name: 'userManage',
        component: () => import('@/views/user'),
        meta: {
          title: '用户'
        },
      },
      {
        path: 'add',
        name: 'addUser',
        component: () => import('@/views/user/add'),
        hidden: true,
        meta: {
          title: '添加用户'
        }
      },
      {
        path: 'group',
        name: 'userGroupManage',
        component: () => import('@/views/user/group'),
        meta: {
          title: '用户组管理'
        },
      }
    ]
  },
  {
    path: '/nested',
    component: layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '菜单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2'),
        meta: { title: 'menu2' }
      },
    ]
  },
  {
    component: layout,
    path: '/list',
    children: [{
      path: 'index',
      name: 'list',
      component: () => import('@/views/user'),
      meta: {
        title: '社团列表',
        icon: 'list'
      }
    }]
  },
  {
    component: layout,
    name: 'det',
    path: '/det',
    children: [{
      path: 'index',
      component: () => import('@/views/user/group'),
      meta: {
        title: '哈哈',
        icon: 'list'
      }
    }]
  },
  ...constantRouterMap
]
export default new Router({
  routes
})
