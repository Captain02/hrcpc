import request from '@/utils/request'

/**
 * 获取左侧菜单栏
 * @description 通过请求头token获取
 */
export const getMenu = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}