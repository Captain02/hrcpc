import request from '@/utils/request'
import qs from 'querystring'

/**
 * 根据学号查找用户信息
 * @param {String} username 
 */
export const getUserByUsername = (username) => {
  return request({
    url: '/user/getUserInfo',
    method: 'POST',
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    data: {
      username
    }
  })
}