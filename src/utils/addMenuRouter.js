import _import from '@/router/_import'
import layout from '@/views/layout'
/**
 * 生成路由 有坑
 * @param {Array} routerlist 后端返回的路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = []
  routerlist.forEach(e => {
    // if(!e.alwaysShow){              // 后期要修改！！！
    let e_new = {
      path: e.url ? e.url: '/dashboard',      // 如果没有填写路径则默认为首页路径
      name: e.name,
      component: e.type == 0 ? layout : _import(e.name), // 如果为目录则component为基础模板
      meta: {}
    }
    // e_new.menuId = e.menuId               // 由于根目录默认都为首页路径，可能会造成生成路由时key重复
    if (e.list) {
      e_new = Object.assign({}, e_new, { children: addRouter(e.list) })
    }
    if (e.redirect) {
      e_new = Object.assign({}, e_new, { redirect: e.redirect })
    }
    if(e.alwaysShow) {
      e_new = Object.assign({}, e_new, { alwaysShow: true })
    }
    if (e.hidden) {
      e_new = Object.assign({}, e_new, { hidden: true })
    }
    if(e.useCache) {
      e_new.meta.useCache = true
    }
    if (e.icon !== '' && e.title !== '') {
      e_new.meta = Object.assign({}, e_new.meta, {
        title: e.title, icon: e.icon 
      })
    } else if (e.title !== '' && e.icon === '') {
      e_new.meta = Object.assign({}, e_new.meta, {
        title: e.title
      })
    }
    router.push(e_new)
    // }
    
  })
  return router
}