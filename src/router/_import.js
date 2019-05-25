export default (file) => {
  return map[file] || null
}

let map = {
  // organize: () => import('@/views/layout'),
  // 组织管理
  user: () => import('@/views/organize/user'),
  'add-user': () => import('@/views/organize/user/modules/add'),
  // 'details-user': () => import('@/views/organize/user/details'),
  // 'edit-user': () => import('@/views/organize/user/edit'),
  depart: () => import('@/views/organize/depart'),
  // permit: () => import('@/views/organize/permit'),
  role: () => import('@/views/organize/role'),
  'edit-role-premit': () => import('@/views/organize/role/modules/edit-premit'),

  // picture: () => import('@/views/layout'),
  // 社团相册
  'picture-list': () => import('@/views/picture/picture-list'),
  'add-picture': () => import('@/views/picture/add-picture'),

  // 纳新管理
  'resume-list': () => import('@/views/recruited/resume'),
  'report': () => import('@/views/recruited/report')

}