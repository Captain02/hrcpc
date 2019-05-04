import _import from '@/router/_import'
/**
 * 生成路由
 * @param {Array} routerlist 后端返回的路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = []
  routerlist.forEach(e => {
    if(!e.hidden){              // 后期要修改！！！
      let e_new = {
        path: e.url,
        name: e.name,
        component: _import(e.name),
        meta: {}
      }
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
    }
    
  })
  return router
}