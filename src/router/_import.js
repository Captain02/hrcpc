export default (file) => {
  return map[file] || null
}

let map = {
  // 根路由必须使用layout模板
  manage: () => import('@/views/layout'),
  user: () => import('@/views/manage/user'),
  depart: () => import('@/views/manage/depart'),
  permit: () => import('@/views/manage/permit'),
  role: () => import('@/views/manage/role'),

  test: () => import('@/views/layout'),
  'test-1': () => import('@/views/test/test-1')
}