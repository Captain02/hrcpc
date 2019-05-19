import request from '@/utils/request'

/**
 * 获取左侧菜单栏
 * @param {Number} userid 
 * @param {Number} corid 
 * @description 根据用户id和社团id获取可操作的菜单栏
 */
export const getMenu = (userid, corid) => {
  return request({
    url: '/menu/nav',
    method: 'GET',
    params: {
      userid,
      corid
    }
  })
}