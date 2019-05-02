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

// export const logout = () => {
//   return 
// }