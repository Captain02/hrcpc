import request from '@/utils/request'

/**
 * 获取部门列表
 */
export const getDeparts = () => {
  return request({
    url: '/dept/list',
    method:'POST'
  })
}