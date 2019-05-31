import request from '@/utils/request'
import qs from 'querystring'
/**
 * 登录
 * @param {String} username 
 * @param {String} password 
 * @param {Number} corid 
 */
export const login = (username, password, corid) => {
  return request({
    method: 'POST',
    url: '/login',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }],
    data: {
      username,
      password,
      corid,
      captcha: '132'
    }
  })
}

/**
 * 获取token
 * @description 通过将之前没有过期的token放入请求头来获取新的token
 */
export const getToken = () => {
  return request({
    url: '/refreshToken',
    method: 'POST'
  })
}