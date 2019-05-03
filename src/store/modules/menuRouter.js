import { getMenu as getMenuApi } from '@/api/menu'
import { routes } from '@/router'
import router from '@/router'



const menuRouter = {
  state: {
    menuRouters: [],           // 用户所能访问的路由菜单栏项
  },
  mutations: {
    SET_MENULIST(state, list) {
      // state.menuList = routes.concat(list)
      state.menuRouters = list
    }
  },
  actions: {
    GetMenu({commit}) {
      return new Promise((resolve, reject) => {
        getMenuApi().then((result) => {
          // 后端返回的路由
          // 未操作：处理后端返回的路由并添加到router中
          commit('SET_MENULIST', result.menuList)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}


export default menuRouter