export default (file) => {
  return map[file] || null
}

let map = {
  // 根路由必须使用layout模板
  organize: () => import('@/views/layout'),
  user: () => import('@/views/organize/user'),
  'add-user': () => import('@/views/organize/user/add'),
  depart: () => import('@/views/organize/depart'),
  permit: () => import('@/views/organize/permit'),
  role: () => import('@/views/organize/role'),
  'edit-role': () => import('@/views/organize/role/edit'),

  picture: () => import('@/views/layout'),
  'picture-list': () => import('@/views/picture/picture-list'),
  'add-picture': () => import('@/views/picture/add-picture')
}