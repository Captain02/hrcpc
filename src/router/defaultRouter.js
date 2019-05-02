import login from '@/views/login'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: login
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/401', component: () => import('@/views/403'), hidden: true },
]

