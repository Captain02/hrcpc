import request from '@/utils/request'

/**
 * 登录
 * @param {String} username 
 * @param {String} password 
 * @param {Number} corId 
 */
export const login = (username, password, corId) => {
  return request({
    method: 'POST',
    url: '/login',
    params: {
      username,
      password,
      corId,
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
// export const logout = () => {
//   return 
// }