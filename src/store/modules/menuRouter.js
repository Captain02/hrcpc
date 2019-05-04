import { getMenu as getMenuApi } from '@/api/menu'
import { routes } from '@/router'
import router from '@/router'
import { addRouter } from '@/utils/addMenuRouter'



const menuRouter = {
  state: {
    isGain: false,
    menuRouters: [],           // 用户所能访问的路由菜单栏项
  },
  mutations: {
    SET_MENULIST(state, list) {
      state.menuRouters = routes.concat(list)
      // state.menuRouters = list
    },
    SET_ISGAIN(state, status) {
      state.isGain = status
    }
  },
  actions: {
    GetMenu({commit}) {
      return new Promise((resolve, reject) => {
        getMenuApi().then((result) => {
          // 后端返回的路由，然后进行处理
          console.log('后端路由：', result.menuList)
          let menuRouter = addRouter(result.menuList)
          console.log('处理之后的路由：', menuRouter)
          menuRouter.push({ path: '*', redirect: '/404', hidden: true })
          router.addRoutes(menuRouter)
          commit('SET_MENULIST', menuRouter)
          commit('SET_ISGAIN', true)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}


export default menuRouter